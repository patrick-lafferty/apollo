import React from 'react';
import ReactDOM from 'react-dom';
import DocumentationViewer from './documentation';
import Editor from './editor';
import Display from './display';
import './css/apollo.css';

function ApolloApp() {
    return (
        <main className="app">
            <DocumentationViewer />
            <Editor />
            <Display />
        </main>
    );
}

ReactDOM.render(
    <ApolloApp/>,
    document.querySelector('#root'));