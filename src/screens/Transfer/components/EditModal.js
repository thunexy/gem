import React, {useState} from 'react';
import {View} from 'react-native';
import BottomModal from '../../../components/BottomModal/BottomModal';
import Funding from '../../../components/Funding/Funding';
import HeaderText from '../../../components/HeaderText/HeaderText';
import {IconGen} from '../../../components/IconGenerator/IconGenerator';
import InfoText from '../../../components/InfoText/infoText';
import Text from '../../../components/Text/Text';
import TransactionDetails from '../../../components/TransactionDetails/details';
import {scale} from '../../../lib/utils/scaleUtils';

export default function EditModal({isModalOpen}) {
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState(null);
  return (
    <BottomModal
      isModalOpen={isModalOpen}
      topline={false}
      showCloseIcon={false}
      closeModal={() => {
        setSelected(null);
      }}
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
        <IconGen tag="check" color="#8960FF" size={1.5} />
      </View>

      <Funding
        amount={amount}
        setAmount={setAmount}
        textStyle={{marginTop: scale(20)}}
      />
    </BottomModal>
  );
}
