import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Timetable from './Timetable.jsx';


ReactDOM.render(
    <BrowserRouter>
        <Switch>  
            <Route path="/:stop" component={Timetable}/>
        </Switch>  
    </BrowserRouter>,
    document.getElementById('app')    
)
