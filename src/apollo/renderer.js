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

export class Renderer  {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    clear() {

        this.context.fillStyle = 'rgba(255,255,255,1)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRectangle(colour, bounds, clip) {
        let windowWidth = this.canvas.clientWidth;
        let windowHeight = this.canvas.clientHeight;

        if (bounds.x >= windowWidth || bounds.y >= windowHeight) {
            return;
        }

        let x = bounds.x;
        let y = bounds.y;
        let clippedWidth = bounds.width;
        let clippedHeight = bounds.height;

        if (bounds.x < clip.x) {
            x = clip.x;
            clippedWidth -= (clip.x - bounds.x);
        }

        if (bounds.y < clip.y) {
            y = clip.y;
            clippedHeight -= (clip.y - bounds.y);
        }

        if ((x + clippedWidth) >= (clip.x + clip.width)) {
            clippedWidth = clip.x + clip.width - x;
        }

        if ((y + clippedHeight) >= (clip.y + clip.height)) {
            clippedHeight = clip.y + clip.height - y;
        }

        if (clippedWidth < 0 || clippedHeight < 0) {
            return;
        }

        this.context.fillStyle = colour;
        this.context.fillRect(x, y, clippedWidth, clippedHeight);
    }

    drawText(layout, bounds, clip, backgroundColour) {
        this.context.fillStyle = 'rgb(0,0,0)';
        this.context.fillText(layout, bounds.x, bounds.y);
    }
}