import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native'
import {Checkbox, Text, Chip} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

interface TrafficLightProps {
    section: string;
};
const TrafficLight: React.FC <TrafficLightProps> = (props) => {
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
        <View style={styles.trafficLightView}>
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

export default TrafficLight;