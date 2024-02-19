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
    
  },
  background:{


    justifyContent: 'flex-end',
    flex: 0.9,

  },
  bottomBar: {
    height: '10%',
    backgroundColor: colors.black.replace('rgb','rgba').replace(')',', 0.7)'),
    justifyContent: 'center',
    flexDirection: 'row'
  },

});

export default styles;
