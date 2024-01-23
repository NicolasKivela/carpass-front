import React from 'react';
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
        <View style={ratingCardView}>
            <View style={{width: '42%'}}>
            <Text style={{fontSize:15,marginRight: 50, color: colors.midGrey}}>{section}</Text>
            </View>
            <View style={chipView}>
            <Chip style={chip} icon={props => (
                                  <MaterialIcons
                                     {...props}
                                     name="warning"
                                     size={20}
                                     color={colors.midGrey}
                                     style={icon}
                                      />
                                    )}>
                                    </Chip>
            <Chip style={chip} icon={props => (
                                  <MaterialIcons
                                     {...props}
                                     name="bulb1"
                                     size={20}
                                     color={colors.midGrey}
                                     style={icon}
                                      />
                                    )}>
                                    </Chip>
            <Chip style={chip} icon={props => (
                                  <MaterialIcons
                                     {...props}
                                     name="safety"
                                     size={20}
                                     color={colors.midGrey}
                                     style={icon}
                                      />
                                    )}>
                                                </Chip>
               </View>
        </View>
    );
};
export default RatingCard;