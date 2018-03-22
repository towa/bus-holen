import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import withStyles from 'material-ui/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
    primary: {
        backgroundColor : theme.palette.primary.main,
        color           : theme.palette.primary.contrastText,
    },
    secondary: {
        backgroundColor : theme.palette.secondary.main,
        color           : theme.palette.secondary.contrastText,
    },
    disabled: {
        background : 'transparent',
        color: 'black',
    },
});

class MyAvatar extends React.Component {
    className = classNames(
        {
          [this.props.classes.primary]: this.props.color === 'primary',
          [this.props.classes.secondary]: this.props.color === 'secondary',
          [this.props.classes.disabled]: this.props.color === 'disabled',
        },
    this.props.className,);

    render() {
        return (
            <Avatar className={this.className}>
                {this.props.children}
            </Avatar>
        );
    }
    
}

const StyledAvatar = withStyles(styles, { name: 'MyAvatar' })(MyAvatar);

class TimeRow extends React.Component {
    render() {
        return (
            <ListItem>
                <Avatar>{this.props.row.route}</Avatar>
                <ListItemText primary={this.props.row.destination} />
                <StyledAvatar
                    color={this.props.row.live_mins > 3 ? 'disabled' : 'secondary'}
                >
                    {this.props.row.live_mins.toString()}
                </StyledAvatar>
            </ListItem>
        );
    }
}


export default TimeRow;
