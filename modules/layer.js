export class Layer {
    constructor(container){

        container.appendChild(this.createLayer());
        this.init();
    }

    init() {
        this.fitToContainer(this.canvas);
        document.addEventListener('resize', e => {
            this.fitToContainer(this.canvas);
        });
    }

    createLayer() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        return this.canvas;
    }

    fitToContainer() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    get w() {
        return this.canvas.width;
    }

    get h() {
        return this.canvas.height;
    }
}
