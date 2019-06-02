import {Container} from './container';

export class UIWindow extends Container {
    constructor() {
        super();
        this.child = null;
    }

    addChild(element) {
        this.child = element;
        this.child.setParent(this);
    }
}