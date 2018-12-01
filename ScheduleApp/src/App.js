import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ScheduleTable from './Components/ScheduleTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ApiUrl: 'https://localhost:44348/api/schedule',
      data: [],
      isLoading: false,
      error: null,
    };
  }

  loadLectures() {
    axios
      .get(this.state.ApiUrl)
      .then(result =>
        this.setState({
          data: result.data,
          isLoading: false,
        }),
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        }),
      );
  }

  componentWillMount() {
    this.loadLectures();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Table</h1>
        <ScheduleTable lectures={this.state.data} />
      </div>
    );
  }
}

export default App;
