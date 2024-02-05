import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native'
import {Checkbox, Text, Chip} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors,chip,icon,ratingCardView, chipView} from '../common/styles'

interface TrafficLightsProps {
    section: string;
};
const TrafficLights: React.FC <TrafficLightsProps> = (props) => {
    const {section} = props;
    const [activeChip, setActiveChip] = useState(0);

    const handlePress = (value) => {
    if(activeChip === 0 || activeChip!==value){
        setActiveChip(value)
    }
    else if(activeChip === value){
        setActiveChip(0)
    }
    };

    return(
        <View style={styles.trafficLightsView}>
            <View style={{width: '42%'}}>
                <Text style={styles.carPartText}>{section}</Text>
            </View>
            <View style={styles.chipView}>
                <Chip style={[styles.chip,activeChip===1 && styles.activeChip1]}
                    onPress={() => handlePress(1)}></Chip>
                <Chip style={[styles.chip, activeChip===2 && styles.activeChip2]}
                    onPress={() => handlePress(2)}></Chip>
                <Chip style={[styles.chip, activeChip===3 && styles.activeChip3]}
                    onPress={() => handlePress(3)}></Chip>
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
    activeChip1: {
        borderColor: colors.black,
        borderWidth: 2,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 27
    },
    activeChip2: {
        borderWidth: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 27
    },
    activeChip3: {
        borderWidth: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 27
    },
    icon:{
        alignSelf: 'center'
    },
    trafficLightsView:{
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
    },
    carPartText:{
        fontSize:15,
        marginRight: 49,
        color: colors.midGrey
    }
})
export default TrafficLights;