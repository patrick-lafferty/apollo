/*
Copyright (c) 2019, Patrick Lafferty
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the copyright holder nor the names of its 
      contributors may be used to endorse or promote products derived from 
      this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR 
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import {SExpType, getConstructor} from '../parsing';
import {Configuration, parseElement} from './element';
import {Container} from './container';
import {Maybe} from '../../maybe';

export const GridMetaId = Object.freeze({
    Row: 1,
    Column: 2,
    RowSpan: 3,
    ColumnSpan: 4
});

export class Grid extends Container {
    constructor() {
        super();

        this.children = [];
        this.rows = [];
        this.columns = [];
        this.rowGap = 0;
        this.columnGap = 0;

        this.itemSource = null;
        this.itemTemplate = null;
    }
}

class GridConfiguration extends Configuration {
    constructor() {
        super();

        this.rows = [];
        this.columns = [];
        this.items = null;
        this.rowGap = 0;
        this.columnGap = 0;
        this.itemSource = null;
        this.itemTemplate = null;
    }
}

export const Unit = Object.freeze({
    Proportional: Symbol("Proportional"),
    Fixed: Symbol("Fixed"),
});

class RowColumnDefinition {
    constructor(unit, value) {
        this.unit = unit;
        this.value = value;
    }
}

function parseRowColumn(config, definitions, proportional, fixed) {
    if (config.items.length === 1) {
        return false;
    }

    for (let i = 1; i < config.items.length; i++) {
        let constructor = getConstructor(config.items[i])
            .bind(constructor => {
                return constructor.get(1, SExpType.IntLiteral)
                    .bind(value => {
                        if (constructor.startsWith(proportional)) {
                            definitions.push(new RowColumnDefinition(Unit.Proportional, value.value));
                        }
                        else if (constructor.startsWith(fixed)) {
                            definitions.push(new RowColumnDefinition(Unit.Fixed, value.value));
                        }
                        else {
                            return Maybe.None();
                        }

                        return Maybe.Some(1);
                    });
            });
        
        if (!constructor.isSome()) {
            return false;
        }

    }

    return true;
}

export function parseGrid(grid) {

    if (grid.type !== SExpType.List) {
        return Maybe.None();
    }

    let config = new GridConfiguration();
    let first = true;

    for (let item of grid.items) {
        if (first) {
            first = false;

            if (item.type !== SExpType.Symbol
                    || item.value !== "grid") {
                return Maybe.None();
            }

            continue;
        }

        let constructor = getConstructor(item)
            .bind(constructor => {
                if (constructor.startsWith("rows")) {
                    if (!parseRowColumn(constructor.values, config.rows, 
                            "proportional-height", "fixed-height")) {
                        return Maybe.None();
                    }
                }
                else if (constructor.startsWith("columns")) {
                    if (!parseRowColumn(constructor.values, config.columns,
                            "proportional-width", "fixed-width")) {
                        return Maybe.None();
                    }
                }
                else if (constructor.startsWith("items")) {
                    config.items = constructor.values;
                }
                else if (constructor.startsWith("item-source")) {
                    let itemSource = constructor.get(1, SExpType.List);
        
                    if (itemSource.isSome()) {
                        config.itemSource = itemSource.value();
                    }
                }
                else if (constructor.startsWith("item-template")) {
                    let template = constructor.get(1, SExpType.List);
        
                    if (template.isSome()) {
                        config.itemTemplate = template.value();
                    }
                }
                else if (constructor.startsWith("meta")) {
                    config.meta = constructor.values;
                }
                else if (constructor.startsWith("row-gap")) {
                    if (constructor.length !== 2) {
                        return Maybe.None();
                    }
        
                    let value = constructor.get(1, SExpType.IntLiteral);
        
                    if (value.isSome()) {
                        config.rowGap = value.value;
                    }
                    else {
                        return Maybe.None();
                    }
                }
                else if (constructor.startsWith("column-gap")) {
                    if (constructor.length !== 2) {
                        return Maybe.None();
                    }
        
                    let value = constructor.get(1, SExpType.IntLiteral);
        
                    if (value.isSome()) {
                        config.columnGap = value.value;
                    }
                    else {
                        return Maybe.None();
                    }
                }
                else if (!parseElement(item, config)) {
                    return Maybe.None();
                }

                return Maybe.Some(constructor);
            });

        if (!constructor.isSome()) {
            return Maybe.None();
        }
    }

    return Maybe.Some(config);
}

export function createGrid(config) {
    let grid = new Grid(config);

    //TODO: setup itemsource binding, see grid.h: 94

    return grid;
}