import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Form from './pages/form/Form';

function App() {
    return (
        <>
            <Switch>
                <Route path='/form'>
                    <Form />
                </Route>
                <Route path='/'>
                    <Homepage />
                </Route>
            </Switch>
        </>
    );
}

export default App;
