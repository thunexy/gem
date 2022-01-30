import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import BottomModal from '../../components/BottomModal/BottomModal';
import HeaderText from '../../components/HeaderText/HeaderText';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import TransactionDetails from '../../components/TransactionDetails/details';
import InfoText from '../../components/InfoText/infoText';

export default function Transaction() {
  const [selected, setSelected] = useState(null);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setSelected(1);
        }}>
        <Text>Show Transaction Modal</Text>
      </TouchableOpacity>

      <BottomModal
        isModalOpen={typeof selected == 'number'}
        topline={false}
        showCloseIcon={false}
        closeModal={() => {
          setSelected(null);
        }}
        containerStyle={{backgroundColor: '#fff', padding: scale(20)}}>
        <HeaderText
          title="Transaction details"
          textStyle={{color: '#0E093F', fontSize: 24, fontWeight: '600'}}
        />
        <TransactionDetails
          processingFee={'0 USD'}
          exchangeRate="1/1"
          amountToPay="9,150,000 USD"
          amountToReceive="9,150,000 USD"
        />

        <InfoText text="Gen To Gen transfers incur zero charges" />
      </BottomModal>
    </View>
  );
}
