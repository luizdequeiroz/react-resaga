import React from 'react';
import { Container, useReducers, useSagas, useApply, apply } from '../';
import { render } from 'react-dom';

function Loading() {
    const { loading } = useReducers('loading');

    return <h5>{loading}</h5>;
}

function InputValue() {
    const apply = useApply();

    return <input type="text" placeholder="Type value here" onKeyUp={e => apply('value', e.target.value)} />;
}

function RequestButton() {
    const { request } = useSagas();

    return <button onClick={() => request('Value of request')}>Request</button>
}

function ResultView() {
    const { value } = useReducers('value');

    return <h3>{value}</h3>;
}

function* request(action) {
    yield apply('loading', `Requesting with value: ${action.payload}`);
}

function App() {

    return (
        <Container devtools sagas={{ request }}>
            <Loading /><br />
            <InputValue />
            <RequestButton />
            <hr />
            <ResultView />
        </Container>
    );
}

render(<App />, document.getElementById('app'));