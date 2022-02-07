import React, {useState} from 'react';
import BottomModal from '../../../components/BottomModal/BottomModal';
import HeaderText from '../../../components/HeaderText/HeaderText';
import InfoText from '../../../components/InfoText/infoText';
import TransactionDetails from '../../../components/TransactionDetails/details';
import {scale} from '../../../lib/utils/scaleUtils';

export default function InfoModal({
  isModalOpen,
  closeModal,
  amountPaid,
  amountReceived,
  exchangeRate,
}) {
  return (
    <BottomModal
      isModalOpen={isModalOpen}
      topline={false}
      showCloseIcon={false}
      closeModal={closeModal}
      containerStyle={{backgroundColor: '#fff', padding: scale(20)}}>
      <HeaderText
        title="Transaction details"
        textStyle={{color: '#0E093F', fontSize: 24, fontWeight: '600'}}
      />
      <TransactionDetails
        processingFee={'0 USD'}
        exchangeRate={exchangeRate }
        amountToPay={amountPaid}
        amountToReceive={amountReceived}
      />

      <InfoText text="Gen To Gen transfers incur zero charges" />
    </BottomModal>
  );
}
