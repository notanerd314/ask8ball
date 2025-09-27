import Phaser from 'phaser';
import { GRID_SIZE } from '../constants';


export default class Trampoline extends Phaser.Physics.Matter.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    color: number = 0xffff00,
    width: number = 1,
    height: number = 1,
    stationary: boolean = true,
  ) {
    width *= GRID_SIZE;
    height *= GRID_SIZE;

    const textureKey = `trampoline_${color}_${width}x${height}`;
    const graphics = scene.add.graphics();
    graphics.fillStyle(color, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.generateTexture(textureKey, width, height);
    graphics.destroy();

    super(scene.matter.world, x * GRID_SIZE, y * GRID_SIZE, textureKey, undefined);
    scene.add.existing(this);

    this.setRectangle(width, height);
    this.setStatic(stationary);
    this.setFriction(0.1);
    this.setFrictionStatic(0.1);
    this.setBounce(0.5);

    this.setOnCollideActive(({ bodyB }: { bodyB: Phaser.Physics.Matter.MatterBody }) => {
      if (!bodyB.isStatic) {
        const forceMagnitude = 0.03; // tweak for strength
        bodyB.applyForce(bodyB, bodyB.position, { x: 0, y: -forceMagnitude });
      }
    });

  }
}
