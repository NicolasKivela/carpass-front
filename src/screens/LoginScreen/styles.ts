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
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default styles;
