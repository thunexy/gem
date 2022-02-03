import React, {useState} from 'react';
import {View} from 'react-native';
import {onboarding} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import Funding from '../../components/Funding/Funding';
import Nav from '../../components/HeaderNav/Nav';
import {scale} from '../../lib/utils/scaleUtils';

export default function TransferAmount({navigation}) {
  const [amount, setAmount] = useState(null);
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
              onPress={() => navigation.navigate('ReceiveAmount', {amount})}
              isLoading={false}
              disabled={amount < 1}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
