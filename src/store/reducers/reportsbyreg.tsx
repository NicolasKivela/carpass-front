import {ReportsByReg} from '../types/report';
import {
  SET_REPORTS_BY_REG,
  SET_INITIAL_STATE_CAR_REPORTS,
  SET_INITIAL_STATE,
} from '../actions/actionTypes';

export interface ReportsByRegState {
  reports: ReportsByReg[];
}

export const initialState: ReportsByRegState = {
  reports: [],
};

const reportsByRegReducer = (
  state = initialState,
  action: any,
): ReportsByRegState => {
  switch (action.type) {
    case SET_REPORTS_BY_REG:
      return {
        ...state,
        reports: action.payload,
      };
    case SET_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
};

export default reportsByRegReducer;
