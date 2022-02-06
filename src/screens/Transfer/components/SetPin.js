import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {text} from '../../../../assets/styles/styles';
import BottomModal from '../../../components/BottomModal/BottomModal';
import Footer from '../../../components/Footer/Footer';
import Nav from '../../../components/HeaderNav/Nav';
import PinInputs from '../../../components/Input/PinInputs';
import {scale} from '../../../lib/utils/scaleUtils';

export default function SetPin({
  isModalOpen,
  closeModal,
  data,
  loading,
  handleTransfer,
}) {
  const [pin, setPin] = useState([]);
  const [error, setError] = useState('');
  const auth = useSelector(state => state.authentication);
  return (
    <BottomModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      containerStyle={{backgroundColor: '#fff', paddingTop: scale(10)}}
      showCloseIcon={false}>
      <View>
        <Nav
          description={
            <Text>
              Your transaction PIN will used to approve transfers and payments
              on Gen.{' '}
              <Text style={{fontFamily: text.helonikBold}}>
                Do not share this PIN with anyone.
              </Text>
            </Text>
          }
          title={
            auth.onboarding.steps.pin_set
              ? 'Confirm transaction PIN'
              : 'Set transaction PIN'
          }
          onClose={closeModal}
        />
        <View style={{marginHorizontal: scale(24), marginBottom: scale(40)}}>
          <PinInputs
            handlePin={pin => {
              setError('');
              setPin(pin);
            }}
            error={error}
          />
        </View>

        <Footer
          btnText={
            auth.onboarding.steps.pin_set
              ? 'Finish transfer'
              : 'Set Pin & finish transfer'
          }
          btnIcon="arrowRight"
          loading={loading}
          disabled={loading || pin.length < 4}
          onPress={() => handleTransfer(pin.join(''))}
        />
      </View>
    </BottomModal>
  );
}
