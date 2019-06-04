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
import './css/editor.css';
//import {debounce} from 'lodash';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        this.props.onLayoutChanged(e.target.value);
//        let value = e.target.value;
  //      debounce(function () {
    //        this.props.onLayoutChanged(value);
      //  }, 1000);
    }

    handleKeyPress(e) {
		if (e.key === "F1") {
			let cursorPosition = e.target.selectionStart;

			if (e.target.value[cursorPosition] !== ' ') {
				let start = cursorPosition;
				let end = cursorPosition;
				let buffer = e.target.value;

				for (; start > 0; start--) {
					if (!/[^\s(]/.test(buffer[start])) {
						break;
					}
				}

				for (; end < buffer.length; end++) {
					if (!/[^\s(]/.test(buffer[end])) {
						break;
					}
				}

				let candidate = buffer.slice(start + 1, end);

				if (candidate.length > 0) {
					console.log(candidate);
					this.props.showDocumentation(candidate);
				}
			}
		}
    }

    render() {
        return (<textarea className='expand'  
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyPress}
          value={this.props.initialLayout}></textarea>);
    }
}

const Code = () => <p>Code<br/>TODO</p>;

class Editor extends React.Component {

    render() {
        return (
            <section className="editor">
                <TabControl>
					<Layout label="Layout" 
						onLayoutChanged={this.props.handleLayoutChanged} 
						showDocumentation={this.props.showDocumentation}
						initialLayout={this.props.initialLayout}/>
                    <Code label="Code"/>
                </TabControl>
            </section>
        );
    }
}

export default Editor;