import React from 'react';

function addZeroes(number) {
    if (number < 10) {number = "0" + number};
    return number;
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time : ""
        };  
    }

    getTime(cb) {
        var d = new Date();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        hours = addZeroes(hours);
        minutes = addZeroes(minutes);
        cb({ time : hours + ":" + minutes });
    }

    componentDidMount() {
        const cb = (time) => this.setState(time);
        this.getTime(cb);
        this.interval = setInterval(() => this.getTime(cb), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        return (
                <div>
                    {this.state.time}
                </div>
        );
    }
}

export default Clock;
