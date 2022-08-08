let time = 0;
let runtime = true;

export function stopwatch() {
  if (runtime) {
    setTimeout(function () {
      time++;
      let stopwatchCount = document.querySelectorAll('.stopwatch');
      let mins = Math.floor(time / 10 / 60);
      let secs = Math.floor((time / 10) % 60);

      if (mins < 10) {
        mins = '0' + mins;
      }
      if (secs < 10) {
        secs = '0' + secs;
      }
      stopwatchCount.forEach((el) => {
        el.innerHTML = mins + '.' + secs;
      });
      stopwatch();
    }, 100);
  }
}

export function stop() {
  runtime = false;
}
