// index.tsx
import React, {useEffect, useState} from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Button, IconButton } from 'react-native-paper';
import styles from './styles';
import SecondaryButton from "../SecondaryButton";
import {useTranslation} from "react-i18next";
import {logoutUser} from "../../store/actions/user.tsx";
import {DOMAIN} from "../../common/constants.tsx";
import user from "../../store/reducers/user.tsx";
import {User} from "../../store/types/user.tsx";  // Ensure the path is correct

interface ProfileHangerProps {
    user: User
}

const ProfileHanger: React.FC<ProfileHangerProps> = ({ user }) => {
    const {t} = useTranslation();
    const [visible, setVisible] = useState(false);
    const defaultAvatar = require('../../assets/images/avatar.png');
    const avatarSource = user.avatar_uri && user.avatar_uri.length ? { uri: user.avatar_uri } : defaultAvatar;

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const logout = async() => {
        await logoutUser(user);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={showModal} style={styles.avatarButton}>
                <Avatar.Image size={80} source={{ uri: DOMAIN + '/avatar_images/avatar_20240514_114809.png'}} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={hideModal}>
                <TouchableWithoutFeedback onPress={hideModal}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <IconButton
                                    icon="close"
                                    size={20}
                                    onPress={hideModal}
                                    style={styles.closeButton}
                                />
                                <View style={styles.modalText}>
                                    <View style={styles.nameBar}>
                                        <Avatar.Image style={styles.avatarInMenu} size={60} source={{ uri: DOMAIN + '/avatar_images/avatar_20240514_114809.png'}} />
                                        <Text style={styles.username}>@{user.user_name}</Text>
                                        <Text style={styles.fullName}>{[user.first_name, user.last_name].join(' ')}</Text>
                                    </View>
                                    <SecondaryButton title={t('aboutMe')} onPress={() => console.log('About me')}/>
                                    <SecondaryButton title={t('settings')} onPress={() => console.log('About me')}/>
                                    <SecondaryButton title={t('logout')} onPress={logout}/>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default ProfileHanger;
