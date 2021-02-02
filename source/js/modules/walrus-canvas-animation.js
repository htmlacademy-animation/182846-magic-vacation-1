import {bezierEasing} from '../helpers/cubic-bezier';
import {animateDuration, animateEasing} from '../helpers/animate';
import {runSerial} from '../helpers/promise';

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

export default class WalrusScene {
  constructor(options) {
    this.canvas = document.querySelector(options.canvas);
    this.ctx = this.canvas.getContext(`2d`);

    this.walrusImg = new Image();
    this.iceImg = new Image();
    this.airplaneImg = new Image();
    this.snowflakeOneImg = new Image();
    this.snowflakeTwoImg = new Image();
    this.treeOneImg = new Image();
    this.treeTwoImg = new Image();

    this.loadingCounter = 0;

    this.isAnimated = false;

    this.startAnimations = [];

    this.walrusWidth = 500;
    this.walrusHeight = 500;
    this.walrusL = (windowWidth - this.walrusWidth) / 2;
    this.walrusT = (windowHeight - this.walrusHeight) / 2;

    this.iceWidth = 408;
    this.iceHeight = 167;
    this.iceL = (windowWidth - this.iceWidth) / 2;
    this.iceT = (windowHeight - this.iceHeight) / 2 + 90;

    this.airplaneWidth = 150;
    this.airplaneHeight = 150;
    this.airplaneL = (windowWidth - this.airplaneWidth) / 2;
    this.airplaneT = (windowHeight - this.airplaneHeight) / 2;
    this.airplaneAngle = 90;

    this.snowflakeOneWidth = 300;
    this.snowflakeOneHeight = 300;
    this.snowflakeOneL = (windowWidth - this.snowflakeOneWidth) / 2;
    this.snowflakeOneT = (windowHeight - this.snowflakeOneHeight) / 2;

    this.snowflakeTwoWidth = 200;
    this.snowflakeTwoHeight = 200;
    this.snowflakeTwoL = (windowWidth - this.snowflakeOneWidth) / 2;
    this.snowflakeTwoT = (windowHeight - this.snowflakeOneHeight) / 2;

    this.snowflakesOpacity = 0;

    this.sceneX = 0;
    this.sceneY = 0;
    this.sceneAngle = 0;

    this.initEventListeners();
    this.updateSceneSizing();
    this.loadImages();
  }

  increaseLoadingCounter() {
    this.loadingCounter++;

    if (this.loadingCounter === 7) {
      this.drawScene();
    }
  }


  initEventListeners() {
    this.walrusImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.iceImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.airplaneImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.snowflakeOneImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.snowflakeTwoImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.treeOneImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.treeTwoImg.onload = () => {
      this.increaseLoadingCounter();
    };
  }


  loadImages() {
    this.walrusImg.src = `/img/sea-calf-2.png`;
    this.iceImg.src = `/img/ice.png`;
    this.airplaneImg.src = `/img/airplane.png`;
    this.snowflakeOneImg.src = `/img/snowflake.png`;
    this.snowflakeTwoImg.src = `/img/snowflake.png`;
    this.treeOneImg.src = `/img/tree.png`;
    this.treeTwoImg.src = `/img/tree-2.png`;
  }


  updateSceneSizing() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }


  rotateCtx(angle, cx, cy) {
    this.ctx.translate(cx, cy);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.translate(-cx, -cy);
  }

  skewCtx(x, y) {
    this.ctx.transform(1, x, y, 1, 0, 0);
  }


  drawWalrus() {
    this.ctx.globalAlpha = 1;
    this.ctx.translate(this.sceneX, this.sceneY);
    this.rotateCtx(this.sceneAngle, windowWidth / 2, windowHeight / 2);
    this.ctx.drawImage(this.iceImg, this.iceL, this.iceT, this.iceWidth, this.iceHeight);

    this.ctx.save();
    this.ctx.drawImage(this.walrusImg, this.walrusL, this.walrusT, this.walrusWidth, this.walrusHeight);
    this.ctx.restore();
  }


  drawSnowflake() {
    this.ctx.save();

    this.ctx.translate(this.snowflakeOneL, this.snowflakeOneT);
    this.ctx.drawImage(this.snowflakeOneImg, -250, 0, this.snowflakeOneWidth, this.snowflakeOneHeight);

    this.ctx.translate(this.snowflakeTwoL, this.snowflakeTwoT);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(this.snowflakeTwoImg, 100, 0, this.snowflakeTwoWidth, this.snowflakeTwoHeight);

    this.ctx.restore();
  }


  drawScene() {
    this.canvas.width = windowWidth;
    this.canvas.height = windowHeight;

    this.ctx.clearRect(0, 0, windowWidth, windowHeight);

    if (this.isAnimated) {
      this.ctx.globalAlpha = this.snowflakesOpacity;

      this.drawSnowflake();
      this.drawWalrus();
    }
  }


  animateSnowflake() {
    const snowflakeOpacityTick = (progress) => {
      this.snowflakesOpacity = progress;
    };

    animateEasing(snowflakeOpacityTick, 500, bezierEasing(0, 0, 1, 1));
  }


  animateWalrusFluctuations() {
    const walrusYAnimationTick = (from, to) => (progress) => {
      this.sceneY = from + progress * (to - from);
    };

    const symmetricalEase = bezierEasing(0.33, 0, 0.67, 1);

    const walrusYFrom = 85;
    const walrusYTo = 100;
    const walrusYAnimations = [
      () => animateEasing(walrusYAnimationTick(1000, 85), 1500, symmetricalEase),
      () => animateEasing(walrusYAnimationTick(walrusYFrom, walrusYTo), 500, symmetricalEase),
      () => animateEasing(walrusYAnimationTick(walrusYTo, walrusYFrom), 500, symmetricalEase)
    ];

    runSerial(walrusYAnimations);

    const walrusAngleAnimationTick = (from, to) => (progress) => {
      this.sceneAngle = from + progress * (to - from);
    };

    const walrusAngleStart = 0;
    const walrusAngleFrom = 10;
    const walrusAngleTo = -5;
    const walrusAngleAnimations = [
      () => animateEasing(walrusAngleAnimationTick(walrusAngleFrom, walrusAngleTo), 500, symmetricalEase),
      () => animateEasing(walrusAngleAnimationTick(walrusAngleTo, walrusAngleStart), 500, symmetricalEase)
    ];

    animateEasing(walrusAngleAnimationTick(walrusAngleStart, walrusAngleFrom), 3000, symmetricalEase)
      .then(() => {
        runSerial(walrusAngleAnimations);
      });
  }

  startAnimationInfinite() {
    const globalAnimationTick = () => {
      this.drawScene();
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 6000)
    ];

    runSerial(animations).then(this.startAnimationInfinite.bind(this));
  }


  startAnimation() {
    if (!this.isAnimated) {
      this.isAnimated = true;

      const globalAnimationTick = (globalProgress) => {
        const showWalrusAnimationDelay = 0;
        const snowflakeAnimationDelay = 1500;

        if (globalProgress >= showWalrusAnimationDelay && this.startAnimations.indexOf(showWalrusAnimationDelay) < 0) {
          this.startAnimations.push(showWalrusAnimationDelay);

          this.animateWalrusFluctuations();
          this.startAnimationInfinite();
        }

        if (globalProgress >= snowflakeAnimationDelay && this.startAnimations.indexOf(snowflakeAnimationDelay) < 0) {
          this.startAnimations.push(snowflakeAnimationDelay);

          this.animateSnowflake();
        }
      };

      animateDuration(globalAnimationTick, 6000);
    }
  }
}
