import {BASE_PATH, PATHS} from '../../common/constants.tsx';
import {setError} from './error.tsx';
import {Organization} from '../types/organization.tsx';
import {SET_ORGANIZATIONS} from './actionTypes.tsx';

export const setOrganizations = (organizations: Array<Organization>) => {
  return {
    type: SET_ORGANIZATIONS,
    payload: {
      organizations: organizations,
    },
  };
};
export const fetchOrganizations = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(`${BASE_PATH}${PATHS.ORGANIZATION}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });
      if (response.ok) {
        const rawOrgs = await response.json();
        const organizations = rawOrgs.organizations
          .map(org => {
            return {
              id: org.id,
              name: org.name,
              type: org.type,
            };
          })
          .flat();
        console.log(organizations);
        dispatch(setOrganizations(organizations));
      } else {
        throw Error;
      }
    } catch (err) {
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.fetchOrganizations',
          message: 'errors.fetchOrganizationsMessage',
        }),
      );
    }
  };
};
