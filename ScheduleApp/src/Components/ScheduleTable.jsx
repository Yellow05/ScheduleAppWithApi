import React, { Component } from 'react';
import FormModal from './FormModal';
import CreateForm from './CreateForm';
import SearchByTime from './SearchByTime';
import LectureDetais from './LectureDetails';
import CreateStudentForm from './CreateStudentForm';

class ScheduleTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentLecture: null,
            showLectureModal: false,
            detailsLecture: null,
            showStudentModal: false
        };
        this.handleLectureRequest = this.handleLectureRequest.bind(this);
    }

    handleToggleModal(lecture) {
        this.setState({
            showModal: !this.state.showModal,
            currentLecture: lecture
        });
    }
    handleToggleLectureModal(lecture) {
        this.setState({
            showLectureModal: !this.state.showLectureModal,
            detailsLecture: lecture
        });
    }
    handleToggleStudentModal() {
        this.setState({
            showStudentModal: !this.state.showStudentModal,
        });
    }

    generateLectureField(lecture, index) {
        return (<td key={index}>
            <div className="lectureCard">
                <div className="lectureCard_header">
                    <div className="lectureCard_header_time">
                        {"Laikas: " + lecture.hour + "." + (lecture.minute === 0 ? "00" : lecture.minute)}
                    </div>

                </div>
                <div className="lectureCard_name">
                    {lecture.name}
                </div>
            </div>
            <button
                type="button"
                onClick={() => this.handleToggleModal(lecture)}
                className="lectureCard_header_edit"
            >
                Redaguoti
                        </button>
            <button
                type="button"
                onClick={() => this.handleToggleLectureModal(lecture)}
                className="lectureCard_header_edit"
            >
                Daugiau
                        </button>
        </td>)
    }

    handleLectureRequest(data, success) {
        if (success) {
            this.handleToggleLectureModal(data);
        } else {
            alert("Paskaitos pasirinktu laiku nera!");
        }
    }

    generateRow(lectures, day) {
        let dayName;
        switch (day) {
            case 0:
                dayName = "Pirmadienis";
                break;
            case 1:
                dayName = "Antradienis";
                break;
            case 2:
                dayName = "Treciadienis";
                break;
            case 3:
                dayName = "Ketvirtadienis";
                break;
            case 4:
                dayName = "Penktadienis";
                break;
            case 5:
                dayName = "Sestadienis";
                break;
            default:
                dayName = "Sekmadienis";
                break;
        }
        return (<tr key={day}>
            <th>{dayName}</th>
            {lectures.map((l, index) => this.generateLectureField(l, index))}</tr>)
    }
    render() {
        let days = [0, 1, 2, 3, 4, 5, 6];
        return (
            <div>
                <table id="table" border="1">
                    <tbody>
                        {days.map(d => { return this.generateRow(this.props.lectures.filter(l => l.weekDay === d), d) })}
                    </tbody>
                </table>
                <div className="bottomContent">
                    <div>
                        <button type="button" onClick={() => this.handleToggleModal(null)}> Prideti paskaita </button>
                        <button type="button" onClick={() => this.handleToggleStudentModal()}> Prideti studenta </button>
                    </div>
                    <SearchByTime onLectureRequest={this.handleLectureRequest} />
                </div>
                {this.state.showModal &&
                    <FormModal onCloseRequest={() => this.handleToggleModal()}>
                        <CreateForm lecture={this.state.currentLecture} />
                    </FormModal>}
                {this.state.showLectureModal &&
                    <FormModal onCloseRequest={() => this.handleToggleLectureModal()}>
                        <LectureDetais lecture={this.state.detailsLecture} />
                    </FormModal>}
                {this.state.showStudentModal &&
                    <FormModal onCloseRequest={() => this.handleToggleStudentModal()}>
                        <CreateStudentForm />
                    </FormModal>}

            </div>
        );
    }
}
export default ScheduleTable;
