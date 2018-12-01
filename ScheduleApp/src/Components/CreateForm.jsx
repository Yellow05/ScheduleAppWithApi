import React, { Component } from 'react';
import axios from 'axios';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            code: "",
            name: "",
            teacher: "",
            weekDay: 0,
            hour: 9,
            minute: 0,
            lengthHour: 1,
            lengthMinute: 30
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        let lecture = this.props.lecture;
        if (lecture && this.state.id !== lecture.id) {
            this.setState({
                id: lecture.lectureId,
                code: lecture.code,
                name: lecture.name,
                teacher: lecture.teacher,
                weekDay: lecture.weekDay,
                hour: lecture.hour,
                minute: lecture.minute,
                lengthHour: lecture.lengthHour,
                lengthMinute: lecture.lengthMinute
            })
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleDelete() {
        let url = 'https://localhost:44348/api/schedule';
        if (window.confirm("Ar tikrai norite istrinti paskaita?")) {
            axios.delete(url + "/" + this.state.id)
                .then(function (response) {
                    alert("Paskaita istrinta!");
                })
                .catch(function (error) {
                    alert("Atsiprasome, ivyko serverio klaida");
                });
        }
    }
    handleSubmit(event) {
        let requestBody = {
            code: this.state.code,
            name: this.state.name,
            teacher: this.state.teacher,
            weekDay: this.state.weekDay,
            hour: this.state.hour,
            minute: this.state.minute,
            lengthHour: this.state.lengthHour,
            lengthMinute: this.state.lengthMinute
        };
        let url = 'https://localhost:44348/api/schedule';
        if (this.state.id === "") {
            axios.post(url, requestBody)
                .then(function (response) {
                    alert("Paskaita prideta!");
                })
                .catch(function (error) {
                    alert("Atsiprasome, ivyko serverio klaida");
                });
        } else {
            axios.put(url + "/" + this.state.id, requestBody)
                .then(function (response) {
                    alert("Paskaita pakeista!");
                })
                .catch(function (error) {
                    alert("Atsiprasome, ivyko serverio klaida");
                });
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>{this.props.lecture ? "Paskaitos redagaviams" : "Naujos paskaitos kurimas"}</h2>
                Paskaitos kodas:<br />
                <input type="text" name="code" value={this.state.code} onChange={this.handleInputChange} /><br />
                Pavadinimas:<br />
                <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} required /><br />
                Destytojas:<br />
                <input type="text" name="teacher" value={this.state.teacher} onChange={this.handleInputChange} /><br />
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
                    min="0" max="60"
                    value={this.state.minute} onChange={this.handleInputChange} /><br />
                Trukme:<br />
                <input type="number" name="lengthHour" placeholder="h"
                    min="0" max="24"
                    value={this.state.lengthHour} onChange={this.handleInputChange} />:
                <input type="number" name="lengthMinute" placeholder="m"
                    min="0" max="60"
                    value={this.state.lengthMinute} onChange={this.handleInputChange} /><br />
                <input type="submit" value="Issaugoti" />
                {this.state.id !== "" ? <input className="deleteButton" type="button" value="Istrinti" onClick={this.handleDelete} /> : ""}
            </form>
        )
    }
}
export default CreateForm;
