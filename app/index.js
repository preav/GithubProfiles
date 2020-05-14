import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Popular from './components/Popular';
import './index.css';

class App extends Component {
    render() {
        return (
            <Popular />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));