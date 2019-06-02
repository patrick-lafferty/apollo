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

import {Maybe} from '../maybe';
import {getConstructor, getConstructorType, KnownType, KnownContainers, SExpType} from './parsing';
import {parseGrid, createGrid} from './elements/grid';
import {createElement} from './elements/element';
import {parseMeta} from './elements/container';

function createItems(constructor, parent) {
    let first = true;

    for (let item of constructor.values.items) {
        if (first) {
            if (item.type !== SExpType.Symbol
                    || item.value !== 'items') {
                return Maybe.None();
            }

            first = false;
            continue;
        }

        let child = getConstructor(item)
            .bind(constructor => {
                return getConstructorType(constructor)
                    .bind(type => Maybe.Some([constructor, type]));
            })
            .bind(([constructor, type]) => {
                if (type[0] === KnownType.Container) {
                    return createContainer(parent, type[1], constructor);
                }
                else {
                    return createElement(parent, type[1], constructor);
                }
            });

        if (!child.isSome()) {
            return Maybe.None();
        }
    }

    return Maybe.Some(parent);
}

function createContainerItems(parent, itemList) {
    if (itemList === null || itemList.type !== SExpType.List) {
        return Maybe.None();
    }

    return getConstructor(itemList)
        .bind(constructor => createItems(constructor, parent));
}

function finishContainer(container, parent, meta) {
    if (container.isSome()) {
        container = container.value();
    }
    else {
        return Maybe.None();
    }

    if (meta !== null) {
        let metaData = parseMeta(meta);

        if (metaData.isSome()) {
            parent.addChild(container, metaData.value());
        }
        else {
            parent.addChild(container);
        }
    }
    else {
        parent.addChild(container);
    }

    return Maybe.Some(container);
}

export function createContainer(parent, type, constructor) {
    switch (type) {
        case KnownContainers.Grid: {
            let grid = parseGrid(constructor.values)
                .bind(config => Maybe.Some([config, createGrid(config)]))
                .bind(([config, grid]) => Maybe.Some([config, createContainerItems(grid, config.items)]))
                .bind(([config, grid]) => finishContainer(grid, parent, config.meta));

            return grid;
        }
        case KnownContainers.ListView: {
            break;
        }
        default: return Maybe.None();
    }

    return Maybe.None();
}

export function loadLayout(root, window) {
    let container = getConstructor(root)
        .bind(constructor => {
            return getConstructorType(constructor)
                .bind(type => Maybe.Some([constructor, type]));  
        })
        .bind(([constructor, type]) => {
            if (type[0] === KnownType.Container) {
                return createContainer(window, type[1], constructor);
            }  
            else {
                return Maybe.None();
            }
        });
    
    if (container.isSome()) {
        return container.value();
    }
    else {
        return null;
    }
}