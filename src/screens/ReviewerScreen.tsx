import React from 'react'
import {ScrollView,FlatList} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import RatingCard from '../components/RatingCard';
import {container} from '../common/styles';


const ReviewerScreen: React.FC= () =>{
    const data = [{ id: '1', section: 'Ajettavuus' },
            {id: '2', section: 'Tuulilasi ja sen puhdistuslaitteet'},
            {id: '3', section: 'Lämmitys ja huurteenpoisto'},
            {id: '4', section: 'Sisätilat'},
            {id: '5', section: 'Hallintalaitteet ja merkkivalot'},
            {id: '6', section: 'Ohjauslukko'},
            {id: '7', section: 'Vaihdelukko'},
            {id: '8', section: 'Nopeusmittari'},
            {id: '9', section: 'Muut mittarit'}];
    return(
    <PaperProvider>
        <SafeAreaProvider>
            <ScrollView contentContainerStyle={container}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <RatingCard section={item.section} />}
                    keyExtractor={(item) => item.id}
                  />
            </ScrollView>
        </SafeAreaProvider>
    </PaperProvider>
    );

};

export default ReviewerScreen;