export class Loop {
    constructor(update, display) {
        this.update = update;
        this.display = display;

        this.deltaTime = 0;
        this.lastUpdate = 0;
        this.maxInterval = 40;

        requestAnimationFrame(this.animate.bind(this));
        this.animate();
    }

    animate(currentTime = 0) {
        requestAnimationFrame(stampTime => this.animate(stampTime));

        this.deltaTime = currentTime - this.lastUpdate;

        if (this.deltaTime <  this.maxInterval) {
            this.update(this.deltaTime / 1000);
            this.display();
        }

        this.lastUpdate = currentTime;
    }
}
