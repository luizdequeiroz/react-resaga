import React from 'react';
import { Container, useReducers, useDispatchers, useSagas } from '../';
import { render } from 'react-dom';

function InputValue() {
    const { apply } = useDispatchers();
    const { request } = useSagas();

    console.log('redering input');

    function keyUpHandle({ target: { value } }) {

        apply('value', value);
    }

    return <input type="text" placeholder="Type value here" onKeyUp={keyUpHandle} />;
}

function ResultView() {
    const { value } = useReducers('value');
    console.log('redering result');

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