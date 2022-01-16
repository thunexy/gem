import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {onboarding} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import Funding from '../../components/Funding/Funding';
import Nav from '../../components/HeaderNav/Nav';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';

export default function HowMuch({navigation}) {
  const [amount, setAmount] = useState(null);
  return (
    <View style={onboarding.container}>
      <View style={{backgroundColor: '#DCF995', flex: 1}}>
        <View
          style={{
            ...onboarding.inputContainer,
            paddingHorizontal: scale(0),
            flex: 1,
          }}>
          <Nav
            title="Fund your Account"
            description="How much do you want to fund?"
            onClose={navigation.goBack}
          />

          <Funding amount={amount} setAmount={setAmount} />
          <View style={{paddingHorizontal: scale(24)}}>
            <Button
              text="Continue"
              iconName="arrowRight"
              onPress={() => navigation.navigate('HowTo', {amount})}
              isLoading={false}
              disabled={amount < 1}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
