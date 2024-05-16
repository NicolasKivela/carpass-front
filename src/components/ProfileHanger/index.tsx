import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import styles from './styles';
import SecondaryButton from "../SecondaryButton";
import { useTranslation } from "react-i18next";
import {logoutUser, setUserData} from "../../store/actions/user.tsx";
import {BASE_PATH, DOMAIN, PATHS, SCREENS, USER_TYPE} from "../../common/constants.tsx";
import { User } from "../../store/types/user.tsx";
import {DelayTime, ErrorMessage, SuccessMessage, toastError, toastSuccess} from "../../store/actions/toast.tsx";
import {useAppDispatch} from "../../store/configureStore.tsx";
import {changePage} from "../../store/actions/routing.tsx";

interface ProfileHangerProps {
    user: User
}

const ProfileHanger: React.FC<ProfileHangerProps> = ({ user }) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [aboutMeVisible, setAboutMeVisible] = useState(false);
    const defaultAvatar = require('../../assets/images/avatar.png');
    const avatarSource = user.avatar_uri && user.avatar_uri.length ? { uri: DOMAIN + '/' + user.avatar_uri } : defaultAvatar;

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showSettingsModal = () => setSettingsVisible(true);
    const hideSettingsModal = () => setSettingsVisible(false);

    const showAboutMeModal = () => setAboutMeVisible(true);
    const hideAboutMeModal = () => setAboutMeVisible(false);

    const logout = async () => {
        await logoutUser(user);
    }
    const dispatch = useAppDispatch();

    const changeUserType = async() => {
        const path = BASE_PATH + '/' + PATHS.CHANGE_TYPE;
        const newType = user.organization_type === USER_TYPE.INSPECTION ? USER_TYPE.SELLER : USER_TYPE.INSPECTION;
        const body = JSON.stringify({
           type: newType
        });
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: body,
        });
        hideSettingsModal();
        hideModal();
        if (response.ok) {
            await toastSuccess(SuccessMessage.CHANGE_USER_TYPE, t, DelayTime.QUICK);
            dispatch(
                setUserData({
                    ...user,
                    organization_type: newType
                }),
            );
        } else {
            toastError(ErrorMessage.CHANGE_USER_TYPE, t);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={showModal} style={styles.avatarButton}>
                <Avatar.Image size={80} source={avatarSource} />
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
                                        <Avatar.Image style={styles.avatarInMenu} size={60} source={avatarSource} />
                                        <Text style={styles.username}>@{user.user_name}</Text>
                                        <Text style={styles.fullName}>{[user.first_name, user.last_name].join(' ')}</Text>
                                    </View>
                                    <SecondaryButton title={t('aboutMe')} onPress={showAboutMeModal} />
                                    <SecondaryButton title={t('settings')} onPress={showSettingsModal} />
                                    <SecondaryButton title={t('logout')} onPress={logout} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* About Me Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={aboutMeVisible}
                onRequestClose={hideAboutMeModal}>
                <TouchableWithoutFeedback onPress={hideAboutMeModal}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <IconButton
                                    icon="close"
                                    size={20}
                                    onPress={hideAboutMeModal}
                                    style={styles.closeButton}
                                />
                                <View style={styles.modalText}>
                                    <Text style={styles.modalTitle}>{t('aboutMe')}</Text>
                                    <Text>{`${t('profileHanger.youAre')} ${t(`userType.${user.organization_type}`)}.`}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Settings Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={settingsVisible}
                onRequestClose={hideSettingsModal}>
                <TouchableWithoutFeedback onPress={hideSettingsModal}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <IconButton
                                    icon="close"
                                    size={20}
                                    onPress={hideSettingsModal}
                                    style={styles.closeButton}
                                />
                                <View style={styles.modalText}>
                                    <Text style={styles.modalTitle}>{t('settings')}</Text>
                                    <Text>{t(`userType.${user.organization_type}`)}</Text>
                                    <SecondaryButton title={t('profileHanger.changeUserType')} onPress={changeUserType}/>
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
