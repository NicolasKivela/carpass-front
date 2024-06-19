import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  imageStyles: {
    width: '80%',
    height: '35%',
    position: 'absolute',
    top: 0,
    resizeMode: 'contain',
    marginTop: 30,
  },
  text: {
    color: colors.orange,
    fontSize: 18,
  },
  button: {
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
    color: colors.orange,
    marginTop: 10,
  },
  buttonContainer: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
  },
  buttonContainerOther: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  menu: {
    right: 0,
    top: 0,
    position: 'absolute',
  },
  menuContent: {
    backgroundColor: colors.darkGrey,
  },
  menuItem: {
    backgroundColor: colors.darkGrey,
    color: colors.orange,
  },
});

export default styles;
