import {SET_ORGANIZATIONS} from "../actions/actionTypes";
import {Organization, Organizations} from "../types/organization.tsx";
import {Report} from "../types/report.tsx";

export const initialState: Organizations = {
    organizations: []
};

const organizationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_ORGANIZATIONS:
            return {
                ...state,
                organizations: action.payload.organizations,
            };
        default:
            return state;
    }
}

export default organizationReducer;