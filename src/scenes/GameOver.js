class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  toggleScoreDisplay(visible) {
    const scoreElement = document.querySelector(".score");
    if (visible) {
      scoreElement.classList.remove("score-hidden");
    } else {
      scoreElement.classList.add("score-hidden");
    }
  }

  toggleLivesDisplay(visible) {
    const livesElement = document.querySelector(".lives");
    if (visible) {
      livesElement.classList.remove("lives-hidden");
    } else {
      livesElement.classList.add("lives-hidden");
    }
  }

  create() {
    const spaceBackground = this.add.graphics({
      fillStyle: { color: 0x1a113c },
    });
    spaceBackground.fillRect(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    );

    const starsOverlay = this.add.graphics({ fillStyle: { color: 0xffffff } });
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * this.cameras.main.width;
      const y = Math.random() * this.cameras.main.height;
      const radius = Math.random() * 2;
      starsOverlay.fillCircle(x, y, radius);
    }

    this.toggleScoreDisplay(false);
    this.toggleLivesDisplay(false);

    const gameOverText = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2 - 50,
      "GAME \nOVER!",
      { font: "128px staatliches", fill: "#FFD408" }
    );
    gameOverText.setOrigin(0.5);

    this.time.delayedCall(4000, () => {
      this.scene.start("GameCredits");
    });
  }
}

export default GameOver;
