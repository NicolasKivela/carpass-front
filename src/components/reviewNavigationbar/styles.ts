import {StyleSheet} from 'react-native';
import {colors} from '../../common/styles.tsx';

const styles = StyleSheet.create({
    navigationProgressBar: {
        width: 200

    },
    circleStyle: {
        width: 50,
        height: 50,
        borderRadius: 50/2, // to make it a circle
        backgroundColor: 'yellow',
    },
    container:{
        flex: 0.2,
        flexDirection: 'row',
        backgroundColor: colors.transparent,
    },
    leftView: {
        flex:0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    circleRow: {
        flexDirection: 'row',
        marginLeft: 135
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: colors.black,
    },
    yellowCircle: {
        backgroundColor: colors.yellow
    },
    redCircle: {
        backgroundColor: colors.red
    },
    pageNumber: {
        color: colors.white,
        fontSize: 16
    },
    gap:{
        display: 'flex',
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
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
    },
    imageStyles: {
        width: '90%', // Ensure the image takes up the entire width of the parent view
        height: '90%', // Ensure the image takes up the entire height of the parent view
        resizeMode: 'contain', // Adjust the image size to fit the container while preserving aspect ratio
        overflow: 'visible',
    },

})
export default styles;