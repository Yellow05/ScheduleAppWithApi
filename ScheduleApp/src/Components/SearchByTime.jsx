import React, { Component } from 'react';
import axios from 'axios';


class SearchByTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ApiUrl: 'https://localhost:44348/api/schedule',
            weekDay: 0,
            hour: 9,
            minute: 30,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        axios
            .get(this.state.ApiUrl + "/" + this.state.weekDay + "/" + this.state.hour + "/" + this.state.minute)
            .then(result =>
                this.props.onLectureRequest(result.data, true)
            )
            .catch(error =>
                this.props.onLectureRequest(error, false)
            );
    }
    render() {
        return (
            <div>
                <form className="searchForm" onSubmit={this.handleSubmit}>
                    Diena:<br />
                    <select name="weekDay" value={this.state.weekDay} onChange={this.handleInputChange}>
                        <option value="0">Pirmadienis</option>
                        <option value="1">Antradienis</option>
                        <option value="2">Treciadienis</option>
                        <option value="3">Ketvirtadienis</option>
                        <option value="4">Penktadienis</option>
                        <option value="5">Sestadienis</option>
                        <option value="6">Sekmadienis</option>
                    </select><br />
                    Laikas:<br />
                    <input required type="number" name="hour" placeholder="h"
                        min="0" max="24"
                        value={this.state.hour} onChange={this.handleInputChange} />:
                    <input required type="number" name="minute" placeholder="m"
                        min="0" max="60" step="15"
                        value={this.state.minute} onChange={this.handleInputChange} /><br />
                    <input type="submit" value="Ieskoti" />
                </form>
            </div>
        )
    }
}
export default SearchByTime;

