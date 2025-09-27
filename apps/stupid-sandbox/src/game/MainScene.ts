import Phaser from 'phaser';
import { GRID_SIZE, GROUND_PROPERTIES } from './constants';

import Square from './objects/Square';
import Ground from './objects/Ground';
import Trampoline from './objects/Trampoline';

export default class MainScene extends Phaser.Scene {
  private dragging = false;
  private startX = 0;

  private debugCursor!: Phaser.GameObjects.Graphics;
  private debugText!: Phaser.GameObjects.Text;

  // world bounds
  private CAMERA_BOUNDS = {
    xMin: -GROUND_PROPERTIES.width / 2,
    xMax: GROUND_PROPERTIES.width / 2,
    yMin: -1000,
    yMax: 100
  };

  constructor() {
    super('MainScene');
  }

  create() {
    this.input.mouse?.disableContextMenu(); // allow right-click

    this.setupPhysics();
    this.spawnSquares();
    this.setupCameraControls();
    this.setupDebugCursor();

    // handle window resize
    window.addEventListener('resize', () => this.onResize());
    this.onResize(); // initial bounds setup
  }

  private setupPhysics(): void {
    new Ground(this, 0, 100);

    this.matter.add.mouseSpring({
      length: 0,
      stiffness: 0.5
    });
  }

  private spawnSquares(): void {
    // for (let i = 0; i < 20; i++) {
    //   new Square(
    //     this,
    //     Phaser.Math.Between(-20, 20),
    //     Phaser.Math.Between(0, -10),
    //     undefined, 3, 3, true
    //   );
    // }

    for (let i = 0; i < 50; i++) {
      new Square(
        this,
        Phaser.Math.Between(-20, 20),
        Phaser.Math.Between(0, -10)
      );
    }

    new Trampoline(this, 0, -1, undefined, 5, 5);
  }


  private setupCameraControls(): void {
    const cam = this.cameras.main;
    cam.scrollX = 0;
    cam.scrollY = -500;
    cam.zoom = 1;

    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      if (p.rightButtonDown()) {
        this.dragging = true;
        this.startX = p.x;
      }
    });

    this.input.on('pointerup', (p: Phaser.Input.Pointer) => {
      if (p.rightButtonReleased()) {
        this.dragging = false;
      }
    });

    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      if (!this.dragging) return;

      const deltaX = (p.x - this.startX) / cam.zoom;
      cam.scrollX -= deltaX;
      this.startX = p.x;
    });
  }

  private setupDebugCursor(): void {
    this.debugCursor = this.add.graphics();
    this.debugText = this.add.text(0, 0, '', {
      font: '16px Arial',
      color: '#ff0000',
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: { x: 2, y: 2 }
    });

    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      this.debugCursor.clear();
      this.debugCursor.fillStyle(0xff0000, 1);
      this.debugCursor.fillCircle(p.worldX, p.worldY, 5);

      this.debugText.setPosition(p.worldX + 10, p.worldY + 10);
      this.debugText.setText(`x: ${Math.floor(p.worldX / GRID_SIZE)}, y: ${Math.floor(p.worldY / GRID_SIZE)}`);
    });
  }

  private onResize(): void {
    this.scale.resize(window.innerWidth, window.innerHeight);
    this.updateCameraBounds();
  }

  private updateCameraBounds(): void {
    const cam = this.cameras.main;
    const width = this.CAMERA_BOUNDS.xMax - this.CAMERA_BOUNDS.xMin;
    const height = this.CAMERA_BOUNDS.yMax - this.CAMERA_BOUNDS.yMin;

    cam.setBounds(
      this.CAMERA_BOUNDS.xMin,
      this.CAMERA_BOUNDS.yMin,
      width,
      height
    );
  }
}
