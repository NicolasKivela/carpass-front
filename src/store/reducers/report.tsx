import {Report} from '../types/report';
import {
  SET_REPORT_ROWS,
  SET_REPORT_ROW_ANSWER,
  SET_CAR_DATA,
  SET_INITIAL_STATE,
  SET_REPORT_STRUCTURE,
  SET_REPORT_ROW_IMAGE,
  SET_REPORT_ROW_COMMENT,
  CHANGE_REPORT_ROW_IMAGE,
  REMOVE_REPORT_ROW_IMAGE, SET_ORGANIZATIONS,
} from '../actions/actionTypes';

export const initialState: Report = {
  registration_number: '',
  brand_and_model: '',
  odometer_reading: null,
  production_number: '',
  engine_type: 'petrol',
  report_structure: [],
  report_rows: [],
};

// This reducer handles updating the report state in the app
const reportReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_REPORT_STRUCTURE:
      return {
        ...state,
        report_structure: action.payload,
      };

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

    case SET_REPORT_ROW_IMAGE:
      return {
        ...state,
        report_rows: state.report_rows.map(row =>
          row.question_id === action.payload.id
            ? {
                ...row,
                attachments: row.attachments.concat([
                  action.payload.attachment,
                ]),
              }
            : row,
        ),
      };

    case CHANGE_REPORT_ROW_IMAGE:
      return {
        ...state,
        report_rows: state.report_rows.map(row =>
          row.question_id === action.payload.id
            ? {
                ...row,
                attachments: row.attachments.map(attachment =>
                  attachment.id === action.payload.attachment.id
                    ? action.payload.attachment
                    : attachment,
                ),
              }
            : row,
        ),
      };

    case REMOVE_REPORT_ROW_IMAGE:
      return {
        ...state,
        report_rows: state.report_rows.map(row =>
          row.question_id === action.payload.id
            ? {
                ...row,
                attachments: row.attachments.filter(
                  attachment => attachment.id !== action.payload.idImage,
                ),
              }
            : row,
        ),
      };

    case SET_REPORT_ROW_COMMENT:
      return {
        ...state,
        report_rows: state.report_rows.map(row =>
          row.question_id === action.payload.id
            ? {
                ...row,
                comment: action.payload.comment,
              }
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
        engine_type: action.payload.engine_type,
      };

    case SET_INITIAL_STATE:
      return initialState;

    default:
      return state;
  }
};

export default reportReducer;
