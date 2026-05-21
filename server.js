const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Webhook endpoint for Chat Widget
    if (req.url === '/chat' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const message = data.message?.trim().toLowerCase() || '';

                console.log('Received message:', message);

                // Simulate image check
                const imagesDir = path.join(__dirname, 'images');
                let response = `❌ ไม่พบรูป: "${message}"`;

                // Check if image exists
                const extensions = ['.jpg', '.png', '.gif'];
                for (const ext of extensions) {
                    const imagePath = path.join(imagesDir, message + ext);
                    if (fs.existsSync(imagePath)) {
                        response = `✅ เพิ่มรูป: ${message}`;
                        break;
                    }
                }

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(response);
            } catch (error) {
                console.error('Error:', error);
                res.writeHead(500);
                res.end('Error processing request');
            }
        });
        return;
    }

    // Serve files (HTML, CSS, JS, Images, node_modules)
    let filePath = path.join(__dirname, req.url === '/' ? 'image-gallery.html' : req.url);
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log('File not found:', req.url);
            res.writeHead(404);
            res.end('Not found');
            return;
        }

        // Determine content type
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        };

        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`🚀 AutomationX Server Running!`);
    console.log(`📍 Open: http://localhost:${PORT}`);
    console.log(`========================================\n`);
});
