import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import Phaser from 'phaser';
import MainScene from './game/MainScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  backgroundColor: '#fff',
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 1 },
      debug: true,
    },
  },
  scene: [MainScene],
};

new Phaser.Game(config);
render(<App />, document.getElementById('app')!)
