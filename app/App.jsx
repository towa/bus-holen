import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Busstop from './Busstop.jsx';
import Paper from 'material-ui/Paper';

class App extends React.Component {
    render() {
        return(
            <Paper>
                <BrowserRouter>
                    <Switch>  
                        <Route path="/:stop" component={Busstop}/>
                        <Route path="/" component={Busstop}/>
                    </Switch>  
                </BrowserRouter>
            </Paper>
        );
    }
}

export default App;
