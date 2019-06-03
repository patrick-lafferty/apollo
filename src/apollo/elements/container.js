import {GridMetaId} from './grid';
import {getConstructor, SExpType} from '../parsing';
import {Maybe} from '../../maybe';
import {UIElement} from './uielement';

export const MetaNamespace = Object.freeze({
    Grid: Symbol("GridNamespace"),
});

export class MetaData {
    constructor (namespace, id, value) {
        this.containerNamespace = namespace;
        this.metaId = id;
        this.value = value;
    }
}

export function parseGridMeta(grid, meta) {
    let count = grid.values.items.length;

    if (count < 2) {
        return Maybe.None();
    }

    for (let i = 1; i < count; i++) {
        let result = getConstructor(grid.values.items[i])
            .bind(constructor => {
                if (constructor.startsWith("row") && constructor.length === 2) {
                    return constructor.get(1, SExpType.IntLiteral)
                        .bind(value => {
                            meta.push(new MetaData(MetaNamespace.Grid, GridMetaId.Row, value.value));
                            return Maybe.Some(1);
                        });
                }
                else if (constructor.startsWith("column") && constructor.length === 2) {
                    return constructor.get(1, SExpType.IntLiteral)
                        .bind(value => {
                            meta.push(new MetaData(MetaNamespace.Grid, GridMetaId.Column, value.value));
                            return Maybe.Some(1);
                        });
                }
                else if (constructor.startsWith("row-span") && constructor.length === 2) {
                    return constructor.get(1, SExpType.IntLiteral)
                        .bind(value => {
                            meta.push(new MetaData(MetaNamespace.Grid, GridMetaId.RowSpan, value.value));
                            return Maybe.Some(1);
                        });
                }
                else if (constructor.startsWith("column-span") && constructor.length === 2) {
                    return constructor.get(1, SExpType.IntLiteral)
                        .bind(value => {
                            meta.push(new MetaData(MetaNamespace.Grid, GridMetaId.ColumnSpan, value.value));
                            return Maybe.Some(1);
                        });
                } 
                else {
                    return Maybe.None();
                }
            });

        if (!result.isSome()) {
            return Maybe.None();
        }
    }

    return Maybe.Some(grid);
}

export function parseMeta(config) {
    if (config.items.length < 2) {
        return Maybe.None();
    }

    let meta = [];

    for (let i = 1; i < config.items.length; i++) {
        let result = getConstructor(config.items[i])
            .bind(constructor => {
                if (constructor.startsWith("grid")) {
                    return parseGridMeta(constructor, meta);
                }
                else {
                    return Maybe.Some(1);
                }
            });

        if (!result.isSome()) {
            return Maybe.None();
        }
    }

    return Maybe.Some(meta);
}

export class Container extends UIElement {

    /*
    Forwards text layout requests up the ui hierarchy until it
    reaches the Window, which is capable of performing the request.
    */
    requestTextLayout(element) {

        if (this.parent != null) {
            this.parent.requestTextLayout(element);
        }
    }

    /*
    Forwards render requests up the ui hierarchy until it
    reaches the Window, which is capable of performing the request.
    */
    requestRender(element) {

        if (this.parent != null) {
            this.parent.requestRender(element);
        }
    }
}

export class ContainedElement {
    constructor(element, bounds) {
        this.element = element;
        this.bounds = bounds;
    }
}