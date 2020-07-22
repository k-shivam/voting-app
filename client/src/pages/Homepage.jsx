import React from 'react';

import ErrorMessage from '../components/ErrorMessage';
import Polls from '../components/Polls';
import CreatePoll from '../components/CreatePoll';

const HomePage = props => (
  <div>
    <ErrorMessage />
    <CreatePoll />
    <Polls {...props} />
  </div>
);

export default HomePage;