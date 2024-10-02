export default (req, res) => {
    const startDebt = 1800;
    const startTime = new Date('2024-10-01T00:00:00Z').getTime(); // Время начала отсчёта
    const currentTime = new Date().getTime();
    const timeDiff = (currentTime - startTime) / 1000; // разница в секундах
    const dailyIncreaseRate = 1.05; // 5% в день
    const secondsInDay = 86400;
    const growthFactor = Math.pow(dailyIncreaseRate, timeDiff / secondsInDay);
    const currentDebt = startDebt * growthFactor;
  
    // Возвращаем текущее значение долга
    res.status(200).json({ debt: currentDebt.toFixed(6) });
  };
  