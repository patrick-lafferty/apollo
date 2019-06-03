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

import {Alignment} from './configuration';

export function adjustForAlignment(coordinate, alignment, boundedLength, contentLength) {

    switch (alignment) {
        case Alignment.Start: {
            //nothing needed for start alignment as its the default
            break;
        }
        case Alignment.Center: {
            coordinate += (boundedLength / 2) - (contentLength / 2);
            break;
        }
        case Alignment.End: {
            coordinate += boundedLength - contentLength;
            break;
        }
        default: break;
    }

    return coordinate;
}

/*
Base class for all elements
*/
export class UIElement {
    constructor(config) {
        this.parent = null;

        this.backgroundColour = config.backgroundColour;
        this.fontColour = config.fontColour;

        this.horizontalAlignment = config.horizontalAlignment;
        this.verticalAlignment = config.verticalAlignment;

        if (!(config.margins.vertical < 0 || config.margins.horizontal < 0)) {
            this.margins = config.margins;
        }

        if (!(config.padding.vertical < 0 || config.padding.horizontal < 0)) {
            this.padding = config.padding;
        }
    }

    getParent() { return this.parent; }
    setParent(parent) { this.parent = parent; }

    getBounds() { 
        let bounds = this.parent.getChildBounds(this);
        let horizontalMarginSpace = 2 * this.margins.horizontal;

        if (bounds.width > horizontalMarginSpace) {
            bounds.width -= horizontalMarginSpace;
            bounds.x += this.margins.horizontal;
        }

        let verticalMarginSpace = 2 * this.margins.vertical;

        if (bounds.height > verticalMarginSpace) {
            bounds.height -= verticalMarginSpace;
            bounds.y += this.margins.vertical;
        }

        return bounds;
    }
}