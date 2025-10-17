const http = require('http');
const url = require('url');
const port = process.env.PORT || 1111;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name || 'world';

    const responseObj = {
        hello: name,
        runtime: 'nodejs',
        region: process.env.GCP_REGION || 'unknown'
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseObj));
});

server.listen(port, () => {
    console.log(`Server's running on port ${port}`);
});
