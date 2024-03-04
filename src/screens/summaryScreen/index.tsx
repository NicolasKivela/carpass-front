import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LogoTopBar from '../../components/logoTopBar';
import Gradient from '../../components/gradient';
import ReviewProgressBar from '../../components/reviewNavigationbar';

const SummaryScreen: React.FC = () => {
    const {t} = useTranslation();
    return(
        <Gradient>
        <SafeAreaView style={styles.container}>
            <LogoTopBar
              leftButton={{
                icon: 'arrow-back',
                action: () => console.log('TODO: navigate back'),
              }}
            />
            <View style={styles.trafficLightView}>
            <View>
                <Text style={styles.header}>YHTEENVETO</Text>
                <View style={styles.rowSection}>
                    <View style={styles.textContainer}>
                        <Text style={styles.carSectionText}>Hylkäykset</Text>
                    </View>
                    <View style={styles.carParts}>
                        <Text style={styles.error}>hallintalaitteet</Text>
                        <Text style={styles.error}>hallintalaitteet</Text>
                        <Text style={styles.error}>hallintalaitteet</Text>
                    </View>
                </View>
                <View style={styles.rowSection}>
                    <View style={styles.textContainer}>
                        <Text style={styles.carSectionText}>Huomautukset</Text>
                    </View>
                    <View style={styles.carParts}>
                        <Text style={styles.warning}>sisätilat</Text>
                        <Text style={styles.warning}>sisätilat</Text>
                    </View>
                </View>
                <View style={styles.rowSection}>
                    <Text style={styles.carSectionText}>Kuvat</Text>
                    <View style={styles.imageSection}>
                        <Image style={styles.image}/>
                        <Image style={styles.image}/>
                    </View>
                </View>
                <Text style={styles.carSectionText}>Raportti</Text>
                <View style={styles.centered}>
                    <TouchableOpacity onPress={console.log("TODO: TARKASTUS VALMIS")}>
                        <Text style={styles.sendReportText}>TARKASTUS VALMIS</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </SafeAreaView>
        </Gradient>
    )
}

export default SummaryScreen;