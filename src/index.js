import React from 'react';
import ReactDOM from 'react-dom';
import DocumentationViewer from './documentation';
import Editor from './editor';
import Display from './display';
import './css/apollo.css';
import {ExampleLayout} from './example_layout';

class ApolloApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleLayoutChanged = this.handleLayoutChanged.bind(this);
        this.state = {layout: ''};

        setTimeout(() => this.handleLayoutChanged(ExampleLayout), 300);
    }

    handleLayoutChanged(layout) {
        this.setState({layout: layout});
    }

    render() {
        return (
            <main className="app">
                <DocumentationViewer />
                <Editor handleLayoutChanged={this.handleLayoutChanged} initialLayout={this.state.layout}/>
                <Display layout={this.state.layout} />
            </main>
        );
    }
}

ReactDOM.render(
    <ApolloApp/>,
    document.querySelector('#root'));