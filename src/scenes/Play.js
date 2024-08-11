import Phaser from "phaser";
import skyImage from "../../assets/sky.png"
import bombImage from "../../assets/bomb.png"
import playerImage from "../../assets/player.png"

class PlayScene extends Phaser.Scene {

    constructor() {
        super("PlayScene");
    }

    preload() {
        this.load.image('sky', skyImage);
        this.load.image('bomb', bombImage);
        this.load.image('player', playerImage);
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.speed = 500;
        this.text = this.add.text(790, 10, "Hits: 0", {fontSize: '22px', fills: '#fff'}).setOrigin(1, 0);
        this.hits = 0;
        this.player = this.physics.add.sprite(400, 300, 'player').setCollideWorldBounds(true);

        const bombs = this.physics.add.group();
        bombs.createMultiple({
            classType: Phaser.Physics.Arcade.Sprite,
            quantity: 5,
            key: 'bomb',
            active: true,
            setXY: {
                x: 0,
                y: 0,
                stepX: 20,
                stepY: 20
            }
        })

        bombs.getChildren().forEach(bomb => {
            bomb.setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-500, 500), Phaser.Math.Between(-200, 200)).setImmovable(true);
        })

        this.physics.add.collider(this.player, bombs, () => {
            this.hits++;
            this.text.setText(`Hits: ${this.hits}`);
            this.player.setX(400).setY(300);
        })

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        const { up, down, left, right } = this.cursors;

        // console.log(this.player.body.velocity.y);
        if (up.isDown) {
            this.player.setVelocity(0, -this.speed);
        } else if (down.isDown) {
            this.player.setVelocity(0, this.speed);
        } else if (left.isDown) {
            this.player.setVelocity(-this.speed, 0);
        } else if (right.isDown) {
            this.player.setVelocity(this.speed, 0);
        } else {
            this.player.setVelocity(0, 0)
        }

    }

}

export default PlayScene