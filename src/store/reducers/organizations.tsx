import {SET_ORGANIZATIONS} from "../actions/actionTypes";
import {Organizations} from "../types/organization.tsx";
import {Report} from "../types/report.tsx";

export const initialState: Report = {
    registration_number: '',
    brand_and_model: '',
    odometer_reading: null,
    production_number: '',
    engine_type: 'petrol',
    report_structure: [],
    report_rows: [],
};

const organizationReducer = (state = initialState, action: any) => {
    console.log(22222222, action.type, SET_ORGANIZATIONS, action.type === SET_ORGANIZATIONS);
    switch (action.type) {
        case SET_ORGANIZATIONS:
            return {

                ...state,
                organizations: action.payload,
            };
        default:
            return state;
    }
}

export default organizationReducer;