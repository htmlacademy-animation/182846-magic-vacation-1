// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import pageLoad from './modules/page-load.js';
import rules from './modules/rules.js';
import titleAnimation from './modules/title-animation.js';
import headingAnimation from './modules/heading-animation.js';
import WalrusScene from './modules/walrus-canvas-animation.js';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
pageLoad();
rules();
titleAnimation();
headingAnimation();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const animationWalrus = new WalrusScene({
  canvas: `#walrus-canvas`
});

animationWalrus.startAnimation();
