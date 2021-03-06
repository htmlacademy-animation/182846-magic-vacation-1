import throttle from 'lodash/throttle';
import countdownTimer from './countdown-timer.js';
import animatingNumbers from './animating-numbers.js';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.curtain = document.querySelector(`.curtain`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: false}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    if (this.activeScreen === 2) {
      this.curtain.classList.add(`curtain--active`);
      this.screenElements.forEach((screen) => {
        setTimeout(() => {
          screen.classList.add(`screen--hidden`);
          screen.classList.remove(`active`);
        }, 550);
      });

      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
        setTimeout(() => this.screenElements[this.activeScreen].classList.add(`active`), 50);
      }, 550);

      setTimeout(() => {
        document.querySelectorAll(`.prize-animate`).forEach((el, i) => {
          setTimeout(() => {
            el.src = el.dataset.src + `?${Date.now()}`;
          }, 3500 * i);

          animatingNumbers();
        });
      }, 550);
    } else if (this.activeScreen === 4) {
      countdownTimer();

      this.curtain.classList.remove(`curtain--active`);
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      setTimeout(() => this.screenElements[this.activeScreen].classList.add(`active`), 0);
    } else {
      this.curtain.classList.remove(`curtain--active`);
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });

      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      setTimeout(() => this.screenElements[this.activeScreen].classList.add(`active`), 0);
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
