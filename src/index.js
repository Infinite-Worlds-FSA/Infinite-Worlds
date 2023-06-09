import Phaser from "phaser";

import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
import TitleMenu from "./scenes/TitleMenu.js";
import GameCredits from "./scenes/GameCredits.js";
import Controls from "./scenes/Controls.js";

import "./assets/scss/index.scss";

const config = {
  width: 640,
  height: 480,
  parent: "sprite",
  backgroundColor: "#FFFFAC",
  title: "Tilemap",
  url: "webtips.dev",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 1000,
      },
    },
  },
  scene: [TitleMenu, Controls, Game, GameOver, GameCredits],
};

new Phaser.Game(config);
