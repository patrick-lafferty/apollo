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
    "margins": `Margins are the empty space between some UI element
        and its parent container. You can give horizontal or vertical margins`
};

class Documentation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {help: ''};
    }

    static getDerivedStateFromProps(props, state) {

        if (state.candidate !== props.candidate) {
            return {
                help: HelpText[props.candidate] || ""
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