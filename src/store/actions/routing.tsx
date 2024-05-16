import {Navigation} from 'react-native-navigation';
import {SCREENS} from '../../common/constants.tsx';

export const changePage = async (name: string) => {
  await Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: name,
            },
          },
        ],
      },
    },
  });
};
