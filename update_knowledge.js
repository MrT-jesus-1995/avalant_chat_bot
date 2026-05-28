// ================================================================
//  update_knowledge.js  v2  —  append + deduplicate + timestamp
//  ไม่ต้องใช้ API ใดๆ ทั้งสิ้น
//
//  วิธีใช้:
//    1. ยัดข้อมูลดิบลงใน data_input_raw.txt
//    2. node update_knowledge.js
//    3. Restart server.js
// ================================================================

const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, 'data_input_raw.txt');
const OUTPUT_FILE = path.join(__dirname, 'data', 'avalant_media.txt');

// ── Section keyword map ─────────────────────────────────────────
const SECTION_KEYWORDS = [
    {
        heading: '## ข้อมูลทั่วไป',
        keywords: ['ก่อตั้ง', 'บริษัท', 'co., ltd', 'จำกัด', 'founded',
            'established', 'cmmi', 'มาตรฐาน', 'ประวัติ', 'history', 'about', 'ceo'],
    },
    {
        heading: '## ที่ตั้งและติดต่อ',
        keywords: ['ที่ตั้ง', 'ที่อยู่', 'address', 'location', 'ถนน', 'อาคาร',
            'ชั้น', 'เขต', 'แขวง', 'กรุงเทพ', 'โทร', 'email', 'tel', 'contact', 'office'],
    },
    {
        heading: '## ผลิตภัณฑ์และบริการ',
        keywords: ['oneweb', 'promptx', 'veda', 'product', 'ผลิตภัณฑ์', 'บริการ',
            'service', 'platform', 'low-code', 'lowcode', 'แพลตฟอร์ม',
            'solution', 'โซลูชัน', 'feature', 'ฟีเจอร์'],
    },
    {
        heading: '## AI และเทคโนโลยี',
        keywords: ['ai', 'artificial intelligence', 'generative', 'llm', 'rag',
            'machine learning', 'automation', 'อัตโนมัติ', 'chatbot',
            'watsonx', 'ollama', 'embedding', 'อัจฉริยะ'],
    },
    {
        heading: '## พาร์ทเนอร์และพันธมิตร',
        keywords: ['ibm', 'partner', 'พาร์ทเนอร์', 'พันธมิตร', 'computer union',
            'cu', 'ความร่วมมือ', 'collaboration', 'integration'],
    },
    {
        heading: '## กรณีศึกษาและผลงาน',
        keywords: ['use case', 'กรณีศึกษา', 'ตัวอย่าง', 'example', 'demo', 'สาธิต',
            'ลูกค้า', 'customer', 'client', 'hr', 'human resource', 'workflow'],
    },
    {
        heading: '## งานและกิจกรรม',
        keywords: ['event', 'งาน', 'สัมมนา', 'seminar', 'summit', 'conference',
            'workshop', 'webinar', 'ประกาศ', 'launch', 'เปิดตัว'],
    },
];

