import {Navigation} from 'react-native-navigation';

import i18next from 'i18next';

import {BASE_PATH, PATHS, REPORT_TYPE, SCREENS} from '../../common/constants';
import {Attachment, Report, ReportsByReg} from '../types/report';
import {
  SET_REPORTS_BY_REG,
  SET_CAR_DATA,
  SET_INITIAL_STATE,
  SET_REPORT_STRUCTURE,
  SET_REPORT_ROWS,
  SET_REPORT_ROW_ANSWER,
  SET_REPORT_ROW_ADDITIONAL_INPUT,
  SET_REPORT_ROW_COMMENT,
  SET_REPORT_ROW_LEFT_INPUT,
  SET_REPORT_ROW_RIGHT_INPUT,
  SET_REPORT_ROW_IMAGE,
  CHANGE_REPORT_ROW_IMAGE,
  REMOVE_REPORT_ROW_IMAGE,
  SET_INITIAL_STATE_CAR_REPORTS,
  SET_REPORT_HTML,
} from './actionTypes';
import {deleteError, setError} from './error';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

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

export const setReportRowAnswer = (id: number, answer: string | null) => {
  return {
    type: SET_REPORT_ROW_ANSWER,
    payload: {id, answer},
  };
};

export const setReportRowAdditionalInput = (
  id: number,
  additional_input: number | null,
) => {
  return {
    type: SET_REPORT_ROW_ADDITIONAL_INPUT,
    payload: {id, additional_input},
  };
};

export const setReportRowComment = (id: number, comment: string | null) => {
  return {
    type: SET_REPORT_ROW_COMMENT,
    payload: {id, comment},
  };
};

export const setReportRowLeftInput = (
  id: number,
  input_left: number | null,
) => {
  return {
    type: SET_REPORT_ROW_LEFT_INPUT,
    payload: {id, input_left},
  };
};

export const setReportRowRightInput = (
  id: number,
  input_right: number | null,
) => {
  return {
    type: SET_REPORT_ROW_RIGHT_INPUT,
    payload: {id, input_right},
  };
};

export const setReportRowImage = (id: number, attachment: Attachment) => {
  return {
    type: SET_REPORT_ROW_IMAGE,
    payload: {id, attachment},
  };
};

export const changeReportRowImage = (id: number, attachment: Attachment) => {
  return {
    type: CHANGE_REPORT_ROW_IMAGE,
    payload: {id, attachment},
  };
};

export const removeReportRowImage = (id: number, idImage: string) => {
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

export const setReportHTML = (html: string) => {
  return {
    type: SET_REPORT_HTML,
    payload: html,
  };
};

export const fetchReportQuestions = () => {
  return async (dispatch: any, getState: any) => {
    try {
      // const response = await ApiManager.post(PATHS.REPORT_STRUCTURE)
      const response = await fetch(
        `${BASE_PATH}${PATHS.REPORT_STRUCTURE}?language=${
          i18next.language
        }&engine_type=${
          getState().order.currentOrder.engine_type
        }&report_type=${getState().order.currentOrder.report_type}`,
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
              let row;
              // Depending on the question type, set additional properties
              switch (innerItem.type) {
                case 'description':
                  row = {
                    question_id: innerItem.id,
                    inspection_status: null,
                    attachments: [],
                    type: innerItem.type,
                    comment: '',
                  };
                  break;
                case 'leftrightnumeric':
                  row = {
                    question_id: innerItem.id,
                    inspection_status: null,
                    attachments: [],
                    type: innerItem.type,
                    input_left: null,
                    input_left_measurement: '',
                    input_right: null,
                    input_right_measurement: '',
                  };
                  break;
                case 'singlenumeric':
                  row = {
                    question_id: innerItem.id,
                    inspection_status: null,
                    attachments: [],
                    type: innerItem.type,
                    additional_input: null,
                    additional_input_measurement: '',
                  };
                  break;
                default:
                  break;
              }
              return row;
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
      const reportRows = getState().report.report_rows;

      // Check if inputleft, inputright or singlenumeric report_row inputs are empty
      const isEmpty = reportRows.some((row: any) => {
        return Object.keys(row).some((key: any) => {
          if (
            key === 'additional_input' ||
            key === 'input_right' ||
            key === 'input_left'
          ) {
            if (row[key] === '' || row[key] === null) {
              return true;
            }
          }
        });
      });

      if (isEmpty) {
        dispatch(
          setError({
            type: 'Error',
            title: 'errors.emptyRowInputsTitle',
            message: 'errors.emptyRowInputsMessage',
          }),
        );
        return; // Exit the function if any input is empty
      }
      //console.log('getState().order.currentOrder', getState().report);
      const requestBody = {
        order_id: getState().order.currentOrder.id,
        brand_and_model: getState().report.brand_and_model,
        odometer_reading: getState().report.odometer_reading,
        production_number: getState().report.production_number,
        registration_number: getState().report.registration_number,
        engine_type: getState().report.engine_type,
        report_rows: getState().report.report_rows.map((item: any) => {
          return {
            ...item,
            attachments: item.attachments.map((attachment: any) => ({
              attachment_type: attachment.attachment_type,
              data: attachment.data,
            })),
          };
        }), //REMOVE REDUCE FUNCTION WHEN BACKEND FIXED
      };
      const response = await fetch(BASE_PATH + PATHS.SAVE_REPORT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

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
        //console.log('FETCHING NOT WORKING', response);
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

export const setReportByRegInitialState = () => {
  return {
    type: SET_INITIAL_STATE,
  };
};

export const setReportByReg = (reports: ReportsByReg[]) => {
  return {
    type: SET_REPORTS_BY_REG,
    payload: reports,
  };
};

export const fetchReportByReg = (registration_number: string) => {
  return async (dispatch: any, getState: any) => {
    if (!registration_number) {
      console.log('Registration number is empty, fetch aborted');
      return;
    }
    try {
      const response = await fetch(
        `${BASE_PATH}${PATHS.SAVE_REPORT}?registration_number=${registration_number}&language=${i18next.language}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );
      if (response.ok) {
        const reportByReg: ReportsByReg[] = await response.json();
        dispatch(setReportByReg(reportByReg));
        dispatch(deleteError());
      } else {
        throw Error;
      }
    } catch (err) {
      console.error('Error fetching report by registration number:', err);
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.fetchReportByReg',
          message: 'errors.fetchReportByRegMessage',
        }),
      );
    }
  };
};

export const getReportHtml = (
  registration_number: string,
  report_id: number,
) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(
        `${BASE_PATH}${PATHS.GET_REPORT_HTML}?language=${i18next.language}&registration_number=${registration_number}&report_id=${report_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      ); // TODO: remove later and use this from apimanager
      if (response.ok) {
        const html = await response.text();

        dispatch(setReportHTML(html));
      } else {
        throw Error;
      }
    } catch (err) {
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.fetchReportById',
          message: 'errors.fetchReportByIdMessage',
        }),
      );
    }
  };
};
