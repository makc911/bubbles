import {Bubble} from "./bubble.js";
import {Stimulus} from "./stimulus.js";

export class Field {
    constructor(layer){
        this.bubbles = [];
        this.returnTime = 0;
        this.layer = layer;
        this.stimulus = new Stimulus(this.layer);
    }

    createBubbles(dataForBubbles = {}) {
        const {delta, shiftX, shiftY} = this.getDelta(dataForBubbles);

        dataForBubbles.coordinates.forEach(({x, y}) => {
            const bubble = new Bubble(x * delta + shiftX, y * delta + shiftY, 2);
            this.bubbles.push(bubble);
        })
    }

    getDelta(dataForBubbles) {
        const textW = dataForBubbles.minMax.maxX - dataForBubbles.minMax.minX;
        const textH = dataForBubbles.minMax.maxY - dataForBubbles.minMax.minY;
        const deltaW = this.layer.w / textW;
        const deltaH = this.layer.h / textH;
        const delta = Math.min(deltaH, deltaW) * 0.8;
        const shiftX = (this.layer.w - textW * delta) / 2;
        const shiftY = (this.layer.h - textH * delta) / 2;

        return {delta, shiftX, shiftY};
    }

    display() {
        this.bubbles.forEach(bubble => {
            bubble.display(this.layer.ctx);
        });
    }

    update(correction) {
        this.bubbles.forEach(bubble => {
            bubble.update(this.stimulus, correction);
        });
    }

    onMouseClick({x, y, returnTime}) {
        this.returnTime = returnTime;
        this.stimulus.setNewCoordinates({x, y, returnTime: this.returnTime})
    }

    changeBubbles(dataForBubbles = {}) {
        const {delta, shiftX, shiftY} = this.getDelta(dataForBubbles);
        const deltaCount = dataForBubbles.coordinates.length - this.bubbles.length;
        let shift = 0;
        const freq = Math.abs(this.bubbles.length / deltaCount);
        const newBubbles = [];

        this.bubbles.forEach((bubble, index) => {
            let coor = dataForBubbles.coordinates[index + shift];
            bubble.baseX = coor.x * delta + shiftX;
            bubble.baseY = coor.y * delta + shiftY;
            newBubbles.push(bubble);

            if (index % freq && deltaCount !== shift) {
                if (deltaCount > 0) {
                    shift++;
                    coor = dataForBubbles.coordinates[index + shift];
                    const newBubble = new Bubble(bubble.x, bubble.y, 2);
                    newBubble.baseX = coor.x * delta + shiftX;
                    newBubble.baseY = coor.y * delta + shiftY;
                    newBubbles.push(newBubble);
                } else if (deltaCount < 0) {
                    shift--;
                    newBubbles.pop();
                }
            }

            this.bubbles = newBubbles;
        });

    }

}
