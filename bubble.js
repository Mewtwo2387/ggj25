class Bubble {
  constructor(x, y, baseRadius, baseValue, speed, colour) {
      this.x = x;
      this.y = y;
      this.baseRadius = baseRadius;
      this.radius = baseRadius;
      this.baseValue = baseValue;
      this.currentValue = baseValue;
      this.baseSpeed = speed;
      this.speed = speed;
      this.gradient = this.createGradient();
      this.popping = false;
      this.colour = colour;
  }

  createGradient() {
      const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
      if (this.colour === 'blue') {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
          gradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.8)');
          gradient.addColorStop(1, 'rgba(70, 130, 180, 0.8)');
      } else if (this.colour === 'green') {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
          gradient.addColorStop(0.5, 'rgba(144, 238, 144, 0.8)');
          gradient.addColorStop(1, 'rgba(60, 179, 113, 0.8)');
      } else if (this.colour === 'red') {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
          gradient.addColorStop(0.5, 'rgba(255, 105, 105, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0.8)');
      } else if (this.colour === 'golden') {
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0.8)');
      }
      return gradient;
  }

  pop() {
      this.popping = true;
  }

  draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.gradient;
      ctx.fill();
      ctx.closePath();

      ctx.font = `${this.radius * 0.5}px Arial`;
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`$${format(this.currentValue)}`, this.x, this.y);
  }

  update() {
      if (this.popping) {
          this.radius -= this.baseRadius * 0.1;
          if (this.radius <= 0) {
              return true;
          }
      } else {
          this.y -= this.speed;
          if (this.water) {
            this.radius += this.baseRadius * (0.02 * this.baseSpeed);
            this.currentValue += this.baseValue * 0.02;
          } else {
            this.radius += this.baseRadius * (0.01 * this.baseSpeed);
            this.currentValue += this.baseValue * 0.01;
          }
      }
      this.gradient = this.createGradient();
      return false;
  }
}

function spawnBlueBubble() {
  if (!document.hasFocus()) {
      return;
  }
  let x, y;
  do {
      x = Math.random() * (canvas.width - 20) + 10;
      y = canvas.height + 20;
  } while (x < uiBounds.x + uiBounds.width && y < uiBounds.y + uiBounds.height);

  const random = Math.random();
  const baseValue = random * gameData.blueMaxBaseValue * gameData.blueBaseValueMultiplier;
  const baseRadius = random * 10 + 10;
  const speed = (Math.random() * 1 + 1) * gameData.blueRiseSpeed;
  if (gameData.golden) {
    if (Math.random() < 0.05) {
      gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue * 20, speed, 'golden'));
    } else {
      gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue, speed, 'blue'));
    }
  } else {
    gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue, speed, 'blue'));
  }
  console.log(gameData.bubbles);
}

function spawnGreenBubble() {
  if (!document.hasFocus()) {
      return;
  }
  let x, y;
  do {
      x = Math.random() * (canvas.width - 20) + 10;
      y = canvas.height + 20;
  } while (x < uiBounds.x + uiBounds.width && y < uiBounds.y + uiBounds.height);

  const random = Math.random();
  const baseValue = random * gameData.greenMaxBaseValue * gameData.greenBaseValueMultiplier;
  const baseRadius = random * 5 + 5;
  const speed = (Math.random() * 1 + 1) * gameData.greenRiseSpeed;
  if (gameData.golden) {
    if (Math.random() < 0.05) {
      gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue * 20, speed, 'golden'));
    } else {
      gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue, speed, 'green'));
    }
  } else {
    gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue, speed, 'green'));
  }
  console.log(gameData.bubbles);
}

function spawnRedBubble() {
    if (!document.hasFocus()) {
        return;
    }
    let x, y;
    do {
        x = Math.random() * (canvas.width - 20) + 10;
        y = canvas.height + 20;
    } while (x < uiBounds.x + uiBounds.width && y < uiBounds.y + uiBounds.height);

    const random = Math.random();
    const baseValue = random * gameData.redMaxBaseValue * gameData.redBaseValueMultiplier;
    const baseRadius = random * 3 + 3;
    const speed = (Math.random() * 1 + 1) * gameData.redRiseSpeed;
    if (gameData.golden) {
      if (Math.random() < 0.05) {
        gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue * 20, speed, 'golden'));
      } else {
        gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue, speed, 'red'));
      }
    } else {
      gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue, speed, 'red'));
    }
    console.log(gameData.bubbles);
}
