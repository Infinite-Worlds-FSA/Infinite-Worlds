// import Player from "../gameObjects/Player";
// import Debugger from "../gameObjects/Debugger";
// import Goomba from "../gameObjects/Goomba";
// import Coin from "../gameObjects/Coin";
// import Flag from "../gameObjects/Flag";

// import tiles from "../config/tiles";
// import generateAnimations from "../config/animations";

// class Game extends Phaser.Scene {
//   constructor() {
//     super("Game");
//     this.levelKey = "map";
//     this.mapKeys = ["map", "map2", "map3", "map4", "map11"]; // Array of map keys
//   }

//   init(data) {
//     if (data && data.levelKey) {
//       this.levelKey = data.levelKey;
//     }
//   }

//   // Tileset by https://www.deviantart.com/thecrushedjoycon/art/Super-Mario-Bros-Mega-Tileset-Ver-2-842092790
//   // Goombas are from https://mfgg.net/index.php?act=resdb&param=02&c=1&id=4200
//   // Mario from https://www.mariomayhem.com/downloads/sprites/super_mario_bros_sprites.php
//   // Atlas generated by https://gammafp.github.io/atlas-packer-phaser/editor
//   preload() {
//     this.load.image("tiles", "./assets/tiles.png");
//     this.load.atlas(
//       "atlas",
//       "./assets/sprite-atlas.png",
//       "./assets/sprite-atlas.json"
//     );

//     // Load all map files
//     for (const mapKey of this.mapKeys) {
//       this.load.tilemapTiledJSON(mapKey, `./assets/${mapKey}.json`);
//     }

//     this.load.on("complete", () => {
//       generateAnimations(this);
//     });
//   }

//   loadNewLevel() {
//     const currentIndex = this.mapKeys.indexOf(this.levelKey);
//     const nextIndex = (currentIndex + 1) % this.mapKeys.length;
//     const nextLevelKey = this.mapKeys[nextIndex];
//     this.scene.start("Game", { levelKey: nextLevelKey });
//   }

//   showScore() {
//     const scoreElement = document.querySelector(".score");
//     scoreElement.classList.remove("score-hidden");
//   }

//   create() {
//     this.showScore();
//     const noCollisionTiles = [tiles.EMPTY, tiles.FLAG_LEFT];

//     this.map = this.make.tilemap({ key: this.levelKey });
//     this.tileset = this.map.addTilesetImage("map-tileset", "tiles");
//     this.platform = this.map.createLayer("platform", this.tileset, 0, 0);

//     this.map.createLayer("background", this.tileset, 0, 0);
//     this.platform.setCollisionByExclusion(noCollisionTiles, true);

//     this.player = new Player(this, 25, 400).collideWith(this.platform);
//     this.goombas = new Goomba(this).collideWith(this.platform);
//     this.coins = new Coin(this).collideWith(this.player.sprite);
//     this.flag = new Flag(this);
//     this.debugger = new Debugger(this);

//     this.inputs = this.input.keyboard.createCursorKeys();
//   }

//   update() {
//     this.player.update(this.inputs);
//     this.goombas.update();
//     this.coins.update();
//     this.debugger.debuggerEnabled && this.debugger.update();
//   }
// }

// export default Game;

import Player from "../gameObjects/Player";
import Debugger from "../gameObjects/Debugger";
import Goomba from "../gameObjects/Goomba";
import Coin from "../gameObjects/Coin";
import Flag from "../gameObjects/Flag";

import tiles from "../config/tiles";
import generateAnimations from "../config/animations";

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
    this.levelKey = "map";
    this.mapKeys = ["map", "map2", "map3", "map4", "map11"]; // Array of map keys
  }

  init(data) {
    if (data && data.levelKey) {
      this.levelKey = data.levelKey;
    }
  }

  // Tileset by https://www.deviantart.com/thecrushedjoycon/art/Super-Mario-Bros-Mega-Tileset-Ver-2-842092790
  // Goombas are from https://mfgg.net/index.php?act=resdb&param=02&c=1&id=4200
  // Mario from https://www.mariomayhem.com/downloads/sprites/super_mario_bros_sprites.php
  // Atlas generated by https://gammafp.github.io/atlas-packer-phaser/editor
  preload() {
    this.load.image("tiles", "./assets/tiles.png");
    this.load.atlas(
      "atlas",
      "./assets/sprite-atlas.png",
      "./assets/sprite-atlas.json"
    );

    // Load all map files
    for (const mapKey of this.mapKeys) {
      this.load.tilemapTiledJSON(mapKey, `./assets/${mapKey}.json`);
    }

    this.load.on("complete", () => {
      generateAnimations(this);
    });
  }

  loadNewLevel() {
    const currentIndex = this.mapKeys.indexOf(this.levelKey);
    const nextIndex = (currentIndex + 1) % this.mapKeys.length;
    const nextLevelKey = this.mapKeys[nextIndex];
    this.scene.start("Game", { levelKey: nextLevelKey });
  }

  showScore() {
    const scoreElement = document.querySelector(".score");
    scoreElement.classList.remove("score-hidden");
  }

  create() {
    this.showScore();
    const noCollisionTiles = [tiles.EMPTY, tiles.FLAG_LEFT];

    this.map = this.make.tilemap({ key: this.levelKey });
    this.tileset = this.map.addTilesetImage("map-tileset", "tiles");
    this.platform = this.map.createLayer("platform", this.tileset, 0, 0);

    this.map.createLayer("background", this.tileset, 0, 0);
    this.platform.setCollisionByExclusion(noCollisionTiles, true);

    this.player = new Player(this, 25, 400).collideWith(this.platform);
    this.goombas = new Goomba(this).collideWith(this.platform);
    this.coins = new Coin(this).collideWith(this.player.sprite);
    this.flag = new Flag(this);
    this.debugger = new Debugger(this);

    this.inputs = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update(this.inputs);
    this.goombas.update();
    this.coins.update();
    this.debugger.debuggerEnabled && this.debugger.update();
  }
}

export default Game;
