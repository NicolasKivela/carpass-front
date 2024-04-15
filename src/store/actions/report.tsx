import {Navigation} from 'react-native-navigation';
import i18next from 'i18next';

import {REPORT_TYPE, SCREENS} from '../../common/constants';
import {Attachment, Report} from '../types/report';
import {
  SET_CAR_DATA,
  SET_INITIAL_STATE,
  SET_REPORT_STRUCTURE,
  SET_REPORT_ROWS,
  SET_REPORT_ROW_ANSWER,
  SET_REPORT_ROW_COMMENT,
  SET_REPORT_ROW_IMAGE,
  CHANGE_REPORT_ROW_IMAGE,
  REMOVE_REPORT_ROW_IMAGE,
} from './actionTypes';
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

export const setReportRowComment = (id: string, comment: string | null) => {
  return {
    type: SET_REPORT_ROW_COMMENT,
    payload: {id, comment},
  };
};

export const setReportRowImage = (id: string, attachment: Attachment) => {
  return {
    type: SET_REPORT_ROW_IMAGE,
    payload: {id, attachment},
  };
};

export const changeReportRowImage = (id: string, attachment: Attachment) => {
  return {
    type: CHANGE_REPORT_ROW_IMAGE,
    payload: {id, attachment},
  };
};

export const removeReportRowImage = (id: string, idImage: string) => {
  return {
    type: REMOVE_REPORT_ROW_IMAGE,
    payload: {id, idImage},
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
        `http://carpass.fi/api/v1/report/structure?language=${
          i18next.language
        }&engine_type=${
          getState().report.engine_type
        }&report_type=${REPORT_TYPE.FULL.toLowerCase()}`,
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
          setReportStructure(reportStructure.sort((a, b) => a.id - b.id)),
        );
        const reportRows = reportStructure
          .map((item: any) => {
            return item.questions.map((innerItem: any) => {
              return {
                question_id: innerItem.id,
                inspection_status: null,
                comment: '',
                attachments: [],
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

export const saveReport = () => {
  return async (dispatch: any, getState: any) => {
    try {
      // const response = await ApiManager.post(PATHS.SAVE_REPORT)
      const response = await fetch('http://carpass.fi/api/v1/report', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand_and_model: getState().report.brand_and_model,
          odometer_reading: getState().report.odometer_reading,
          production_number: getState().report.production_number,
          registration_number: getState().report.registration_number,
          engine_type: getState().report.engine_type,
          report_rows: getState()
            .report.report_rows.map((item: any) => {
              return {
                ...item,
                attachments: item.attachments.map((attachment: any) => ({
                  attachment_type: attachment.attachment_type,
                  data: attachment.data,
                })),
              };
            }) //REMOVE REDUCE FUNCTION WHEN BACKEND FIXED
            .reduce((accumulator: any, current: any) => {
              let exists = accumulator.find((item: any) => {
                return item.id === current.id;
              });
              if (!exists) {
                accumulator = accumulator.concat(current);
              }
              return accumulator;
            }, []),
        }),
      }); // TODO: remove later and use this from apimanager
      if (response.ok) {
        Navigation.setRoot({
          root: {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.INSPECTOR,
                  },
                },
              ],
            },
          },
        });
        // TODO: some kind of toast that report is saved?
      } else {
        throw Error;
      }
    } catch (err) {
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.saveReportTitle',
          message: 'errors.saveReportMessage',
        }),
      );
    }
  };
};
