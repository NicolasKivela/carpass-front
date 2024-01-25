import React,{useState} from 'react'
import {ScrollView,FlatList,View,Text, StyleSheet,TouchableOpacity} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import RatingCard from '../components/RatingCard';
import {container, colors} from '../common/styles';


const ReviewerScreen: React.FC= () =>{
    const data1 = [{ key: '1', section: 'Ajettavuus' },
            {key: '2', section: 'Tuulilasi ja sen puhdistuslaitteet'},
            {key: '3', section: 'Lämmitys ja huurteenpoisto'},
            {key: '4', section: 'Sisätilat'},
            {key: '5', section: 'Hallintalaitteet ja merkkivalot'},
            {key: '6', section: 'Ohjauslukko'},
            {key: '7', section: 'Vaihdelukko'},
            {key: '8', section: 'Nopeusmittari'},
            {key: '9', section: 'Muut mittarit'}];
    const text1 = "1. Ajettavuus, hallintalaitteet ja sisätilat"
    const [displayData, setData] = useState(data1)
    const [displayText, setText] = useState(text1)
    const [activeButton, setActiveButton] = useState(0);

    const handlePress = (value) => {
    if(activeButton === 0 || activeButton!==value){
        setActiveButton(value)
    }
    else if(activeButton === value){
            setActiveButton(0)
        }
    };

    return(
    <PaperProvider>
        <SafeAreaProvider>
            <View style={styles.container}>
            </View>
            <View style={styles.gap}>

                <TouchableOpacity
                style={[styles.button]}
                onPress={() => handlePress(1)}
                activeOpacity = {1}
                >
                <Text style={[styles.buttonText, activeButton === 1 && styles.activeButtonText]}>
                LAAJA
                </Text>
                {activeButton === 1 && <View style={styles.underline} />}
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.button]}
                onPress={() => handlePress(2)}
                activeOpacity = {1}
                >
                <Text style={[styles.buttonText, activeButton === 2 && styles.activeButtonText]}>
                KEVYT
                </Text>
                {activeButton === 2 && <View style={styles.underline} />}
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.button]}
                onPress={() => handlePress(3)}
                activeOpacity = {1}
                >
                <Text style={[styles.buttonText, activeButton === 3 && styles.activeButtonText]}>
                OSA
                </Text>
                {activeButton === 3 && <View style={styles.underline} />}
                </TouchableOpacity>
            </View>
            <View style={styles.section3}>
                <FlatList
                    ListHeaderComponent={<Text style={styles.header}>{displayText}</Text>}
                    data={displayData}
                    renderItem={({ item }) => <RatingCard section={item.section} />}
                    keyExtractor={(item) => item.key}
                  />
        </View>
        </SafeAreaProvider>
    </PaperProvider>
    );

};
const styles = StyleSheet.create({
    header:{
        fontSize: 25,
        color: colors.white,
        marginTop: 10,
        marginLeft: 10
    },
    gap:{
        height: 60,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    container:{
        paddingTop: 2,
        flex: 0.2,
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap:10,
    },
    section3:{

            flex: 1,
            backgroundColor: colors.black,
            alignItems: 'center',
            justifyContent: 'space-between',
            gap:10,
    },
    button: {
        backgroundColor: colors.darkGrey,
        flex: 1,
        justifyContent: "center",
        height:60,
        alignItems: "center",

      },

    buttonText:{
    fontSize:20,
    color:colors.midGrey
    },
    activeButtonText:{
        fontSize:20,
        color:colors.orange,

        },
    underline: {

        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 2,
        borderBottomColor: colors.orange,

    }
})

export default ReviewerScreen;