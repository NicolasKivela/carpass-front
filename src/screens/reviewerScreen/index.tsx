import React,{useState, useEffect} from 'react'
import {ScrollView,FlatList,View,Text, StyleSheet,TouchableOpacity,Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider,MD3Colors} from 'react-native-paper';
import TrafficLight from '../../components/trafficLight';
import ReviewProgressBar from '../../components/reviewNavigationbar';
import styles from './styles'


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
    const [pageNumber, setPageNumber] = useState(1);
    const [warningNum, setWarningNum] = useState(0);
    const [errorNum, setErrorNum] = useState(0);
    useEffect(() => {
        setWarningNum(0)
        setErrorNum(0)

    }, [])

    const handlePress = (value) => {
        if(activeButton === 0 || activeButton!==value){
            setActiveButton(value)
        }
        else if(activeButton === value){
                setActiveButton(0)
            }
    };
    const modifyWarningNum = (value) => {

        if (warningNum===0 && value<0){
           return
        }
        setWarningNum(warningNum+value)
        console.log(warningNum, 'THIS IS WARNING')
    }
    const modifyErrorNum = (value) => {

        if (errorNum===0 && value<0){
            return
        }
        setErrorNum(errorNum+value)
        console.log(errorNum, 'THIS IS ERROR')
    }


    return(
        <PaperProvider>
            <SafeAreaProvider>

               <View style={styles.container}>
                    <View style={styles.leftView}>
                        <Image
                          source={require('../../assets/images/trustcarlogo.png')}
                          style={styles.imageStyles}
                        />
                    </View>

                    <View style={styles.rightView}>
                        <View style={styles.circleRow}>

                              {warningNum>0 && <View style={[styles.circle,  warningNum > 0 ? { backgroundColor: 'yellow' } : null]}>
                                <Text>{warningNum}</Text>
                              </View>}


                              {errorNum>0 && <View style={[styles.circle, errorNum > 0 ? { backgroundColor: 'red' } : null]}>
                                <Text>{errorNum}</Text>
                              </View>}

                        </View>
                        <ReviewProgressBar progress={pageNumber/10}/>
                        <Text style={styles.pageNumber}>{pageNumber}/10</Text>
                    </View>
                </View>


                <View style={styles.gap}>
                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => handlePress(1)}
                        activeOpacity = {1}>
                        <Text style={[styles.buttonText,
                            activeButton === 1 && styles.activeButtonText]}>
                            LAAJA
                        </Text>
                        {activeButton === 1 && <View style={styles.underline} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => handlePress(2)}
                        activeOpacity = {1}
                            >
                        <Text style={[styles.buttonText,
                            activeButton === 2 && styles.activeButtonText]}>
                            KEVYT
                        </Text>
                        {activeButton === 2 && <View style={styles.underline} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => handlePress(3)}
                        activeOpacity = {1}
                        >
                        <Text style={[styles.buttonText,
                            activeButton === 3 && styles.activeButtonText]}>
                            OSA
                        </Text>
                        {activeButton === 3 && <View style={styles.underline} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.section3}>

                    <FlatList
                        ListHeaderComponent={<Text style={styles.header}>{displayText}</Text>}
                        data={displayData}
                        renderItem={({ item }) => <TrafficLight section={item.section} modifyError={modifyErrorNum} modifyWarning={modifyWarningNum}/>}
                        keyExtractor={(item) => item.key}
                      />
                </View>

            </SafeAreaProvider>
        </PaperProvider>
    );

};
export default ReviewerScreen;