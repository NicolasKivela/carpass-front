import { StyleSheet } from 'react-native';
import { colors } from '../../common/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    margin: 15,
    borderWidth: 1,
    borderColor: colors.orange,
    borderRadius: 10, // Pyöristetyt kulmat
    backgroundColor: colors.darkGrey, // Taustaväri
    shadowColor: '#000', // Varjot
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRow: {
    marginBottom: 10,
  },
  bottomRow: {
    marginTop: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  topLeft: {},
  topRight: {},
  bottomLeft: {
    fontSize: 14,
  },
  bottomRight: {
    fontSize: 14,
  },
  tabletText: {
    fontSize: 24,
  },
  stateContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  readyStateBackground: {
    backgroundColor: 'red', // Taustan väri "ready" tilalle
  },
  button: {
    marginTop: 10,
    backgroundColor: colors.orange, // Painikkeen väri
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default styles;
