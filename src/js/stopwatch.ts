let time: number = 0;
let runtime: boolean = true;

export function stopwatch(): void {
  if (runtime) {
    setTimeout(function () {
      time++;
      let stopwatchCount = document.querySelectorAll('.stopwatch');
      let mins = Math.floor(time / 10 / 60);
      let secs = Math.floor((time / 10) % 60);

      if (mins < 10) {
        // Тут надо придумать с нулями ('0' + mins)
        mins = mins;
      }
      if (secs < 10) {
        secs = secs;
      }
      stopwatchCount.forEach((el) => {
        el.innerHTML = mins + '.' + secs;
      });
      stopwatch();
    }, 100);
  }
}

export function stop(): void {
  runtime = false;
}
