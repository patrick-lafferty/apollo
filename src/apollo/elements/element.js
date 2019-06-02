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

import {getConstructor, SExpType} from '../parsing';

export class Configuration {
    constructor() {
        this.meta = null;
        this.backgroundColour = "";
        this.fontColour = "";
        this.margins = {vertical: 0, horizontal: 0};
        this.padding = {vertical: 0, horizontal: 0};
        this.horizontalAlignment = Alignment.Start;
        this.verticalAlignment = Alignment.Start;
        this.fontSize = 14;
    }
}

function parseMargins(margins, config) {
    if (margins.items.length === 1) {
        return null;
    }

    for (let i = 1; i < margins.items.length; i++) {
        let failed = true;

        let constructor = getConstructor(margins.items[i]);

        if (constructor !== null) {
            if (constructor.length !== 2) {
                return false;
            }

            let value = constructor.get(1, SExpType.IntLiteral);

            if (value !== null) {
                if (constructor.startsWith("vertical")) {
                    config.vertical = value.value;
                    failed = false;
                }
                else if (constructor.startsWith("horizontal")) {
                    config.horizontal = value.value;
                    failed = false;
                }
            }
        }

        if (failed) {
            return null;
        }
    }

    return true;
}

export const Alignment = Object.freeze({
    Start: Symbol("Start"),
    Center: Symbol("Center"),
    End: Symbol("End")
});

function getAlignment(name) {
    if (name === "start") {
        return Alignment.Start;
    }
    else if (name === "center") {
        return Alignment.Center;
    }
    else if (name === "end") {
        return Alignment.End;
    }

    return null;
}

function parseAlignment(alignment, config) {
    if (alignment.items.length === 1) {
        return null;
    }

    for (let i = 1; i < alignment.items.length; i++) {
        let failed = true;

        let constructor = getConstructor(alignment.items[i]);

        if (constructor !== null) {
            if (constructor.length !== 2) {
                return false;
            }

            let value = constructor.get(1, SExpType.Symbol);

            if (value !== null) {
                if (constructor.startsWith("vertical")) {
                    let maybeAlignment = getAlignment(value.value);
                    
                    if (maybeAlignment !== null) {
                        config.verticalAlignment = maybeAlignment;
                        failed = false;
                    }
                }
                else if (constructor.startsWith("horizontal")) {
                    let maybeAlignment = getAlignment(value.value);
                    
                    if (maybeAlignment !== null) {
                        config.horizontalAlignment = maybeAlignment;
                        failed = false;
                    } 
                }
            }
        }

        if (failed) {
            return false;
        }
    }

    return true;
}

function parseColour(constructor) {
    let colour = constructor.get(1, SExpType.List);

    if (colour === null) {
        return null;
    }

    let colourConstructor = getConstructor(colour);

    if (colourConstructor === null) {
        return null;
    }

    if (colourConstructor.startsWith("rgb")) {
        if (colourConstructor.length !== 4) {
            return null;
        }

        let r = colourConstructor.get(1, SExpType.IntLiteral);
        let g = colourConstructor.get(2, SExpType.IntLiteral);
        let b = colourConstructor.get(3, SExpType.IntLiteral);

        if (r !== null && g !== null && b !== null) {
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    }
    else if (colourConstructor.startsWith("bind")) {
        console.log("TODO: colour binding not supported");
    }

    return null;
}

function getColour(constructor) {
    if (constructor.length !== 2) {
        return false;
    }

    let colour = parseColour(constructor);

    if (colour === null) {
        return false;
    }

    return colour;
}

export function parseElement(element, config) {
    let constructor = getConstructor(element);

    if (constructor !== null) {
        if (constructor.startsWith("background")) {
            let colour = getColour(constructor);

            if (colour === false) {
                return false;
            }

            config.backgroundColour = colour;
        }
        else if (constructor.startsWith("font-colour")) {
            let colour = getColour(constructor);

            if (colour === false) {
                return false;
            }

            config.fontColour = colour;
        }
        else if (constructor.startsWith("margins")) {
            return parseMargins(constructor.values, config.margins);
        }
        else if (constructor.startsWith("padding")) {
            return parseMargins(constructor.values, config.padding);
        }
        else if (constructor.startsWith("alignment")) {
            return parseAlignment(constructor.values, config);
        }
        else if (constructor.startsWith("font-size")) {
            if (constructor.length !== 2) {
                return false;
            }

            let fontSize = constructor.get(1, SExpType.IntLiteral);

            if (fontSize === null) {
                return false;
            }

            config.fontSize = fontSize;
        }
    }

    return true;
}