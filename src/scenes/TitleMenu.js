class TitleMenu extends Phaser.Scene {
  constructor() {
    super("TitleMenu");
    this.homeAudio = null;
  }

  preload() {
    this.load.audio("home", "./assets/home.mp3");
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

    const titleText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 4,
      "Welcome to\nInfinite Worlds",
      { font: "80px staatliches", fill: "#FFD408", align: "center" }
    );
    titleText.setOrigin(0.5, 0.2);

    const buttonWidth = 200;
    const buttonHeight = 50;
    const x = this.cameras.main.width / 2 - buttonWidth / 2;
    const y = this.cameras.main.height / 2 - buttonHeight / 2 + 100;

    const buttonGraphics = this.add.graphics({
      fillStyle: { color: 0xff0000 },
    });
    buttonGraphics.fillRect(x, y, buttonWidth, buttonHeight);

    const buttonText = this.add.text(
      x + buttonWidth / 2,
      y + buttonHeight / 2,
      "Start Game",
      {
        font: "25px staatliches",
        fill: "black",
      }
    );
    buttonText.setOrigin(0.5, 0.5);

    const startButton = this.add
      .zone(x, y, buttonWidth, buttonHeight)
      .setOrigin(0)
      .setInteractive();
    startButton.on("pointerdown", () => {
      this.toggleScoreDisplay(true);
      if (this.homeAudio) {
        this.homeAudio.stop();
        this.homeAudio.destroy();
        this.homeAudio = null;
      }
      this.scene.start("Controls");
    });

    startButton.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer";
    });

    startButton.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
    });

    this.inputs = this.input.keyboard.createCursorKeys();

    const loadAudio = () => {
      if (!this.homeAudio) {
        this.homeAudio = this.sound.add("home", { loop: true });
        this.homeAudio.play();
      }
    };

    loadAudio();

    this.scene.get("Controls").events.once("start", () => {
      if (this.homeAudio) {
        this.homeAudio.stop();
        this.homeAudio.destroy();
        this.homeAudio = null;
      }
    });
  }

  shutdown() {
    if (this.homeAudio) {
      this.homeAudio.stop();
      this.homeAudio.destroy();
      this.homeAudio = null;
    }
  }
}

export default TitleMenu;