// ── helpers ─────────────────────────────────────────────────────
function nowTH() {
    return new Date().toLocaleString('th-TH', {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function cleanText(text) {
    return text
        .replace(/\r\n/g, '\n')
        .replace(/\t/g, ' ')
        .replace(/ {2,}/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function splitParagraphs(text) {
    return text
        .split(/\n\n+/)
        .map(p => p.replace(/\n/g, ' ').trim())
        .filter(p => p.length > 10);
}

function classifyParagraph(para) {
    const lower = para.toLowerCase();
    let best = null, bestScore = 0;
    for (const sec of SECTION_KEYWORDS) {
        const score = sec.keywords.reduce(
            (a, kw) => a + (lower.includes(kw.toLowerCase()) ? 1 : 0), 0
        );
        if (score > bestScore) { bestScore = score; best = sec.heading; }
    }
    return best || '## ข้อมูลอื่นๆ';
}

function formatParagraph(text) {
    if (text.length <= 120) return text;
    const sentences = text
        .split(/(?<=[.!?ๆ])\s+(?=[ก-๙A-Z"'(])/u)
        .map(s => s.trim())
        .filter(s => s.length > 5);
    return sentences.length <= 1 ? text : sentences.map(s => `- ${s}`).join('\n');
}

// ── fingerprint สำหรับ deduplicate ──────────────────────────────
// ใช้ 60 ตัวอักษรแรก (lowercase, ไม่มีช่องว่าง) เป็น key
function fingerprint(text) {
    return text.toLowerCase().replace(/\s+/g, '').slice(0, 60);
}

// ── อ่าน fingerprints จากไฟล์เดิม ───────────────────────────────
function loadExistingFingerprints(filePath) {
    if (!fs.existsSync(filePath)) return new Set();
    const content = fs.readFileSync(filePath, 'utf-8');
    const paras = content.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    return new Set(paras.map(fingerprint));
}

// ── format ข้อมูลใหม่ → sections ────────────────────────────────
function formatNew(rawText, existingFPs) {
    const cleaned = cleanText(rawText);
    const paragraphs = splitParagraphs(cleaned);

    const sections = {};
    let newCount = 0;

    for (const para of paragraphs) {
        const fp = fingerprint(para);
        if (existingFPs.has(fp)) continue;   // ซ้ำ → ข้าม
        newCount++;
        const heading = classifyParagraph(para);
        if (!sections[heading]) sections[heading] = [];
        sections[heading].push(para);
    }

    return { sections, newCount };
}

// ── สร้าง block ใหม่ที่จะ append ────────────────────────────────
function buildAppendBlock(sections, timestamp) {
    const lines = [];
    lines.push(`\n\n<!-- ===== เพิ่มข้อมูลเมื่อ: ${timestamp} ===== -->`);

    const order = [
        ...SECTION_KEYWORDS.map(s => s.heading),
        '## ข้อมูลอื่นๆ',
    ];

    for (const heading of order) {
        if (!sections[heading]) continue;
        lines.push(`\n${heading}`);
        lines.push('');
        for (const para of sections[heading]) {
            lines.push(formatParagraph(para));
            lines.push('');
        }
    }

    return lines.join('\n');
}

// ── MAIN ─────────────────────────────────────────────────────────
function main() {
    console.log('\n🔄  Knowledge Updater  (append + deduplicate)');
    console.log('─'.repeat(48));

    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`❌  ไม่พบ: ${INPUT_FILE}\n`);
        process.exit(1);
    }

    const rawText = fs.readFileSync(INPUT_FILE, 'utf-8');
    const meaningful = rawText
        .replace(/\/\/.*$/gm, '')
        .replace(/ยัดข้อมูลดิบ.*/s, '')
        .trim();

    if (meaningful.length < 30) {
        console.error(`❌  data_input_raw.txt ยังว่างอยู่!\n`);
        process.exit(1);
    }

    console.log(`📄  อ่านข้อมูลดิบ: ${meaningful.length} ตัวอักษร`);

    // สร้างโฟลเดอร์ถ้าไม่มี
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`📁  สร้างโฟลเดอร์: data/`);
    }

    // โหลด fingerprints เดิม
    const existingFPs = loadExistingFingerprints(OUTPUT_FILE);
    console.log(`🗂️   ข้อมูลเดิมใน knowledge base: ${existingFPs.size} paragraphs`);

    // จัดรูปแบบและกรองซ้ำ
    const { sections, newCount } = formatNew(meaningful, existingFPs);

    if (newCount === 0) {
        console.log(`\n✅  ไม่มีข้อมูลใหม่ — ทุกอย่างซ้ำกับที่มีอยู่แล้ว`);
        console.log(`   ลองเพิ่มข้อมูลใหม่ใน data_input_raw.txt\n`);
        return;
    }

    console.log(`✨  ข้อมูลใหม่: ${newCount} paragraphs  |  ซ้ำ (ข้าม): ${existingFPs.size > 0 ? meaningful.split(/\n\n+/).length - newCount : 0}`);

    // สร้างไฟล์ใหม่ถ้ายังไม่มี (ครั้งแรก)
    const timestamp = nowTH();
    if (!fs.existsSync(OUTPUT_FILE)) {
        const header = `# ฐานความรู้ Avalant\n> สร้างเมื่อ: ${timestamp}\n`;
        fs.writeFileSync(OUTPUT_FILE, header, 'utf-8');
        console.log(`🆕  สร้างไฟล์ใหม่: ${OUTPUT_FILE}`);
    }

    // Backup
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const backupPath = OUTPUT_FILE.replace('.txt', `_backup_${ts}.txt`);
    fs.copyFileSync(OUTPUT_FILE, backupPath);
    console.log(`💾  Backup: data/${path.basename(backupPath)}`);

    // Append
    const appendBlock = buildAppendBlock(sections, timestamp);
    fs.appendFileSync(OUTPUT_FILE, appendBlock, 'utf-8');

    const finalSize = fs.statSync(OUTPUT_FILE).size;
    console.log(`\n✅  อัพเดทสำเร็จ!`);
    console.log(`📝  ไฟล์: ${OUTPUT_FILE}  (${finalSize} bytes)`);
    console.log(`\n💡  Restart server.js เพื่อโหลด knowledge ใหม่`);

    // Preview ส่วนที่เพิ่งเพิ่ม
    console.log('\n' + '─'.repeat(48));
    console.log(`📋  ข้อมูลที่เพิ่มเข้าไป:`);
    console.log('─'.repeat(48));
    console.log(appendBlock.slice(0, 800));
    if (appendBlock.length > 800) console.log('...(ต่อ)');
    console.log('─'.repeat(48) + '\n');
}

main();