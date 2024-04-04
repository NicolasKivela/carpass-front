import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    //backgroundColor: colors.darkOrange,
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    color: colors.white,
    marginTop: 10,
    marginBottom: 20,
  },
  innerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: colors.darkerGrey,
    //borderColor: colors.lightGrey,
    //borderWidth: 2,
    marginBottom: 30,
    borderRadius: 8, // Adjust the radius value to control the curvature
    borderColor: 'transparent',
    borderWidth: 2,
  },
  leftContainer: {
    width: '50%',
    //backgroundColor: colors.orange,
    justifyContent: 'center',
  },
  rigthContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: colors.green,
    justifyContent: 'flex-end',
  },
  textstyle: {color: colors.white},
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    marginHorizontal: 2,
  },
  redBackground: {backgroundColor: colors.red},
  yellowBackground: {backgroundColor: colors.yellow},
  button: {
    flex: 0.7,
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '20%',
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.orange,
    borderRadius: 8,
  },
  textbutton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.orange,
  },
});

export default styles;
