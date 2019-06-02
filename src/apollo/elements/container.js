export const MetaNamespace = Object.freeze({
    Grid: Symbol("GridNamespace"),
});

export class MetaData {
    constructor (namespace, id, value) {
        this.namespace = namespace;
        this.id = id;
        this.value = value;
    }
}

export class Container {
    requestTextLayout(element) {

        if (this.parent != null) {
            this.parent.requestTextLayout(element);
        }
    }

    requestRender(element) {

        if (this.parent != null) {
            this.parent.requestRender(element);
        }
    }
}