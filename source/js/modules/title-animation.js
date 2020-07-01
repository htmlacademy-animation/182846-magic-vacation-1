export default () => {
  class TitleAnimation {
    constructor(elementSelector, duration, property, delay = 0) {
      this.elementSelector = elementSelector;
      this.duration = duration;
      this.property = property;
      this.element = document.querySelector(this.elementSelector);
      this.delay = delay;
      this.delayLetter = 0;
    }

    createElement(letter) {
      const span = document.createElement(`span`);
      span.textContent = letter;
      span.style.transition = `${this.property} ${this.duration}ms ease ${this.delay + this.delayLetter}ms`;
      this.delayLetter = Math.floor(Math.random() * 400);
      return span;
    }

    createText() {
      if (!this.element) {
        return;
      }
      const text = this.element.textContent.trim().split(` `).filter((letter) => letter !== ``);

      const content = text.reduce((fragmentParent, word) => {
        const wordElement = Array.from(word).reduce((fragment, letter) => {
          fragment.appendChild(this.createElement(letter));
          return fragment;
        }, document.createDocumentFragment());
        const wordContainer = document.createElement(`span`);
        wordContainer.classList.add(`title-animation`);
        wordContainer.appendChild(wordElement);
        fragmentParent.appendChild(wordContainer);
        return fragmentParent;
      }, document.createDocumentFragment());

      this.element.innerHTML = ``;
      this.element.appendChild(content);
    }

    runAnimation() {
      if (!this.element) {
        return;
      }
      this.element.classList.add(`title-animation--active`);
    }

    destroyAnimation() {
      this.element.classList.remove(`title-animation--active`);
    }
  }

  const titleIntro = new TitleAnimation(`.intro__title`, 600, `transform`, 600);
  titleIntro.createText();

  const dateIntro = new TitleAnimation(`.intro__date`, 600, `transform`, 1600);
  dateIntro.createText();

  const titleHistory = new TitleAnimation(`.slider__item-title`, 600, `transform`);
  titleHistory.createText();

  const titlePrizes = new TitleAnimation(`.prizes__title`, 600, `transform`);
  titlePrizes.createText();

  const titleRules = new TitleAnimation(`.rules__title`, 600, `transform`);
  titleRules.createText();

  const titleGame = new TitleAnimation(`.game__title`, 600, `transform`);
  titleGame.createText();
};
