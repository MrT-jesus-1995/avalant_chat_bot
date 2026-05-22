// ═══════════════════════════════════════════════════════════════
//  AutomationX Gallery Server + Local RAG Pipeline
//  LangChain v1.x · Ollama · MemoryVectorStore
// ═══════════════════════════════════════════════════════════════

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════
const CONFIG = {
    ollamaBaseUrl:     'http://localhost:11434',
    llmModel:          'llama3',
    embeddingModel:    'nomic-embed-text',
    dataFile:          './data/avalant_media.txt',
    ragTimeoutMs:      6500,
    forwardWebhookUrl: null,
};
// ═══════════════════════════════════════════════════════════════

let ragChain = null;
let ragReady = false;
let ragError = null;

const FALLBACK_KNOWLEDGE = {
    location:
        'Avalant ตั้งอยู่ที่ 20 อาคารบุปผจิต ชั้น 15 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500 ค่ะ',
    about:
        'Avalant Co., Ltd. เป็นบริษัทเทคโนโลยีไทยที่ให้บริการ Digital Platform ระดับองค์กร มีความเชี่ยวชาญด้าน Software, AI, Low-Code และโซลูชันองค์กร โดยก่อตั้งในปี พ.ศ. 2545',
    ai:
        'Avalant มีแนวคิด AI First และนำ AI มาช่วยพัฒนาโซลูชันองค์กร เช่น งาน HR, Customer Service, Workflow, Data & AI และแพลตฟอร์ม Low-Code อย่าง ONEWEB/Promptx',
    products:
        'ข้อมูลเด่นของ Avalant ได้แก่ ONEWEB แพลตฟอร์ม Low-Code, Promptx สำหรับช่วยสร้างต้นแบบแอปและเอกสารด้วย AI รวมถึงโซลูชัน IBM Automation, Integration และ Data & AI',
};

function getFallbackAnswer(message) {
    const text = message.toLowerCase();
    const compact = text.replace(/\s+/g, '');

    if (!compact.includes('avalant') && !compact.includes('อวาลันท์') && !compact.includes('อวาแลนท์')) {
        return null;
    }

    if (
        compact.includes('อยู่ที่ไหน') ||
        compact.includes('ที่อยู่') ||
        compact.includes('location') ||
        compact.includes('address') ||
        compact.includes('office')
    ) {
        return FALLBACK_KNOWLEDGE.location;
    }

    if (
        compact.includes('คือ') ||
        compact.includes('เกี่ยวกับ') ||
        compact.includes('about') ||
        compact.includes('tellme') ||
        compact.includes('บริษัท')
    ) {
        return FALLBACK_KNOWLEDGE.about;
    }

    if (
        compact.includes('ai') ||
        compact.includes('promptx') ||
        compact.includes('oneweb') ||
        compact.includes('lowcode') ||
        compact.includes('โลว์โค้ด') ||
        compact.includes('product') ||
        compact.includes('solution')
    ) {
        return FALLBACK_KNOWLEDGE.products;
    }

    return `${FALLBACK_KNOWLEDGE.about}\n\n${FALLBACK_KNOWLEDGE.location}`;
}

// ───────────────────────────────────────────────
// INIT RAG
// ───────────────────────────────────────────────
async function initRAG() {
    try {
        console.log('🔧 Initializing RAG pipeline...');

        // ── LangChain v1.x imports ──────────────────────────────
        const { Ollama }             = await import('@langchain/ollama');
        const { OllamaEmbeddings }   = await import('@langchain/ollama');
        const { MemoryVectorStore }  = await import('@langchain/classic/vectorstores/memory');
        const { RecursiveCharacterTextSplitter } = await import('@langchain/textsplitters');
        const { Document }           = await import('@langchain/core/documents');
        const { ChatPromptTemplate } = await import('@langchain/core/prompts');
        const { createRetrievalChain } = await import('@langchain/classic/chains/retrieval');
        const { createStuffDocumentsChain } = await import('@langchain/classic/chains/combine_documents');

        // 1. โหลดไฟล์ข้อมูลบริษัทด้วย fs โดยตรง (ไม่ใช้ TextLoader เพื่อหลีกเลี่ยง path issue)
        if (!fs.existsSync(CONFIG.dataFile)) {
            throw new Error(`ไม่พบไฟล์: ${CONFIG.dataFile}\nสร้างโฟลเดอร์ data/ และไฟล์ avalant_media.txt ก่อน`);
        }
        const rawText = fs.readFileSync(CONFIG.dataFile, 'utf-8');
        const rawDocs = [new Document({
            pageContent: rawText,
            metadata:    { source: CONFIG.dataFile },
        })];
        console.log(`📄 Loaded: ${CONFIG.dataFile} (${rawText.length} chars)`);

        // 2. ตัดข้อความเป็น chunk
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize:    500,
            chunkOverlap: 50,
        });
        const docs = await splitter.splitDocuments(rawDocs);
        console.log(`✂️  Split into ${docs.length} chunks`);

        // 3. Embeddings (Ollama)
        const embeddings = new OllamaEmbeddings({
            model:   CONFIG.embeddingModel,
            baseUrl: CONFIG.ollamaBaseUrl,
        });

        // 4. MemoryVectorStore
        const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
        const retriever   = vectorStore.asRetriever({ k: 4 });
        console.log('🗄️  Vector store ready');

        // 5. LLM (Ollama)
        const llm = new Ollama({
            model:       CONFIG.llmModel,
            baseUrl:     CONFIG.ollamaBaseUrl,
            temperature: 0.3,
        });

        // 6. Prompt Template
        const prompt = ChatPromptTemplate.fromTemplate(`
คุณเป็นผู้ช่วย AI ของบริษัท Avalant ตอบคำถามโดยใช้ข้อมูลที่ให้มาเท่านั้น
ถ้าไม่มีข้อมูลในบริบท ให้ตอบว่า "ขออภัย ไม่มีข้อมูลในส่วนนี้ค่ะ"
ตอบเป็นภาษาไทยเสมอ กระชับ และชัดเจน

บริบท:
{context}

คำถาม: {input}

คำตอบ:`);

        // 7. Retrieval Chain
        const docChain = await createStuffDocumentsChain({ llm, prompt });
        ragChain = await createRetrievalChain({
            retriever,
            combineDocsChain: docChain,
        });

        ragReady = true;
        console.log('✅ RAG pipeline ready!\n');

    } catch (err) {
        ragError = err.message;
        console.error('❌ RAG init failed:', err.message);
        console.warn('⚠️  Running without RAG (image-only mode)\n');
    }
}

