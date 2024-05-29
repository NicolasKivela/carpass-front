export const APP_NAME = 'CarPass';

// export const DOMAIN = 'https://carpass.fi';
export const DOMAIN = 'http://10.0.2.2:8080';
export const BASE_PATH = DOMAIN + '/api/v1';
//'https://carpass.fi';
//'http://10.0.2.2:8080';

export const PATHS = {
  REPORT_STRUCTURE: '/report/structure',
  SAVE_REPORT: '/report',
  LOGIN: '/user/login',
  GET_REPORT_HTML: '/report/send',
  ORDER: '/order',
  LOGOUT: '/user/logout',
  CREATE_ORDER: '/order',
  ORGANIZATION: '/organization',
  REPORT_SECTIONS: '/order/sections',
  CHANGE_TYPE: 'user/change-type',
};

export const SCREENS = {
  LOGIN: 'loginScreen',
  NEW_REPORT: 'newReportScreen',
  NEW_ORDER: 'newOrderScreen',
  REVIEWER: 'reviewerScreen',
  DEALERSHIP: 'dealerShipScreen',
  SUMMARY: 'summaryScreen',
  INSPECTOR: 'inspectorScreen',
  CARREPORTS: 'carReportScreen',
  VIEW_REPORT: 'viewReportScreen',
  ALLORDERS: 'allOrdersScreen',
  CUSTOMER_SCREEN: 'customerScreen',
  MY_NEW_ORDER: 'myNewOrderScreen',
  CUSTOMER_ORDERS: 'customerOrdersScreen',
  INSPECTION_ORDERS: 'inspectionOrdersScreen',
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

export const USER_TYPE = {
  MAINTENANCE: 'maintenance',
  SELLER: 'seller',
  INSPECTION: 'inspection',
  REPAIR: 'repair',
};
export const LINKS = {
  TOS: 'http://carpass.fi/terms_of_use.pdf',
};

export const REPORT_TYPE_API = {
  0: 'full',
  1: 'narrow',
  2: 'light',
};

export const ENGINE_TYPE_API = {
  0: 'petrol',
  1: 'diesel',
  2: 'hybrid_diesel',
  3: 'hybrid_gasoline',
  4: 'electric',
  5: 'hybrid',
};

export const TABLET_WIDTH = 600;
