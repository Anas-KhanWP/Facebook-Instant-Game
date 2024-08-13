
import Phaser from "phaser";
// import skyImage from '../assets/sky.png';
import PlayScene from "./scenes/Play";
import PreloadScene from "./scenes/Preload";

const WIDTH = document.body.offsetWidth;
const HEIGHT = document.body.offsetHeight;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
      // debug: true
    }
  },
  scene: [PreloadScene, PlayScene]
};


if (process.env.FB_ENV || process.env.NODE_ENV === 'production') {
  FBInstant.initializeAsync().then(() => {
    new Phaser.Game(config);
  })
} else {
  new Phaser.Game(config);
}
