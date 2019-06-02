export class UIElement {
    constructor(config) {
        this.parent = null;
        this.bounds = null;
    }

    getParent() { return this.parent; }
    setParent(parent) { this.parent = parent; }

    getBounds() { return this.bounds; }
}