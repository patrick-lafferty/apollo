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

function bracketMatches(opener, closer) {
    if (opener === '(') {
        return closer === ')';
    }
    else if (opener === '[') {
        return closer === ']';
    }
    else if (opener === '{') {
        return closer === '}';
    }
    else {
        return;
    }
}

export class List {
    constructor(head) {
        if (typeof(head) !== 'undefined') {
            this.items = [head];
        }
        else {
            this.items = [];
        }

        this.type = SExpType.List;
    }

    add(item) {
        this.items.push(item);
    }
}

export class BoolLiteral {
    constructor(value) {
        this.value = value;
        this.type = SExpType.BoolLiteral;
    }
}

export class IntLiteral {
    constructor(value) {
        this.value = value;
        this.type = SExpType.IntLiteral;
    }
}

export class StringLiteral {
    constructor(value) {
        this.value = value;
        this.type = SExpType.StringLiteral;
    }
}

export class SSymbol {
    constructor(value) {
        this.value = value;
        this.type = SExpType.Symbol;
    }
}

export class ParseError {
    constructor(message, line, column) {
        this.message = message;
        this.line = line;
        this.column = column;
    }
}

export class Constructor {
    constructor(name, values, length) {
        this.name = name;
        this.values = values;
        this.length = length;
    }

    startsWith(str) {
        return this.name.value === str;
    }

    get(index, type) {
        if (this.values.items[index].type === type) {
            return Maybe.Some(this.values.items[index]);
        }
        else {
            return Maybe.None();
        }
    }
}

export const KnownContainers = Object.freeze({
    Grid: Symbol("Grid"),
    ListView: Symbol("ListView"),
});

export const KnownElements = Object.freeze({
    Label: Symbol("Label"),
});

export const KnownType = Object.freeze({
    Container: Symbol("Container"),
    Element: Symbol("Element")
});

export function getConstructorType(constructor) {
    //see if its a container first
    if (constructor.startsWith("grid")) {
        return Maybe.Some([KnownType.Container, KnownContainers.Grid]);
    }
    else if (constructor.startsWith("list-view")) {
        return Maybe.Some([KnownType.Container, KnownContainers.ListView]);
    }

    //then see if its an element
    if (constructor.startsWith("label")) {
        return Maybe.Some([KnownType.Element, KnownElements.Label]);
    }

    return Maybe.None();
}

export function getConstructor(expression) {
    if (expression.type !== SExpType.List) {
        return Maybe.None();
    }

    if (expression.items.length === 0) {
        return Maybe.None();
    }

    if (expression.items[0].type !== SExpType.Symbol) {
        return Maybe.None();
    }

    return Maybe.Some(new Constructor(expression.items[0],
            expression,
            expression.items.length));
}

function isDigit(c) {
    switch (c) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9': return true;
        default: return false;
    }
}

const LiteralType = Object.freeze({
    None: Symbol("none"),
    Int: Symbol("int"),
    Float: Symbol("float"),
    String: Symbol("string")
});

export const SExpType = Object.freeze({
    Symbol: Symbol("Symbol"),
    IntLiteral: Symbol("IntLiteral"),
    FloatLiteral: Symbol("FloatLiteral"),
    StringLiteral: Symbol("StringLiteral"),
    BoolLiteral: Symbol("BoolLiteral"),
    List: Symbol("List"),
});

export function read(input) {
    let brackets = [];
    let expressions = [];
    let currentLine = 0;
    let currentColumn = 0;
    let topLevelExpressions = new List();

    for(let i = 0; i < input.length; i++) {
        let c = input[i];
        currentColumn++;

        switch(c) {
            case '(':
            case '[':
            case '{': {
                brackets.push(c);
                expressions.push(new List());
                break;
            }
            case ')':
            case ']':
            case '}': {

                if (brackets.length === 0 || expressions.length === 0) {
                    return new ParseError("Unexpected closing bracket", currentLine, currentColumn);
                }

                if (!bracketMatches(brackets[brackets.length - 1], c)) {
                    return new ParseError("Mismatched bracket", currentLine, currentColumn);
                }

                let completedExpression = expressions.pop();

                if (expressions.length === 0) {
                    topLevelExpressions.add(completedExpression);
                }
                else {
                    let top = expressions[expressions.length - 1];

                    if (top instanceof List) {
                        top.add(completedExpression);
                    }
                    else {
                        return new ParseError("Expected list", currentLine, currentColumn);
                    }
                }

                break;
            }
            case '\n': {
                currentLine++;
                currentColumn = 0;
                break;
            }
            case ' ':
            case '\t': {
                continue;
            }
            default: {

                let top = expressions[expressions.length - 1];

                if (!(top instanceof List)) {
                    return new ParseError("Expected list", currentLine, currentColumn);
                }

                let type = LiteralType.None;

                if (isDigit(c)) {
                    type = LiteralType.Int;
                }
                else if (c === '"') {
                    type = LiteralType.String;
                }
                else {
                    if (input.slice(i, 4) === "true"
                            && " )]}".includes(input[i + 4])) {
                        top.add(new BoolLiteral(true));
                        i += 4;
                        continue;
                    }
                    else if (input.slice(i, 5) === "false"
                            && " )]}".includes(input[i + 5])) {
                        top.add(new BoolLiteral(false));
                        i += 5;
                        continue;
                    }
                }

                let done = false;
                let j = i;

                for (; j < input.length; j++) {
                    c = input[j];

                    switch (type) {
                        case LiteralType.Int: {

                            if (c === ".") {
                                type = LiteralType.Float;
                            }
                            else if (!isDigit(c)) {
                                done = true;
                                break;
                            }

                            break;
                        }
                        case LiteralType.Float: {

                            if (c === ".") {
                                return new ParseError("Unexpected second '.' in float literal", currentLine, currentColumn);
                            }
                            else if (!isDigit(c)) {
                                done = true;
                                break;
                            }

                            break;
                        }
                        case LiteralType.String: {
                            if (c === '"' && j > i) {
                                j++;
                                done = true;
                            }

                            break;
                        }
                        case LiteralType.None: {
                            if (c === '(' || c === ')' || c === '\n' || c === ' ' || c === '\t') {
                                done = true;
                            }

                            break;
                        }
                        default: return new ParseError("This isn't possible", currentLine, currentColumn);
                    }

                    if (done) {
                        break;
                    }
                }

                let value = input.slice(i, j);

                switch (type) {
                    case LiteralType.Int: {
                        top.add(new IntLiteral(Number.parseInt(value)));
                        break;
                    }
                    case LiteralType.Float: {
                        return new ParseError("Float parsing not implemented", currentLine, currentColumn);
                    }
                    case LiteralType.String: {
                        top.add(new StringLiteral(input.slice(i + 1, j - 1)));
                        break;
                    }
                    case LiteralType.None: {
                        top.add(new SSymbol(value));
                        break;
                    }
                    default: return new ParseError("This isn't possible", currentLine, currentColumn);
                }

                i += (j - i) - 1;

                break;
            }
        }
    }

    return topLevelExpressions;
}