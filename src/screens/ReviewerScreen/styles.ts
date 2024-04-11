import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    color: colors.white,
    marginTop: 10,
    marginLeft: 10,
  },
  gap: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    flex: 0.15,
    flexDirection: 'row',
    backgroundColor: colors.black,
  },
  leftView: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightView: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  section3: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: colors.darkGrey,
    flex: 1,
    justifyContent: 'center',
    height: 60,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: colors.midGrey,
  },
  activeButtonText: {
    fontSize: 20,
    color: colors.orange,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 2,
    borderBottomColor: colors.orange,
  },
  progressView: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageStyles: {
    width: '90%', // Ensure the image takes up the entire width of the parent view
    height: '90%', // Ensure the image takes up the entire height of the parent view
    resizeMode: 'contain', // Adjust the image size to fit the container while preserving aspect ratio
  },
  pageNumber: {
    color: colors.white,
    fontSize: 16,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  yellowCircle: {
    backgroundColor: colors.yellow,
  },
  redCircle: {
    backgroundColor: colors.red,
  },
  circleRow: {
    flexDirection: 'row',
    marginLeft: 135,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  footerButton: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.orange,
  },
  footerButtonDisabled: {
    borderColor: colors.lightGrey,
  },
  footerButtonContentStyle: {
    flexDirection: 'row-reverse',
  },
  footerButtonLabel: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  infoText: {
    textAlign: 'right',
    paddingRight: 15,
    color: colors.orange,
  },
  switchContainerStyle: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 10,
    paddingVertical: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
export default styles;
