import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { createPoll } from '../store/actions';

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      options: [''],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPolls = this.fetchPolls.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addAnswer() {
    this.setState({ options: [...this.state.options, ''] });
    console.log(this.state.options)
  }

  removeAnswer(e) {
    var array = [...this.state.options];
    var index = array.indexOf(e.target.value);
    if (index !== -1) {
        array.splice(index, 1);
        this.setState({options: array});
    }
  }

  handleAnswer(e, index) {
    const options = [...this.state.options];
    options[index] = e.target.value;
    this.setState({ options });
  }

  handleSubmit(e) {
    this.props.createPoll(this.state);
  }

   handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if(!fields["question"]){
           formIsValid = false;
           errors["question"] = "Cannot be empty";
        }
        this.setState({errors: errors});
        return formIsValid;
   }

  fetchPolls = (id) => {
        axios.put(`http://localhost:4000/api/polls/${id}`)
        .then((response) => response.json())
        .then(pollsList => {
            this.setState({ options: pollsList });
        });
    }

  render() {
    const options = this.state.options.map((option, i) => (
      <Fragment key={i}>
        <label className="form-label">option</label>
        <input
          className="form-input"
          type="text"
          required="true"
          value={options}
          key={i}
          onChange={e => this.handleAnswer(e, i)}
        />
      </Fragment>
    ));

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="form-label" htmlFor="question">
          question
        </label>
        <input
          className="form-input"
          type="text"
          name="question"
          required="true"
          value={this.state.question}
          onChange={this.handleChange}
        />
        <div className="container">{options}</div>
        <div className="buttons_center">
          <button className="button" type="button" onClick={this.addAnswer}>
            Add options
          </button>
          <button className="button" type="button" onClick={this.removeAnswer}>
            Remove options
          </button>
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), { createPoll })(CreatePoll);