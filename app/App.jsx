import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Timetable from './Timetable.jsx';
import Clock from './Clock.jsx';
import StopButton from './StopButton.jsx';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import busstops from './busstops.json';

const routes = [
    {   path : '/',
        exact : true,
        main : () => <Timetable stop="KTH"/>,
        title : () => <StopButton label="Kaiserthermen"/>,
    },
      
];

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#439889',
      main: '#00695c',
      dark: '#003d33',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff5c8d',
      main: '#d81b60',
      dark: '#a00037',
      contrastText: '#fff',
    },
  },
});



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
        <MuiThemeProvider theme={theme}>
            <Paper style={{maxWidth : 700, margin : 'auto'}}>
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
            </Paper>
        </MuiThemeProvider>
    </BrowserRouter>
    );
}

export default App;
