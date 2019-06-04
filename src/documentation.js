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

import React from 'react';
import TabControl from './tab_control';
import './css/documentation.css';

const Info = () => (<p className="docViewer">This is a live demo of Apollo UI layouts 
        for the <a href="https://saturn-os.org" target="blank">Saturn OS</a>
        <br/>
        <br/>

        You can edit the layout in the editor below, which will be parsed
        and rendered in the canvas to the right.
    </p>);

const HelpText = {
    "grid": `A Grid is a container that lays out its children in rows and columns.

Row/columns can be proportionally sized or given a fixed size.
        `,
    "margins": 'Margins are the empty space between some UI element'
        + ' and its parent container. You can give horizontal or vertical margins',
    "rows" : `A list of row definitions for a grid. Valid values:

        (proportional-height <integer>) or 
        (fixed-height <integer>)`,
    "proportional-height": 'Proportional heights allow you to specify how rows' 
        + ' heights relate to eachother. It takes the grid\'s height minus any'
        + ' fixed-height rows, and then divides by the total proportional values'
        + ' to get a unit height. Then each proportional row gets an integer'
        + ' multiple of that height.',
    "fixed-height": 'Specifies that a row should be exactly X pixels high',
    "proportional-width": 'Proportional widths allow you to specify how columns' 
        + ' widths relate to eachother. It takes the grid\'s width minus any'
        + ' fixed-width columns, and then divides by the total proportional values'
        + ' to get a unit width. Then each proportional column gets an integer'
        + ' multiple of that width.',
    "fixed-width": 'Specifies that a column should be exactly X pixels wide',
    "columns": `A list of column definitions for a grid. Valid values:

        (proportional-width <integer>) or
        (fixed-width <integer>)`,
    "row-gap": 'Empty space to keep between grid rows',
    "column-gap": 'Empty space to keep between grid columns',
    "items": 'A list of child elements. Can be any type including containers',
    "label": `A non-interactive text display. You can configure a label's:

        (caption "some string constant")
        (padding (vertical <integer>) (horizontal <integer>))
        (font-colour (rgb <integer> <integer> <integer>))
        (background (rgb <integer> <integer> <integer>))`,
    "caption": `A string literal that gets rendered in a label. Eg:
    
        (caption "This is a caption")`,
    "padding": 'Padding is the empty space between an element\'s main content and'
        + ' its border. This space will show the background colour of the element.',
    "font-colour": "TODO: Font colours aren't supported yet",
    "background": 'The main colour of an element',
    "rgb": `A triplet of integers (0-255) representing red green and blue channels. Example:

        (rgb 38 66 251)`,
    "meta": 'Config data that the element\'s parent container can use to'
        + ' lay that element out differently. Meta can have one value:'
        + ` a list that starts with a container name and then properties. Eg: 

        (meta (grid (column 1) (row 2))`,
    "column": 'A meta property that says this element should be in this column',
    "row": 'A meta property that says this element should be in this row',
    "row-span": 'A meta property that says how many rows this element should'
        + ' be layed out in',
    "column-span": 'A meta property that says how many columns this element should'
        + ' be layed out in'
};

class Documentation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {help: ''};
    }

    static getDerivedStateFromProps(props, state) {

        const defaultHelpText = 'Press F1 when the text cursor is over some word'
            + ' in the Layout tab below to view its documentation';

        if (state.candidate !== props.candidate) {
            return {
                help: HelpText[props.candidate] || defaultHelpText
            };
        }

        return null;
    }

    render() {
        return <p className="docViewer">{this.state.help}</p>;
    }
}

class DocumentationViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {candidate: props.candidate};
    }

    static getDerivedStateFromProps(props, state) {

        if (state.candidate !== props.candidate) {
            return {
                candidate: props.candidate
            };
        }

        return null;
    }

    render() {
        return (<section className="documentation">
            <TabControl>
                <Info label="Info" />
                <Documentation label="Documentation" candidate={this.state.candidate} />
            </TabControl>
        </section>);
    }
}

export default DocumentationViewer;