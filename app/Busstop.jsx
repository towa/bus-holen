import React from 'react';
import Timetable from './Timetable.jsx';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import busstops from './busstops.js';

class Busstop extends React.Component {
    render() {
        var stop = this.props.match.params.stop ? this.props.match.params.stop : "KTH";
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            {busstops.stops[stop]}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Timetable stop={stop}/>
            </div>
        );
    }
}

export default Busstop;
