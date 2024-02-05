import React from 'react';
import { Text, Title } from 'react-native-paper';
import { Portal, Modal } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../common/styles';
import styles from '../styles';
import SecondaryButton from '../../secondaryButton';
import TextField from '../../textfield';

interface ModalContentProps {
    visible: boolean;
    onDismiss: () => void;
}

const LoginModal: React.FC<ModalContentProps> = ({ visible, onDismiss }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { t } = useTranslation();

    if (!visible) {
        return null;
    }

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modal}>
                <MaterialIcons
                    name="info-outline"
                    size={30}
                    color={colors.orange}
                    style={styles.iconStyle}
                />
                <Text style={styles.textStyle}>
                    {t('loginToApp')}
                </Text>
                <TextField style={styles.inputStyle} label={t('username')} onChangeText={username => setUsername(username)} value={username} rightIcon="keyboard" />
                <TextField style={styles.inputStyle} label={t('password')} onChangeText={password => setPassword(password)} value={password} rightIcon="password" />
                <SecondaryButton onPress={
                    () => {
                        console.log('username: ', username, '\n password: ', password)
                    }}
                    title={t('login')}
                    fontSize={16}
                    style={styles.btnStyle}
                />
            </Modal>
        </Portal>
    );
};

export default LoginModal;
