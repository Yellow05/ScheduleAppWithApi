import React, { Component } from 'react';
import axios from 'axios';

class CreateStudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentName: ""
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
        let requestBody = {
            studentName: this.state.studentName
        };
        let url = 'https://localhost:44348/api/schedule/new-student';
        axios.post(url, requestBody)
            .then(function (response) {
                console.log(response);
                alert("Studentas pridetas!");
            })
            .catch(function (error) {
                alert("Atsiprasome, ivyko serverio klaida");
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Naujo studento pridejimas</h2>
                Studento vardas ir pavarde:<br />
                <input type="text" name="studentName" value={this.state.studentName} onChange={this.handleInputChange} /><br />
                <input type="submit" value="Prideti" />
            </form>
        )
    }
}
export default CreateStudentForm;
