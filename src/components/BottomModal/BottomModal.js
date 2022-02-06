/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {bottomModalStyle} from '../../../assets/styles/styles';
import {scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';

const BottomModal = ({
  isModalOpen,
  closeModal,
  children,
  dismissable,
  topLine,
  headerText,
  headerTextStyle,
  showCloseIcon = true,
  containerStyle = {},
}) => {
  const [modalOpen, toggleModal] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      toggleModal(true);
    } else {
      setModalClosed();
    }
  }, [isModalOpen]);
  const setModalClosed = () => {
    toggleModal(false);
    closeModal(false);
  };

  return (
    <Modal
      animationIn={'slideInUp'}
      onBackdropPress={dismissable ? setModalClosed : null}
      onBackButtonPress={dismissable ? setModalClosed : null}
      isVisible={modalOpen}
      propagateSwipe
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
      avoidKeyboard={true}
      useNativeDriver={true}>
      <View style={[bottomModalStyle.container, containerStyle]}>
        {topLine && <View style={bottomModalStyle.topLine} />}
        {headerText ? (
          <View style={bottomModalStyle.headerContainer}>
            <View style={{width: scale(40)}} />
            <View style={{flex: 1}}>
              <Text style={headerTextStyle || bottomModalStyle.headerText}>
                {headerText}
              </Text>
            </View>
          </View>
        ) : null}
        {showCloseIcon && (
          <TouchableOpacity
            style={{
              paddingHorizontal: scale(15),
              position: 'absolute',
              right: scale(0),
              top: scale(20),
              zIndex: 4,
            }}
            onPress={closeModal}>
            <IconGen tag="close" onPress={closeModal} />
          </TouchableOpacity>
        )}
        {children}
      </View>
    </Modal>
  );
};

BottomModal.defaultProps = {
  dismissable: true,
  topLine: true,
  headerText: '',
};

export default BottomModal;
