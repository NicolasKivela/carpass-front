import {StyleSheet} from 'react-native';
import {colors} from '../../common/styles';

const styles = StyleSheet.create({

  View: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  textStyle:{
    color: colors.midGrey,

  },
  image:{
    width: 40,
    height: 40,
    borderRadius:20,
    borderWidth: 2,
    borderColor: colors.orange

  },

});

export default styles;
