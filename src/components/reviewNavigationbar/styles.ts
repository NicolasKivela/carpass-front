import {StyleSheet} from 'react-native';
import {colors} from '../../common/styles.tsx';

const styles = StyleSheet.create({
    navigationProgressBar: {
        width: 200

    },
    colors: {
        primary: colors.orange,
        surfaceVariant: colors.darkOrange
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50/2, // to make it a circle
        backgroundColor: 'yellow', // or any color you prefer
    },
})
export default styles;