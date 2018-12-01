import React, { Component } from 'react';
import axios from 'axios';



class LectureDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ApiUrl: 'https://localhost:44348/api/schedule',
            lecture: {},
            students: []
        };
    }
    requestStudents() {
        axios
            .get(this.state.ApiUrl + "/students/" + this.props.lecture.lectureId)
            .then(result => {
                this.setState({ students: result.data });
            })
            .catch(error =>
                alert("paskaitoje studentu nera")
            );
    }
    renderStudents() {
        return (
            <ul>

            </ul>
        )
    }
    render() {
        let lecture = this.props.lecture;
        return (
            <div>
                <div>Paskaitos kodas: {lecture.code}</div>
                <div>Pavadinimas: {lecture.name}</div>
                <div>Destytojas: {lecture.teacher}</div>
                <div>{"Laikas: " + lecture.hour + "." + (lecture.minute === 0 ? "00" : lecture.minute)}</div>
                {this.state.students.length > 0
                    ? <ul>{this.state.students.map(s => { return <li key={s.studentId}>{s.studentName}</li> })}</ul>
                    : <button onClick={() => this.requestStudents()}>Rodyti studentus</button>}
            </div>);
    }
}

export default LectureDetails;