import React, {useState} from 'react';
import {View} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {onboarding} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import Funding from '../../components/Funding/Funding';
import Nav from '../../components/HeaderNav/Nav';
import {apiRequest} from '../../lib/api/api';
import {rateUrl} from '../../lib/api/url';
import {scale} from '../../lib/utils/scaleUtils';

export default function TransferAmount({navigation}) {
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const getRate = () => {
    setLoading(true);
    apiRequest(rateUrl, 'post', {
      amount,
      from_currency_name: 'USD',
      to_currency_name: 'NGN',
    })
      .then(response => {
        navigation.navigate('ReceiveAmount', {amount, rate: response.data});
      })
      .catch(e =>
        SimpleToast.show(
          e.response?.data?.message || e.message,
          SimpleToast.LONG,
        ),
      )
      .finally(() => setLoading(false));
  };
  return (
    <View style={onboarding.container}>
      <View style={{backgroundColor: '#F7C57C', flex: 1}}>
        <View
          style={{
            ...onboarding.inputContainer,
            paddingHorizontal: scale(0),
            flex: 1,
          }}>
          <Nav
            title="Send money"
            description="How much do you want to send?"
            onClose={navigation.goBack}
          />

          <Funding amount={amount} setAmount={setAmount} />
          <View style={{paddingHorizontal: scale(24)}}>
            <Button
              text="Continue"
              iconName="arrowRight"
              onPress={getRate}
              isLoading={loading}
              disabled={amount < 1 || loading}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
