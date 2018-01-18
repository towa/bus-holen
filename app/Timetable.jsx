import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import axios from 'axios';


class Timetable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timetable : []
        };  
    }

    getTimetable(stop) {
        axios.get('https://fsi.hochschule-trier.de/apis/bus/',
            {
                params : {
                    stop : stop,
                },
            })
            .then((response) => {
                var d = new Date();
                var t = d.getTime();
                if (response.status === 200) {
                    response.data.map((timerow) => {
                        timerow.live_mins = Math.round((timerow.live - (t / 1000)) / 60)
                        timerow.delay_mins = Math.round((timerow.live - timerow.arrival) / 60)
                    });
                    this.setState({timetable : response.data});
                }
            });
        
    }

    componentDidMount() {
        this.getTimetable(this.props.match.params.stop);
        this.interval = setInterval(() => this.getTimetable(this.props.match.params.stop), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        return (
                <Table>
                    <TableHead>
                        <TableCell>Linie</TableCell>
                        <TableCell>Richtung</TableCell>
                        <TableCell>Ankunft</TableCell>
                        <TableCell>Verspätung</TableCell>
                    </TableHead>
                    {this.state.timetable.map((row) => <TimeRow row={row}/>)}
                </Table>
        );
    }
}

class TimeRow extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.row.route}</TableCell>
                <TableCell>{this.props.row.destination}</TableCell>
                <TableCell numeric>{this.props.row.live_mins}</TableCell>
                <TableCell numeric>{this.props.row.delay_mins}</TableCell>
            </TableRow>
        );
    }
}

export default Timetable;
