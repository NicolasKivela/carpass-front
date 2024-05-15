import React from 'react';
import { View, StyleSheet } from 'react-native';
import {styles} from './styles';
import {
    LogoTopBar,
    Gradient,
    DropdownNotification,
} from '../../components/index';
import {
    SafeAreaView,
    KeyboardAvoidingView,
} from 'react-native';
import {changePage} from "../../store/actions/routing.tsx";
import {SCREENS} from "../../common/constants.tsx";

const backButtonHandler = () => {
    changePage(SCREENS.INSPECTOR);
}

const NewOrderScreen: React.FC = () => {
    return (
        <Gradient>
            <SafeAreaView style={styles.container}>
                <LogoTopBar
                    leftButton={{
                        icon: 'arrow-back',
                        action: backButtonHandler,
                    }}
                />

                <KeyboardAvoidingView>

                </KeyboardAvoidingView>
            </SafeAreaView>
            <DropdownNotification />
        </Gradient>
    );
};

export default NewOrderScreen;
