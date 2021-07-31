import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';

function App() {
    return (
        <>
            <Switch>
                <Route path='/' component={Homepage} />
            </Switch>
        </>
    );
}

export default App;
