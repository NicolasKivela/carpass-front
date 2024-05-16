import {ReportsByReg} from '../types/report';
import {SET_REPORTS_BY_REG} from '../actions/actionTypes';

const initialState = {reports: []};

const reportsByRegReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_REPORTS_BY_REG:
      return action.payload;
    default:
      return state;
  }
};

export default reportsByRegReducer;
