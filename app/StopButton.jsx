import React from 'react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import AutoComplete from './AutoComplete.jsx';

class StopButton extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return(
            <div>
                <Button onClick={this.handleClickOpen} color="inherit">
                    <IconButton color="inherit">
                        <Icon>directions_bus</Icon>
                    </IconButton>
                    <Typography type="title" color="inherit">
                        {this.props.label}
                    </Typography>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Bushaltestelle auswählen
                    </DialogTitle>
                    <DialogContent>
                        <AutoComplete/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    };
}

export default StopButton;
