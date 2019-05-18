import React from 'react';
import TabControl from './tab_control';
import './css/editor.css';

const Layout = () => <p>Layout</p>;
const Code = () => <p>Code</p>;

function Editor() {
    return (
        <section className="editor">
            <TabControl>
                <Layout label="layout"/>
                <Code label="code"/>
            </TabControl>
        </section>
    );
}

export default Editor;