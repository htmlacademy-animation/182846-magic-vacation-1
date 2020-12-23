export default () => {
  class NumberAnimation {
    constructor(elementSelector, start, end, duration = 900) {
      this.elementSelector = elementSelector;
      this.element = document.querySelector(this.elementSelector);
      this.start = start;
      this.end = end;
      this.duration = duration;
      this.fps = 12;
      this.fpsInterval = 1000 / this.fps;
      this.startTimestamp = null;
      this.now = null;
      this.then = Date.now();
      this.elapsed = null;
      this.tick = this.tick.bind(this);
    }

    draw(progress) {
      this.element.innerHTML = Math.floor(progress * (this.end - this.start) + this.start);
    }

    tick(timestamp) {
      if (!this.startTimestamp) {
        this.startTimestamp = timestamp;
      }

      const progress = Math.min((timestamp - this.startTimestamp) / this.duration, 1);

      if (progress <= 1) {
        requestAnimationFrame(this.tick);
      }

      this.now = Date.now();
      this.elapsed = this.now - this.then;

      if (this.elapsed > this.fpsInterval) {
        this.then = this.now - (this.elapsed % this.fpsInterval);

        this.draw(progress);
      }
    }

    runAnimation() {
      requestAnimationFrame(this.tick);
    }
  }

  const numberPrimaryAward = new NumberAnimation(`.prizes__item--journeys b`, 0, 3);
  numberPrimaryAward.runAnimation();

  setTimeout(() => {
    const numberSecondaryAward = new NumberAnimation(`.prizes__item--cases b`, 0, 7);
    numberSecondaryAward.runAnimation();
  }, 3500);

  setTimeout(() => {
    const numberAdditionalAward = new NumberAnimation(`.prizes__item--codes b`, 11, 900);
    numberAdditionalAward.runAnimation();
  }, 7000);
};
