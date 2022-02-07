import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import BottomModal from '../../../components/BottomModal/BottomModal';
import {IconGen} from '../../../components/IconGenerator/IconGenerator';
import {scale, moderateScale} from '../../../lib/utils/scaleUtils';
import {text} from '../../../../assets/styles/styles';
import FundingText from '../../../components/Funding/FundingText';
import Details from '../../../components/TransactionDetails/details';
import Footer from '../../../components/Footer/Footer';
import Nav from '../../../components/HeaderNav/Nav';
import PinInputs from '../../../components/Input/PinInputs';

export default function SetPin({isModalOpen, closeModal, data}) {
  const [oneTimePin, setOneTimePin] = useState([]);
  const [success , setSuccess] = useState(false);
  const [error, setError] = useState('');
  return (
    <BottomModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      containerStyle={{backgroundColor: '#fff'}}
      showCloseIcon={false}>
      <View>
        <Nav
          description="Your transaction PIN will be used to approve transfers and payments on Gen. Do not share this PIN with anyone."
          title="Set transaction PIN"
          onClose={closeModal}
        />
        <View style={{marginHorizontal: scale(24), marginBottom: scale(40)}}>
          <PinInputs
            handlePin={oneTimePin => {
              setError('');
              setOneTimePin(oneTimePin);
            }}
            error={error}
          />
        </View>

        <Footer 
            onPress={() => {
                setSuccess(true)
            }}
            btnText="Set Pin & finish transfer"
            btnIcon="arrowRight"
        />
      </View>

      
    </BottomModal>
  );
}
