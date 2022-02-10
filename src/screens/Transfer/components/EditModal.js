import React, {useState} from 'react';
import {View} from 'react-native';
import BottomModal from '../../../components/BottomModal/BottomModal';
import Funding from '../../../components/Funding/Funding';
import {IconGen} from '../../../components/IconGenerator/IconGenerator';
import Text from '../../../components/Text/Text';
import {scale} from '../../../lib/utils/scaleUtils';

export default function EditModal({
  isModalOpen,
  amount,
  setAmount,
  currency,
  closeModal,
}) {
  return (
    <BottomModal
      isModalOpen={isModalOpen}
      topline={false}
      dismissable={true}
      showCloseIcon={false}
      closeModal={closeModal}
      containerStyle={{backgroundColor: '#fff', padding: scale(20), flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: scale(10),
        }}>
        <Text size="h1" color="#0E093F" style={{flex: 1}}>
          Edit send amount
        </Text>
        <IconGen tag="check" color="#8960FF" size={2.5} onPress={closeModal} />
      </View>

      <Funding
        amount={amount}
        setAmount={setAmount}
        currency={currency}
        textStyle={{marginTop: scale(20)}}
      />
    </BottomModal>
  );
}
