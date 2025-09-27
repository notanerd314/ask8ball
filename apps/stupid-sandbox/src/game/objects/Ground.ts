import { GROUND_PROPERTIES } from "../constants";

export default class Ground extends Phaser.Physics.Matter.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {

    // Graphics-
    const g = scene.add.graphics();
    g.fillStyle(0x5D4037, 1);
    g.fillRect(0, 0, GROUND_PROPERTIES.width, GROUND_PROPERTIES.height);
    g.generateTexture('groundTexture', GROUND_PROPERTIES.width, GROUND_PROPERTIES.height);
    g.destroy();

    // Create ground and boundaries
    super(scene.matter.world, x, y + GROUND_PROPERTIES.height / 2, 'groundTexture');
    scene.add.existing(this);

    // Physics for ground
    this.setRectangle(GROUND_PROPERTIES.width, GROUND_PROPERTIES.height, { isStatic: true });

    // Left wall
    scene.matter.add.rectangle(
      x - GROUND_PROPERTIES.width / 2 - GROUND_PROPERTIES.wallThickness / 2, // position just left of ground
      y - GROUND_PROPERTIES.height / 2,                // align with ground top
      GROUND_PROPERTIES.wallThickness,
      GROUND_PROPERTIES.wallHeight,
      { isStatic: true }
    );

    // Right wall
    scene.matter.add.rectangle(
      x + GROUND_PROPERTIES.width / 2 + GROUND_PROPERTIES.wallThickness / 2, // position just right of ground
      y - GROUND_PROPERTIES.height / 2,
      GROUND_PROPERTIES.wallThickness,
      GROUND_PROPERTIES.wallHeight,
      { isStatic: true }
    );
  }
}
