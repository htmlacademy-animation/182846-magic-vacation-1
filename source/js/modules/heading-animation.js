import WalrusScene from './walrus-canvas-animation.js';

export default () => {
  const winLetters = document.querySelectorAll(`.win-heading path`);
  const loseLetters = document.querySelectorAll(`.lose-heading path`);

  winLetters.forEach((el) => {
    const pathLength = el.getTotalLength();

    el.setAttribute(`stroke-dashoffset`, pathLength);
    el.setAttribute(`stroke-dasharray`, pathLength);
  });

  loseLetters.forEach((el) => {
    const pathLength = el.getTotalLength();

    el.setAttribute(`stroke-dashoffset`, pathLength);
    el.setAttribute(`stroke-dasharray`, pathLength);
  });

  document.querySelectorAll(`.game__button`).forEach((button) => {
    button.addEventListener(`click`, () => {
      if (button.dataset.target === `result`) {
        document.querySelectorAll(`.win-heading animate`).forEach((animate) => {
          animate.beginElement();
        });
        const animationWalrus = new WalrusScene();
        animationWalrus.start();
      } else if (button.dataset.target === `result3`) {
        document.querySelectorAll(`.lose-heading animate`).forEach((animate) => {
          animate.beginElement();
        });
      }
    });
  });
};
