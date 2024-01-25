import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native'
import {Checkbox, Text, Chip} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors,chip,icon,ratingCardView, chipView} from '../common/styles'

interface RatingCardProps {
    section: string;
};
const RatingCard: React.FC <RatingCardProps> = (props) => {
    const {section} = props;

    return(
        <View style={styles.ratingCardView}>
            <View style={{width: '42%'}}>
            <Text style={{fontSize:15,marginRight: 49, color: colors.midGrey}}>{section}</Text>
            </View>
            <View style={styles.chipView}>
            <Chip style={styles.chip}></Chip>
            <Chip style={styles.chip}></Chip>
            <Chip style={styles.chip}></Chip>
               </View>
        </View>
    );
};
const styles = StyleSheet.create({

chip:{
    borderColor: colors.betweenGrey,
    borderWidth: 3,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.betweenGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 27
},
icon:{
    alignSelf: 'center'
},
ratingCardView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
    marginVertical: 10
},
chipView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 25,
    margin: 16,
    marginVertical: 10
}
})
export default RatingCard;