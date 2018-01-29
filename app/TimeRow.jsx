import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import pink from 'material-ui/colors/pink';


const styles = {
    defaultMins : {
        backgroundColor : "#00000000",
        color           : "#333333",
    },
    urgentMins : {
        backgroundColor : pink[500],
    },
};

class TimeRow extends React.Component {
    render() {
        var liveStyle = this.props.row.live_mins > 3
            ? styles.defaultMins : styles.urgentMins;
        return (
            <ListItem>
                <Avatar>{this.props.row.route}</Avatar>
                <ListItemText primary={this.props.row.destination} />
                <Avatar style={liveStyle}>{this.props.row.live_mins.toString()}</Avatar>
            </ListItem>
        );
    }
}

export default TimeRow;
