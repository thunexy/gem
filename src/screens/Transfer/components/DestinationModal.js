import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import BottomModal from '../../../components/BottomModal/BottomModal';
import {IconGen} from '../../../components/IconGenerator/IconGenerator';
import Text from '../../../components/Text/Text';
import {scale} from '../../../lib/utils/scaleUtils';
// import { moderateScale , scale } from '../../lib/utils/scaleUtils';

export default function DestinationModal({
  isModalOpen,
  destination,
  setDestination,
  data,
  closeModal = () => {},
}) {
  console.log(destination);
  return (
    <BottomModal
      isModalOpen={isModalOpen}
      showCloseIcon={false}
      closeModal={closeModal}
      dismissable={true}
      containerStyle={{
        backgroundColor: '#fff',
        paddingTop: scale(10),
      }}>
      <View style={{paddingTop: scale(12), marginBottom: scale(26)}}>
        {data.map(({icon, title}) => (
          <TouchableOpacity
            onPress={() => {
              setDestination(title);
              closeModal();
            }}
            style={{
              backgroundColor: destination === title ? '#F5F9E4' : '#fff',
              paddingHorizontal: scale(30),
              flexDirection: 'row',
              paddingVertical: scale(20),
              alignItems: 'center',
            }}>
            <IconGen tag={icon} size={1} />
            <Text
              onPress={() => {
                setDestination(title);
                closeModal();
              }}
              size="h3"
              style={{
                marginLeft: scale(18),
                flex: 1
              }}>
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomModal>
  );
}
