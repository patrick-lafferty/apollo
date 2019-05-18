import React from 'react';
import ReactDOM from 'react-dom';
import DocumentationViewer from './documentation';
import Editor from './editor';
import Display from './display';
import './css/mercury.css';

function MercuryApp() {
    return (
        <main className="app">
            <DocumentationViewer />
            <Editor />
            <Display />
        </main>
    );
}

ReactDOM.render(
    <MercuryApp/>,
    document.querySelector('#root'));