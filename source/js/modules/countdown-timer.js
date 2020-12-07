export default () => {
  const startTimer = Date.now();
  const secondNode = document.querySelector(`.game__counter span:last-child`);
  const minuteNode = document.querySelector(`.game__counter span:first-child`);

  function getTimeRemaining(durationSession = 5) {
    const endTime = startTimer + (durationSession * 60 * 1000);
    const time = endTime - Date.now();
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    return {
      time,
      seconds,
      minutes
    };
  }

  function showTimer() {
    const timer = getTimeRemaining();
    secondNode.innerHTML = (`0` + timer.seconds).slice(-2);
    minuteNode.innerHTML = (`0` + timer.minutes).slice(-2);

    const requestId = requestAnimationFrame(showTimer);

    if (timer.time <= 1000) {
      cancelAnimationFrame(requestId);
    }
  }

  requestAnimationFrame(showTimer);
};
