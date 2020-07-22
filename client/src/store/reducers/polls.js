import { SET_POLLS, SET_CURRENT_POLL, UPDATE_CURRENT_POLL} from '../actionTypes';

export const polls = (state = [], action) => {
  switch (action.type) {
    case SET_POLLS:
      return action.polls;
    default:
      return state;
  }
};

export const currentPoll = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_POLL:
      return action.poll;
    default:
      return state;
  }
};

export const updateCurrentPoll = (state ={}, action) => {
    switch (action.type){
        case UPDATE_CURRENT_POLL:
            return action.poll;
        default:
            return state;
    }
}