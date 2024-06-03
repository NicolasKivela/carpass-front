import {ReportSections} from '../types/report.tsx';
import {SET_REPORT_SECTIONS} from '../actions/actionTypes.tsx';

export const initialState: ReportSections = {
  sections: [],
};

const reportSectionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_REPORT_SECTIONS:
      return {
        ...state,
        reportSections: action.payload.sections,
      };
    default:
      return state;
  }
};

export default reportSectionsReducer;
