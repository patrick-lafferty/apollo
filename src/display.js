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
import './css/display.css';
import {read} from './apollo/parsing';
import {loadLayout} from './apollo/layout';
import {UIWindow} from './apollo/elements/window';
import {Renderer} from './apollo/renderer';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = null;
        this.context = null;
        this.display = 
            <section className="display">
                <canvas id="framebuffer" className="fullsize" ref={node => {
                    this.canvas = node
                }}/>
            </section>;
    }

    componentDidMount() {

        const width = this.canvas.parentElement.clientWidth;
        const height = this.canvas.parentElement.clientHeight;

        this.canvas.height = height;
        this.canvas.width = this.canvas.height * (width / height) ;

        this.renderer = new Renderer(this.canvas);
        this.window = new UIWindow(this.canvas);
        this.window.setRenderer(this.renderer);
    }

    componentDidUpdate() {
        const {layout} = this.props;

        let result = read(layout);

        if (this.renderer !== null)  {
            this.renderer.clear();
        }

        if (result !== null) {
            try {
                let root = result.items[0];
                let r = loadLayout(root, this.window);

                if (r != null) {
                    this.window.layoutChildren();
                    //window.layoutText()
                    this.window.render();
                }
            }
            catch (exception) {
                //TODO: put logging where display area is
                console.log(exception);
            }
        }
    }

    render() {
        return this.display;            
    }
}

export default Display;