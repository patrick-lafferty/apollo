import {Container} from './container';
import {Bounds} from './element';
import {Configuration} from './configuration';

export class UIWindow extends Container {
    constructor(canvas) {
        super(new Configuration());
        this.child = null;
        this.canvas = canvas;
        this.renderer = null;
    }

    addChild(element) {
        this.child = element;
        this.child.setParent(this);
    }

    setRenderer(renderer) {
        this.renderer = renderer;
    }

    /*
    Arranges the children in some fashion by calculating each
    child element's bounds
    */
    layoutChildren() {
        if (this.child != null) {
            this.child.layoutChildren();
        }
    }

    /*
    Returns the bounds of the given child. Bounds are calculated
    in a layoutChildren call and stored in the ContainedElement
    */
    getChildBounds(child) {
        return new Bounds(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }

    render() {
        if (this.child != null) {
            let bounds = this.getChildBounds(null);
            this.child.render(this.renderer, bounds, bounds);
        }
    }
}