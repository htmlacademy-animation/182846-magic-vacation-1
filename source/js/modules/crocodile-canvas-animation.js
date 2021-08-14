import Animation from '../helpers/animation.js';
import Scene2D from './scene-2d.js';
import _ from '../helpers/utils.js';

const IMAGES_URLS = Object.freeze({
  key: `./img/module-4/lose-images/key.png`,
  crocodile: `./img/module-4/lose-images/crocodile.png`,
  drop: `./img/module-4/lose-images/drop.png`,
  flamingo: `./img/module-4/lose-images/flamingo.png`,
  watermelon: `./img/module-4/lose-images/watermelon.png`,
  leaf: `./img/module-4/lose-images/leaf.png`,
  snowflake: `./img/module-4/lose-images/snowflake.png`,
  saturn: `./img/module-4/lose-images/saturn.png`,
});


const OBJECTS = Object.freeze({
  key: {
    imageId: `key`,
    x: 50,
    y: 50,
    size: 17,
    opacity: 0,
    transforms: {
      translateY: 0
    }
  },
  crocodile: {
    imageId: `crocodile`,
    x: 50,
    y: 55,
    size: 80,
    transforms: {
      translateX: 200,
      translateY: 0,
    }
  },
  flamingo: {
    imageId: `flamingo`,
    x: 55,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  watermelon: {
    imageId: `watermelon`,
    x: 55,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  leaf: {
    imageId: `leaf`,
    x: 55,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 55,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  saturn: {
    imageId: `saturn`,
    x: 55,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  drop: {
    imageId: `drop`,
    x: 47.5,
    y: 58,
    size: 3,
    opacity: 0,
    transforms: {
      scaleX: 1,
      scaleY: 0,
    }
  },
});

const LOCALS = Object.freeze({
  keyholeMask: {
    centerX: 50,
    centerY: 50,
  }
});


export default class CrocodileScene extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`crocodile-canvas`);

    super({
      canvas,
      objects: OBJECTS,
      imagesUrls: IMAGES_URLS,
    });

    this.afterInit = () => {
      this.objects.crocodile.after = this.drawKeyholeMask.bind(this);
    };

    this.initEventListeners();
    this.initObjects(OBJECTS);
    this.initLocals();
  }

  initLocals() {
    this.locals = {
      keyholeMask: {
        centerX: LOCALS.keyholeMask.centerX,
        centerY: LOCALS.keyholeMask.centerY
      }
    };
  }


  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));


    this.initKeyAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initLeafAnimations();
    this.initSnowflakeAnimations();
    this.initSaturnAnimations();
    this.initCrocodileAnimations();
    this.initDropAnimations();
  }


  drawKeyholeMask() {
    const m = this.locals.keyholeMask;
    const width = this.objects.key.size;

    const s = this.size / 100;

    this.ctx.save();
    this.ctx.fillStyle = `#5f458c`;

    this.ctx.beginPath();

    this.ctx.moveTo((m.centerX + width * 3) * s, (m.centerY + width * 0.85) * s);
    this.ctx.lineTo((m.centerX + width * 0.5) * s, (m.centerY + width * 0.85) * s);
    this.ctx.lineTo((m.centerX + width * 0.33) * s, (m.centerY + width * 0.005) * s);
    this.ctx.bezierCurveTo((m.centerX + width * 0.8) * s, (m.centerY - width * 0.5) * s, (m.centerX + width * 0.1) * s, (m.centerY - width) * s, (m.centerX + width * 0.2) * s, (m.centerY - width) * s);
    this.ctx.lineTo((m.centerX + width * 3) * s, (m.centerY - width) * s);

    this.ctx.fill();
    this.ctx.restore();
  }


  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.key.opacity = progress;
      },
      duration: 1000,
      easing: _.easeInCubic
    }));
  }


  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.opacity = progress;
        this.objects.flamingo.transforms.scaleX = progress;
        this.objects.flamingo.transforms.scaleY = progress;
        this.objects.flamingo.transforms.translateX = -30 * progress;
        this.objects.flamingo.transforms.translateY = -10 * progress;
      },
      delay: 1000,
      duration: 1000,
      easing: _.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = 100 * progress;
      },
      delay: 2250,
      duration: 1500,
      easing: _.easeOutExpo
    }));
  }


  initWatermelonAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.opacity = progress;
        this.objects.watermelon.transforms.scaleX = progress;
        this.objects.watermelon.transforms.scaleY = progress;
        this.objects.watermelon.transforms.translateX = -30 * progress;
        this.objects.watermelon.transforms.translateY = 10 * progress;
      },
      delay: 1000,
      duration: 1000,
      easing: _.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.transforms.translateY = 100 * progress;
      },
      delay: 2250,
      duration: 1500,
      easing: _.easeOutExpo
    }));
  }

  initLeafAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.opacity = progress;
        this.objects.leaf.transforms.scaleX = progress;
        this.objects.leaf.transforms.scaleY = progress;
        this.objects.leaf.transforms.translateX = 30 * progress;
        this.objects.leaf.transforms.translateY = -10 * progress;
      },
      delay: 1000,
      duration: 1000,
      easing: _.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.transforms.translateY = 100 * progress;
      },
      delay: 2250,
      duration: 1500,
      easing: _.easeOutExpo
    }));
  }


  initSnowflakeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.opacity = progress;
        this.objects.snowflake.transforms.scaleX = progress;
        this.objects.snowflake.transforms.scaleY = progress;
        this.objects.snowflake.transforms.translateX = 15 * progress;
        this.objects.snowflake.transforms.translateY = -5 * progress;
      },
      delay: 1000,
      duration: 1000,
      easing: _.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.transforms.translateY = 100 * progress;
      },
      delay: 2250,
      duration: 1500,
      easing: _.easeOutExpo
    }));
  }


  initSaturnAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.opacity = progress;
        this.objects.saturn.transforms.scaleX = progress;
        this.objects.saturn.transforms.scaleY = progress;
        this.objects.saturn.transforms.translateX = 30 * progress;
        this.objects.saturn.transforms.translateY = 10 * progress;
      },
      delay: 1000,
      duration: 1000,
      easing: _.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.transforms.translateY = 100 * progress;
      },
      delay: 2250,
      duration: 1500,
      easing: _.easeOutExpo
    }));
  }


  initCrocodileAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.crocodile.transforms.translateX = 50 * progressReversed;
        this.objects.crocodile.transforms.translateY = -10 * progressReversed;
      },
      delay: 1750,
      duration: 1000,
      easing: _.easeInCubic
    }));
  }


  initDropAnimations() {
    this.animations.push(new Animation({
      func: (progress, details) => {
        setInterval(() => {
          this.objects.drop.opacity = 1.5 * progress;
          this.objects.drop.transforms.scaleY = progress;
        }, 2000)
      },
      delay: 500,
      duration: 2000,
      easing: _.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress, details) => {
        setInterval(() => {
          this.objects.drop.transforms.translateY = 5 * progress;
        }, 1000)
      },
      delay: 2500,
      duration: 1000,
      easing: _.easeInCubic
    }));
  }
}
