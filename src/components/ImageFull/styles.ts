import {StyleSheet} from 'react-native';
import {colors} from '../../common/styles';

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'column'
  },
  topBar: {
    flex: 0.1,
    backgroundColor: colors.darkGrey,
    justifyContent: 'center',
    alignItems:'center'
  },
  background:{
    justifyContent: 'flex-end',
    flex: 0.9,
  },
  bottomBar: {
    height: '10%',
    backgroundColor: colors.black70,
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection: 'row'
  },

});

export default styles;
