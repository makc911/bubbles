import {Layer} from './layer.js';
import {Loop} from "./loop.js";
import {Field} from "./field.js";

const textArray = [
    {type: 'text', value: 'Canvas is awesome'},
    {type: 'text', value: 'so much amazing effects'},
    {type: 'text', value: 'just open editor and start playing with it'},
    {type: 'text', value: 'it easier than you think'},
    {type: 'text', value: 'start from first line'},
    {type: 'text', value: '<canvas>'},
];

class App {
    constructor(container) {
        this.returnTime = 1500;
        this.currentTextIndex = 0;
        this.timer = null;
        this.layer = new Layer(container);
        this.createField();
        this.loop = new Loop(this.update.bind(this), this.display.bind(this));

        this.init();
        this.initEvents();
    }

    createField() {
        this.field = new Field(this.layer);
    }

    update(correction = 0) {
        this.layer.ctx.clearRect(0,0, this.layer.canvas.width, this.layer.canvas.height);
        this.field.update(correction);
    }

    display() {
        this.field.display();
    }

    init() {
        this.hidden = new Layer(document.querySelector('#hiddenBlock'));
        const dataForBubbles = this.createText(textArray[this.currentTextIndex].value);
        console.log('coordinates', dataForBubbles);
        this.field.createBubbles(dataForBubbles);
    }

    createText(text) {
        const ctx = this.hidden.ctx;
        const coordinates = [];
        const minMax = {
            maxX: 0,
            maxY: 0,
            minX: 9999,
            minY: 9999,
        };

        ctx.clearRect(0, 0, this.hidden.w, this.hidden.h);
        ctx.fillStyle = 'white';
        ctx.font = '30px Verdana';
        ctx.fillText(text, 0, 30);

        const textData = ctx.getImageData(0, 0, this.hidden.w, this.hidden.h);

        for (let y = 0, y2 = textData.height; y < y2; y++) {
            for (let x = 0, x2 = textData.width; x < x2; x++) {
                if (textData.data[(y * 4 * textData.width) + (x * 4) + 3] > 128) {
                    coordinates.push({x, y});
                    minMax.maxX = x > minMax.maxX ? x : minMax.maxX;
                    minMax.maxY = y > minMax.maxY ? y : minMax.maxY;
                    minMax.minX = x < minMax.minX ? x : minMax.minX;
                    minMax.minY = y < minMax.minY ? y : minMax.minY;
                }
            }
        }

        return {coordinates, minMax};
    }

    initEvents() {
        this.layer.canvas.addEventListener('click', ({x, y}) => {
            if (this.timer) {
                return;
            }

            this.field.onMouseClick({x, y, returnTime: this.returnTime});
            this.timer = setTimeout(() => {
                this.changeText();
                this.timer = null;
            }, this.returnTime);
        })
    }

    changeText() {
        this.currentTextIndex = this.currentTextIndex >= textArray.length - 1 ? 0 : this.currentTextIndex + 1;
        const dataForBubbles = this.createText(textArray[this.currentTextIndex].value);

        this.field.changeBubbles(dataForBubbles);
    }

}

onload = () => {
    new App(document.querySelector('body'));
};


