import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

export const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  midSection: {
      width: '42%',
  },
  header:{
      fontSize: 25,
      color: colors.white,
      marginTop: 30,
      marginLeft: 10
  },

  carSectionText:{
      fontSize:20,
      marginTop: 30,
      marginLeft: 10,
      color: colors.lightGrey
  },
  carParts: {
      flex: 0.9,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      //marginVertical: 15,
      marginTop: 30,
      marginLeft: 10,
  },
  image:{
      width: 40,
      height: 40,
      borderRadius:20,
      borderWidth: 2,
      marginRight:5,
      borderColor: colors.orange
  },
  imageSection:{
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    //marginVertical: 15,
    marginTop: 22,
    //marginLeft: 10,
  },
  error:{
      fontSize:16,
      color: colors.red,
  },
  rowSection:{
    flexDirection: 'row',
    alignItems: 'flex-start',

  },
  textContainer: {
    width: 150,
    marginRight: 10,

  },
  warning: {
    fontSize:16,
    color: colors.yellow
  },
  sendReportText: {
    fontSize:20,
    fontWeight: 'bold',
    color: colors.orange
  },
  centered: {
    marginTop: 60,
    alignItems: 'center'
  },
  pdfSection:{
      flex: 0.9,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginTop: 22,
  },
 });