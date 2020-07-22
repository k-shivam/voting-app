import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getPolls, getUserPolls } from '../store/actions';
import axios from 'axios';

const PORT = process.env.PORT || 5000;

class Polls extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }

  handleDelete(id) {
    axios.delete(`https://shivam-voting-app.herokuapp.com/api/polls/${id}`);
    window.location.reload();
  }

  handleSelect(id) {
    const { history } = this.props;
    console.log(history);
    history.push(`/poll/${id}`);
  }

  render() {
    const { getPolls, getUserPolls, auth, isAuthenticated} = this.props;

    const polls = this.props.polls.map(poll => (
      <li>{poll.question}<button className="button" onClick={() => this.handleSelect(poll._id)}>View</button><button className="button" onClick={() => this.handleDelete(poll._id)} key={poll._id}>Delete</button>
      </li>
    ));

    if (!isAuthenticated)
        return (
          <Fragment>
            {auth.isAuthenticated && (
              <div className="buttons_center">
                <button className="button" onClick={getPolls}>
                  All polls
                </button>
                <button className="button" onClick={getUserPolls}>
                  My polls
                </button>
              </div>
            )}
            <div className="buttons_center">
            <p className="buttons">Login to Delete your polls</p>
            </div>
            <ul className="polls">{polls}</ul>
          </Fragment>
        );
  }
}

export default connect(
  store => ({
    auth: store.auth,
    polls: store.polls,
  }),
  { getPolls, getUserPolls },
)(Polls);