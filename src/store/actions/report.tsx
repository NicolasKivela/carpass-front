import {
  SET_CAR_DATA,
  SET_INITIAL_STATE,
  SET_REPORT_ROWS,
  SET_REPORT_ROW_ANSWER,
} from './actionTypes';
import {Report} from '../types/report';
import {setError} from './error';

export const setReportInitialState = () => {
  return {
    type: SET_INITIAL_STATE,
  };
};

export const setCarData = (carData: {
  brand_and_model: string;
  odometer_reading: Number | null;
  production_number: string;
  registration_number: string;
  report_type: string;
}) => {
  return {
    type: SET_CAR_DATA,
    payload: carData,
  };
};

export const setReportRowAnswer = (id: string, answer: string) => {
  return {
    type: SET_REPORT_ROW_ANSWER,
    payload: {id, answer},
  };
};

export const setReportRows = (reportRows: Report['report_rows']) => {
  return {
    type: SET_REPORT_ROWS,
    payload: reportRows,
  };
};

export const fetchReportQuestions = () => {
  return async (dispatch: any) => {
    try {
      // TODO: fix when API endpoint is done
      //   const response = await ApiManager.get(PATHS.REPORT_QUESTIONS) -> add all paths to constants.tsx file
      //   if (response.ok) {
      //     const reportQuestionRows = response.json()
      //     const reportRows = reportQuestionRows.map(row => ({...row, inspection_status: null}))
      //     dispatch(setReportRows(reportRows));
      //   }
      //   else {
      //     //TODO: add error handler, depends on error code?
      //   }
    } catch (err) {
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.fetchReportQuestinsTitle',
          message: 'errors.fetchReportQuestinsMessage',
        }),
      );
    }
  };
};
