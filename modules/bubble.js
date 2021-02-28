export class Bubble {
    constructor(x, y, size = 2){
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = size;
        this.baseSize = size;
        this.maxRadius = 10;
        this.speed = (Math.random() * 5) + 1;
        this.maxDistance = Math.random() * 200 + 200;
        this.backSpeedMultipe = 1 / (Math.random() * 20 + 10);
        // this.fillStyle = 'hsla(232, 75%, 50%, 0.7)';
        this.fillStyle = 'rgba(38, 64, 232)';
        this.strokeStyle = '#fff';
    }

    display(ctx) {
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0,Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    update(stimulus) {
        const dx = stimulus.x - this.x;
        const dy = stimulus.y - this.y;
        const distance = Math.hypot(dx, dy);
        const forceDirX = dx / distance;
        const forceDirY = dy / distance;
        const force = (stimulus.radius - distance) / stimulus.radius;
        const directionX = forceDirX * force * this.speed;
        const directionY = forceDirY * force * this.speed;

        if (distance < stimulus.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            const backDx = this.x - this.baseX;
            const backDy = this.y - this.baseY;
            if (backDx) {
                this.x -= backDx * this.backSpeedMultipe;
            }
            if (backDy) {
                this.y -= backDy * this.backSpeedMultipe;
            }
        }
    }

    getFillColor(delta) {
        const hue = 232;
        const saturation1 = 100;
        const saturation2 = 75;
        const lightness1 = 100;
        const lightness2 = 50;
        const opacity1 = 1;
        const opacity2 = 0.7;

        return `hsla(${hue}, ${(saturation1 - saturation2) * delta + saturation2}%, ${(lightness1 - lightness2) * delta + lightness2}%, ${(opacity1 - opacity2) * delta + opacity2})`;
    }
}
