const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// ═══════════════════════════════════════════════════════
// CONFIG — แก้ตรงนี้เพื่อ forward ไป webhook จริง
// ═══════════════════════════════════════════════════════
const CONFIG = {
    // ถ้าต้องการ forward ไป n8n / Make / Zapier ให้ใส่ URL ตรงนี้
    // forwardWebhookUrl: 'https://your-n8n.com/webhook/xxxx',
    forwardWebhookUrl: null,
};
// ═══════════════════════════════════════════════════════

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // ─── Chat Webhook ───
    if (req.url === '/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const message = data.message?.trim().toLowerCase() || '';
                console.log('Received message:', message);

                // Check if image exists locally
                const imagesDir = path.join(__dirname, 'images');
                const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
                let found = false;
                for (const ext of extensions) {
                    if (fs.existsSync(path.join(imagesDir, message + ext))) {
                        found = true;
                        break;
                    }
                }

                const responseText = found
                    ? `✅ เพิ่มรูป "${message}" ลงแกลเลอรีแล้ว!`
                    : `❌ ไม่พบรูป "${message}" ในระบบ`;

                // Optional: forward to real webhook (n8n, Make, etc.)
                if (CONFIG.forwardWebhookUrl) {
                    try {
                        const { default: nodeFetch } = await import('node-fetch')
                            .catch(() => ({ default: null }));

                        if (nodeFetch) {
                            await nodeFetch(CONFIG.forwardWebhookUrl, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ message, source: 'automationx-gallery' }),
                            });
                            console.log('Forwarded to webhook:', CONFIG.forwardWebhookUrl);
                        }
                    } catch (fwdErr) {
                        console.warn('Forward failed (non-critical):', fwdErr.message);
                    }
                }

                // Return plain text so the chat widget displays it cleanly (not raw JSON)
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(responseText);

            } catch (error) {
                console.error('Error:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error processing request' }));
            }
        });
        return;
    }

    // ─── Static File Server ───
    let requestPath = req.url === '/' ? 'image-gallery.html' : req.url;
    requestPath = requestPath.split('?')[0]; // strip query strings
    requestPath = requestPath.replace(/^\/+/, '');
    const filePath = path.join(__dirname, requestPath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log('File not found:', req.url);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html; charset=utf-8',
            '.css':  'text/css',
            '.js':   'application/javascript',
            '.json': 'application/json',
            '.jpg':  'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png':  'image/png',
            '.gif':  'image/gif',
            '.webp': 'image/webp',
            '.svg':  'image/svg+xml',
        };
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`\n${'═'.repeat(48)}`);
    console.log(`🚀  AutomationX Gallery Server`);
    console.log(`📍  Open: http://localhost:${PORT}`);
    if (CONFIG.forwardWebhookUrl) {
        console.log(`🔗  Forwarding to: ${CONFIG.forwardWebhookUrl}`);
    } else {
        console.log(`💡  Tip: Set forwardWebhookUrl in CONFIG to`);
        console.log(`        connect to n8n / Make / Zapier`);
    }
    console.log(`${'═'.repeat(48)}\n`);
});