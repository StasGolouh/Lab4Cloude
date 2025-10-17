const http = require('http');
const url = require('url');
const SERVER_PORT = process.env.PORT || 1111;


const requestHandler = (request, response) => {
    // Встановлюємо заголовки 
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Обробляємо запит, який надсилає браузер
    if (request.method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
    }

    // Парсимо URL, щоб отримати query-параметри
    const urlComponents = url.parse(request.url, true);
    const guestName = urlComponents.query.name || 'world';

    // Готуємо дані для відповіді у форматі JSON
    const responsePayload = {
        hello: guestName,
        runtime: 'nodejs',
        region: process.env.GCP_REGION || 'unknown'
    };
    
    // Надсилаємо відповідь клієнту
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(responsePayload));
};

// Створюємо екземпляр сервера, передаючи йому нашу функцію-обробник
const apiServer = http.createServer(requestHandler);

// Запускаємо сервер
apiServer.listen(SERVER_PORT, () => {
    console.log(`Сервер успішно запущено на порті ${SERVER_PORT}`);
});
