import {SET_ORGANIZATIONS} from "../actions/actionTypes";
import {Organizations} from "../types/organization.tsx";

export const initialState: Organizations = {
    organizations: []
};

const organizationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_ORGANIZATIONS:
            return {
                ...state,
                organizations: action.payload,
            };
    }
}

export default organizationReducer;