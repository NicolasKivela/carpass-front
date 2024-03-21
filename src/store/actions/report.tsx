import {
  SET_CAR_DATA,
  SET_INITIAL_STATE,
  SET_REPORT_STRUCTURE,
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
  engine_type: string;
}) => {
  return {
    type: SET_CAR_DATA,
    payload: carData,
  };
};

export const setReportRowAnswer = (id: string, answer: string | null) => {
  return {
    type: SET_REPORT_ROW_ANSWER,
    payload: {id, answer},
  };
};

export const setReportRows = (rows: Report['report_rows']) => {
  return {
    type: SET_REPORT_ROWS,
    payload: rows,
  };
};

export const setReportStructure = (structure: Report['report_structure']) => {
  return {
    type: SET_REPORT_STRUCTURE,
    payload: structure,
  };
};

export const fetchReportQuestions = () => {
  return async (dispatch: any, getState: any) => {
    try {
      // const response = await ApiManager.post(PATHS.REPORT_STRUCTURE)
      const response = await fetch(
        'http://10.0.2.2:8080/api/v1/report/structure',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      ); // TODO: remove later and use this from apimanager
      if (response.ok) {
        const reportStructure = await response.json();
        dispatch(
          setReportStructure(reportStructure.data.sort((a, b) => a.id - b.id)),
        );
        const reportRows = reportStructure.data
          .map((item: any) => {
            return item.question_map.map((innerItem: any) => {
              return {
                question_id: innerItem.question.id,
                inspection_status: null,
                comment: '',
                attachment: [],
              };
            });
          })
          .flat();
        dispatch(setReportRows(reportRows));
      } else {
        throw Error;
      }
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