async function queryRAG(question) {
    if (!ragReady || !ragChain) return null;
    try {
        const result = await Promise.race([
            ragChain.invoke({ input: question }),
            new Promise((_, reject) => {
                setTimeout(() => reject(new Error(`RAG timed out after ${CONFIG.ragTimeoutMs}ms`)), CONFIG.ragTimeoutMs);
            }),
        ]);
        return result.answer?.trim() || null;
    } catch (err) {
        console.error('RAG query error:', err.message);
        return null;
    }
}

// ───────────────────────────────────────────────
// HTTP SERVER
// ───────────────────────────────────────────────
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

    // GET /status
    if (req.url === '/status' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            rag:   ragReady ? 'ready' : (ragError ? 'error' : 'loading'),
            error: ragError || null,
            model: CONFIG.llmModel,
        }, null, 2));
        return;
    }

    // POST /chat
    if (req.url === '/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const data    = JSON.parse(body);
                const message = data.message?.trim() || '';
                const msgLow  = message.toLowerCase();
                console.log('💬 Message:', message);

                let responseText = '';

                // 1. ถาม RAG
                if (ragReady) {
                    const ragAnswer = await queryRAG(message);
                    if (ragAnswer && !ragAnswer.includes('ไม่มีข้อมูล')) {
                        responseText = ragAnswer;
                        console.log('🤖 RAG answered');
                    }
                }

                // 2. Fallback: ตอบข้อมูล Avalant พื้นฐานเมื่อ RAG/Ollama ยังไม่พร้อม
                if (!responseText) {
                    responseText = getFallbackAnswer(message) || '';
                }

                // 3. Fallback: เช็คชื่อรูปภาพ
                if (!responseText) {
                    const imagesDir  = path.join(__dirname, 'images');
                    const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
                    let   found      = false;
                    for (const ext of extensions) {
                        if (fs.existsSync(path.join(imagesDir, msgLow + ext))) {
                            found = true; break;
                        }
                    }
                    responseText = found
                        ? `✅ เพิ่มรูป "${msgLow}" ลงแกลเลอรีแล้ว!`
                        : `ขออภัย ไม่มีข้อมูลในส่วนนี้ค่ะ`;
                }

                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(responseText);

            } catch (err) {
                console.error('Chat error:', err);
                res.writeHead(500); res.end('❌ Server error');
            }
        });
        return;
    }

    // Static Files
    let reqPath    = req.url === '/' ? 'image-gallery.html' : req.url;
    reqPath        = reqPath.split('?')[0].replace(/^\/+/, '');
    const filePath = path.join(__dirname, reqPath);

    fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end('404 Not Found'); return; }
        const mimeTypes = {
            '.html': 'text/html; charset=utf-8', '.css':  'text/css',
            '.js':   'application/javascript',   '.json': 'application/json',
            '.jpg':  'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
            '.gif':  'image/gif',  '.webp': 'image/webp', '.svg': 'image/svg+xml',
            '.mp4':  'video/mp4',
        };
        const ct = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': ct });
        res.end(data);
    });
});

server.listen(PORT, async () => {
    console.log(`\n${'═'.repeat(52)}`);
    console.log(`🚀  AutomationX Gallery + RAG Server`);
    console.log(`📍  http://localhost:${PORT}`);
    console.log(`📊  Status: http://localhost:${PORT}/status`);
    console.log(`${'═'.repeat(52)}\n`);
    await initRAG();
});
