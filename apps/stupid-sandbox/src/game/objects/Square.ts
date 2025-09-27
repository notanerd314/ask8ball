import Phaser from 'phaser';
import { GRID_SIZE } from '../constants';

export default class Square extends Phaser.Physics.Matter.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number, y: number,
    color: number = 0xff0000,
    width: number = 1, height: number = 1,
    stationary: boolean = false
  ) {
    width = width * GRID_SIZE
    height = height * GRID_SIZE

    const textureKey = `square_${color}_${width}x${height}`;
    const graphics = scene.add.graphics();
    graphics.fillStyle(color, 1); // red
    graphics.fillRect(0, 0, width, height);
    graphics.generateTexture(textureKey, width, height);
    graphics.destroy();

    super(
      scene.matter.world,
      x * GRID_SIZE,
      y * GRID_SIZE,
      textureKey,
      undefined,
    )
    scene.add.existing(this);

    this.setRectangle(width, height);
    this.setBounce(0.2);
    this.setFriction(0.2);
    this.setMass(5);
    this.setStatic(stationary);
  }
}
