# react-resaga
Generalizing configuration to use of Redux and Saga

## Use Hooks

*Installing react-resaga package:*
```npm
    npm i --save react-resaga
```

*Container configuration exemple:*
```js
    import React from 'react';
    import { Container } from 'react-resaga';

    function App() {

        return (
            <Container>
                ...components
            </Container>
        );
    }
```

*Using abstract redux selector hook 'useReducers':*
```js
    import React from 'react';
    import { useReducers } from 'react-resaga';

    function EmployeesList() {
        const { employees = [] } = useReducers('employees');

        return (
            <ul>
                {employees.map((e, index) => <li key={index}>{e.name}</li>)}
            </ul>
        );
    }
```

*Container configuration exemple with sagas injection:*
```js
    import React from 'react';
    import { Container, apply } from 'react-resaga';

    function App() {

        const sagas = {
            setEmployees: function* (param) {
                yield apply('employees', param);
                yield apply('employeesLength', param.length);
            }
        };

        return (
            <Container sagas={sagas}>
                ...components
                <EmployeesList />
            </Container>
        );
    }
```

*And with useSagas and useApply:*
```js
    import React, { useEffect } from 'react';
    import { useSagas, useReducers, useApply } from 'react-resaga';
    
    function EmployeesList() {
        const { setEmployees } = useSagas();
        const { employees = [] } = useReducers('employees');
        const apply = useApply();

        useEffect(() => {
            setEmployees([
                {
                    name: 'Walter White'
                },
                {
                    name: 'Jesse Pinkman'
                },
                {
                    name: 'Gus Fring'
                }
            ]);
        }, []);

        return (
            <ul>
                {employees.map((e, index) => <li key={index}>{e.name}</li>)}
                <li onClick={() => apply('key', 'value')}></li>
            </ul>
        );
    }
```