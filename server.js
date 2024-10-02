const WebSocket = require('ws');
const http = require('http');

// Стартовая сумма долга
let debt = 1800;
// Время начала отсчёта
const startTime = new Date().getTime();

// Функция для вычисления текущего долга
function calculateDebt() {
  const currentTime = new Date().getTime();
  const timeDiff = (currentTime - startTime) / 1000; // разница в секундах
  const dailyIncreaseRate = 1.05; // 5% в день
  const secondsInDay = 86400;
  const growthFactor = Math.pow(dailyIncreaseRate, timeDiff / secondsInDay);
  return debt * growthFactor;
}

// Создаём HTTP сервер
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  // Отправляем текущий долг новому подключившемуся клиенту
  ws.send(JSON.stringify({ debt: calculateDebt() }));

  // Обновляем данные каждые секунды для всех подключённых клиентов
  const interval = setInterval(() => {
    const updatedDebt = calculateDebt();
    ws.send(JSON.stringify({ debt: updatedDebt }));
  }, 1000);

  ws.on('close', () => {
    clearInterval(interval);
  });
});

// Сервер слушает на порту 8080
server.listen(8080, () => {
  console.log('Сервер запущен на порту 8080');
});
