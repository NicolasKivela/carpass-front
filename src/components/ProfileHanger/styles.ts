// styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
    },
    avatarButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    smallName: {
        marginTop: 4,
        fontSize: 12,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    nameBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    closeButton: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    modalText: {
        alignItems: 'center',
        marginTop: 8,
        minWidth: 192,
        gap: 4,
    },
    avatarInMenu: {
        marginRight: 8,
    },
    username: {
        fontSize: 14,
        marginRight: 8
    },
    fullName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    }
});
