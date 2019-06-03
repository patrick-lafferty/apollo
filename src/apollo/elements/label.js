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

import {Maybe} from '../../maybe';
import {SExpType, getConstructor} from '../parsing';
import {parseElement} from './element';
import {UIElement, adjustForAlignment} from './uielement';
import {Configuration} from './configuration';

export class LabelConfiguration extends Configuration {
    constructor() {
        super();

        this.caption = "";
    }
}

export class Label extends UIElement {

    constructor(config) {
        super(config);

        this.caption = config.caption;
    }

    static Create(config) {
        let label = new Label(config);

        //TODO: the bindings stuff

        return label;
    }

    render(renderer, bounds, clip) {
        //TODO: caption binding, see label.h:141
        let captionText = this.caption.value;
        bounds = this.getBounds(bounds);

        renderer.drawRectangle(this.backgroundColour, bounds, clip);

        if (captionText === null) {
            return;
        }

        /*bounds.x = adjustForAlignment(bounds.x, 
                this.horizontalAlignment, 
                bounds.width, 
                captionLayout.bounds.width);        
        bounds.x += padding.horizontal;
        bounds.y = adjustForAlignment(bounds.y, 
            this.verticalAlignment, 
            bounds.height, 
            captionLayout.bounds.height);
        bounds.y += padding.vertical;*/

        renderer.drawText(captionText/*Layout*/, bounds, clip, this.backgroundColour);
    }
}

export function parseLabel(label) {
    if (label.type !== SExpType.List) {
        return Maybe.None();
    }

    let config = new LabelConfiguration();
    let first = true;

    for (let item of label.items) {
        if (first) {
            first = false;

            if (item.type !== SExpType.Symbol 
                    || item.value !== "label") {
                return Maybe.None();
            }

            continue;
        }

        let constructor = getConstructor(item)
            .bind(constructor => {
                if (constructor.startsWith("caption")) {
                    if (constructor.length !== 2) {
                        return Maybe.None();
                    }

                    //TODO: databinding
                    constructor.get(1, SExpType.StringLiteral)
                        .bind(caption => config.caption = caption);
                }
                else if (constructor.startsWith("meta")) {
                    config.meta = constructor.values;
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