import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Timetable from './Timetable.jsx';
import Clock from './Clock.jsx';
import StopButton from './StopButton.jsx';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import busstops from './busstops.js';

const routes = [
    {   path : '/',
        exact : true,
        main : () => <Timetable stop="KTH"/>,
        title : () => <StopButton label="Kaiserthermen"/>,
    },
      
];



busstops.stops.map((busstop) => {
    routes.push({
        path    : '/'.concat(busstop.stop),
        main    : () => <Timetable stop={busstop.stop}/>,
        title   : () => <StopButton label={busstop.label}/>,
    });
});



function App() {
    return (
    <BrowserRouter>
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Switch>
                        {routes.map((route, index) =>
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.title}
                            />
                        )}
                    </Switch>
                    <div style={{flex : 1}}/>
                    <Typography type="title" color="inherit">
                        <Clock />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Switch>
                {routes.map((route, index) =>
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                )}
            </Switch>
        </div>
    </BrowserRouter>
    );
}

export default App;
