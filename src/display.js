import React from 'react';
import './css/display.css';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = null;
        this.display = 
            <section className="display">
                <canvas id="framebuffer" className="fullsize" ref={node => {
                    this.canvas = node
                }}/>
            </section>;
    }

    componentDidMount() {
        const context = this.canvas.getContext('2d');

        const width = this.canvas.parentElement.clientWidth;
        const height = this.canvas.parentElement.clientHeight;

        this.canvas.height = height;
        this.canvas.width = this.canvas.height * (width / height) ;

        context.fillStyle = 'rgb(0, 0, 200)';
        context.fillRect(0, 0, 100, 100);

        context.fillStyle = 'rgb(0, 200, 200)';
        context.fillRect(100, 100, 100, 100);
    }

    componentDidUpdate() {
        const {layout} = this.props;
        console.log(layout);
    }

    render() {
        return this.display;            
    }
}

export default Display;