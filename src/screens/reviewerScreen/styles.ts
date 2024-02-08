import {StyleSheet} from 'react-native';
import {colors} from '../../common/styles';

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
    buttonText: {
        fontSize:20,
        color:colors.midGrey
    },
    activeButtonText: {
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
});
export default styles;