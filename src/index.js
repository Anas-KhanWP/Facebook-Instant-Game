
import Phaser from "phaser";
// import skyImage from '../assets/sky.png';
import PlayScene from "./scenes/Play";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [PlayScene]
};

new Phaser.Game(config);