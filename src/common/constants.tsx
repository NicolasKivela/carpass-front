export const APP_NAME = 'CarPass';

export const BASE_PATH = 'https://carpass.fi/api/v1';

export const PATHS = {
  REPORT_STRUCTURE: '/report/structure',
  SAVE_REPORT: '/report',
  LOGIN: '/user/login',
  GET_REPORT_HTML: '/report/send',
};

export const SCREENS = {
  LOGIN: 'loginScreen',
  NEW_REPORT: 'newReportScreen',
  REVIEWER: 'reviewerScreen',
  DEALERSHIP: 'dealerShipScreen',
  SUMMARY: 'summaryScreen',
  INSPECTOR: 'inspectorScreen',
  CARREPORTS: 'carReportScreen',
  VIEW_REPORT: 'viewReportScreen',
};

export const REPORT_TYPE = {
  FULL: 'FULL',
  PART: 'PART',
  LITE: 'LITE',
};

export const LOCAL_STORAGE = {
  TOKEN: 'carpass:token',
};

export const REPORT_QUESTION_STATUS = {
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
};

export const LINKS = {
  TOS: 'http://carpass.fi/terms_of_use.pdf',
};

export const TABLET_WIDTH = 600;
