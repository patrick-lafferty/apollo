import React from 'react';
import TabControl from './tab_control';
import './css/editor.css';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onLayoutChanged(e.target.value);
    }

    render() {
        return (<input onChange={this.handleChange}/>);
    }
}

const Code = () => <p>Code</p>;

class Editor extends React.Component {

    render() {
        return (
            <section className="editor">
                <TabControl>
                    <Layout label="layout" onLayoutChanged={this.props.handleLayoutChanged}/>
                    <Code label="code"/>
                </TabControl>
            </section>
        );
    }
}

export default Editor;