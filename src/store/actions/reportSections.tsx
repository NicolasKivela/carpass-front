import {BASE_PATH, PATHS} from '../../common/constants.tsx';
import {setError} from './error.tsx';
import {SET_REPORT_SECTIONS} from './actionTypes.tsx';
import {ReportSection} from '../types/report.tsx';

export const setReportSections = (sections: Array<ReportSection>) => {
  return {
    type: SET_REPORT_SECTIONS,
    payload: {
      sections: sections,
    },
  };
};
export const fetchReportSections = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(`${BASE_PATH}${PATHS.REPORT_SECTIONS}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });
      if (response.ok) {
        const rawSections = await response.json();
        const sections = rawSections.sections.map(section => {
          return {
            id: section.id,
            created_at: section.created_at,
            updated_at: section.updated_at,
            unit_price: section.unit_price,
            translations: section.translations.map(translation => {
              return {value: translation.value};
            }),
          };
        });
        dispatch(setReportSections(sections));
      } else {
        throw Error;
      }
    } catch (err) {
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.fetchReportSections',
          message: 'errors.fetchReportSectionsMessage',
        }),
      );
    }
  };
};
