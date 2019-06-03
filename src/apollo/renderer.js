export class Renderer  {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    clear() {

        this.context.fillStyle = 'rgba(255,255,255,1)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRectangle(colour, bounds, clip) {
        let windowWidth = this.canvas.clientWidth;
        let windowHeight = this.canvas.clientHeight;

        if (bounds.x >= windowWidth || bounds.y >= windowHeight) {
            return;
        }

        let x = bounds.x;
        let y = bounds.y;
        let clippedWidth = bounds.width;
        let clippedHeight = bounds.height;

        if (bounds.x < clip.x) {
            x = clip.x;
            clippedWidth -= (clip.x - bounds.x);
        }

        if (bounds.y < clip.y) {
            y = clip.y;
            clippedHeight -= (clip.y - bounds.y);
        }

        if ((x + clippedWidth) >= (clip.x + clip.width)) {
            clippedWidth = clip.x + clip.width - x;
        }

        if ((y + clippedHeight) >= (clip.y + clip.height)) {
            clippedHeight = clip.y + clip.height - y;
        }

        if (clippedWidth < 0 || clippedHeight < 0) {
            return;
        }

        this.context.fillStyle = colour;
        this.context.fillRect(x, y, clippedWidth, clippedHeight);
    }

    drawText(layout, bounds, clip, backgroundColour) {
        this.context.fillStyle = 'rgb(0,0,0)';
        this.context.fillText(layout, bounds.x, bounds.y);
    }
}