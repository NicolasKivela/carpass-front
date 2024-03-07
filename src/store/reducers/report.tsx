import {Report} from '../types/report';
import {
  SET_REPORT_ROWS,
  SET_REPORT_ROW_ANSWER,
  SET_CAR_DATA,
  SET_INITIAL_STATE,
} from '../actions/actionTypes';

export const initialState: Report = {
  registration_number: '',
  brand_and_model: '',
  odometer_reading: null,
  production_number: '',
  report_type: '',
  report_rows: [
    {
      question_id: '',
      question: '',
      inspection_status: null,
      comment: '',
      attachments: [],
    },
  ],
};

// This reducer handles updating the user state in the app
const reportReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_REPORT_ROWS:
      return {
        ...state,
        report_rows: action.payload,
      };

    case SET_REPORT_ROW_ANSWER:
      return {
        ...state,
        report_rows: state.report_rows.map(row =>
          row.question_id === action.payload.id
            ? {...row, inspection_status: action.payload.answer}
            : row,
        ),
      };

    case SET_CAR_DATA:
      return {
        ...state,
        registration_number: action.payload.registration_number,
        brand_and_model: action.payload.brand_and_model,
        odometer_reading: action.payload.odometer_reading,
        production_number: action.payload.production_number,
        report_type: action.payload.report_type,
      };

    case SET_INITIAL_STATE:
      return initialState;

    default:
      return state;
  }
};

export default reportReducer;
