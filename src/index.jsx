import React from 'react';
import { Container, useReducers } from '../';
import { render } from 'react-dom';

function InputValue() {
    const { set } = useReducers();
    console.log('redering input');

    function keyUpHandle({ target: { value } }) {

        set('value', value);
    }

    return <input type="text" placeholder="Type value here" onKeyUp={keyUpHandle} />;
}

function ResultView() {

    console.log('redering result');
    const { value } = useReducers('value');

    return <h3>{value}</h3>;
}

function App() {

    return (
        <Container>
            <InputValue />
            <hr />
            <ResultView />
        </Container>
    );
}

render(<App />, document.getElementById('app'));