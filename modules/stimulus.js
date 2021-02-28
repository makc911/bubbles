export class Stimulus {
    constructor(layer){
        this.layer = layer;
        this.x = -this.layer.w * 10;
        this.y = -this.layer.h * 10;
        this.radius = Math.max(this.layer.w, this.layer.h) / 1.5;

        this.returnTimer = null;
    }

    setNewCoordinates({x, y, returnTime}) {
        this.x = x;
        this.y = y;
        this.returnTime = returnTime;

        if (this.returnTimer) {
            clearTimeout(this.returnTimer)
        }

        this.returnTimer = setTimeout(() => {
            this.x = -this.layer.w;
            this.y = -this.layer.h;
            this.returnTimer = null;
        }, this.returnTime)
    }
}
