export default () => {
  const lastItemRules = document.querySelector(`.rules__item:last-child`);
  const linkRules = document.querySelector(`.rules__link`);

  lastItemRules.addEventListener(`animationend`, () => {
    linkRules.classList.add(`rules__link--active`);
  });
};
