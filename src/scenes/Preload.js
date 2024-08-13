import Phaser from "phaser";
import skyImage from "../../assets/sky.png"
import bombImage from "../../assets/bomb.png"
import playerImage from "../../assets/player.png"

class Preload extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.image('sky', skyImage);
        this.load.image('bomb', bombImage);
        this.load.image('player', playerImage);

        const isProd = process.env.FB_ENV || process.env.NODE_ENV === 'production'

        this.load.on('progress', (value) => {
            isProd && FBInstant.setLoadingProgress(value * 100);
        })

        this.load.once('complete', () => {
            if (isProd) {
                FBInstant.startGameAsync().then(() => {
                    this.startGame();
                })
            } else {
                this.startGame();
            }
        })
    }

    startGame() {
        this.scene.start('PlayScene');
    }
}

export default Preload