import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {onboarding, text} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Funding from '../../components/Funding/Funding';
import Nav from '../../components/HeaderNav/Nav';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';

export default function ReceiveAmount({navigation}) {
  const [amount, setAmount] = useState(null);
  return (
    <View style={onboarding.container}>
      <View style={{backgroundColor: '#F7C57C', flex: 1}}>
        <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#FFF'}}>
          <View
            style={{
              ...onboarding.inputContainer,
              paddingHorizontal: scale(0),
              flex: 1,
            }}>
            <Nav
              title="Send money"
              description="How much will they receive?"
              onClose={navigation.goBack}
            />
            <View style={{backgroundColor: '#FAF2EB', padding: scale(24)}}>
              <View
                style={{
                  backgroundColor: '#F9E1B8',
                  padding: scale(5),
                  borderRadius: scale(16),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(36),
                    fontFamily: text.helonik,
                    color: '#0E093F',
                  }}>
                  ₦189,982,382.98
                </Text>
                <IconGen tag="edit" />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: scale(24),
                paddingVertical: scale(16),
                borderBottomColor: '#FAF2EB',
                borderBottomWidth: scale(1),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(18),
                  lineHeight: moderateScale(26),
                  fontFamily: text.helonik,
                  color: '#0E093F',
                }}>
                You’re sending: $9,150,455.99{' '}
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    lineHeight: moderateScale(20),
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'dotted',
                    textDecorationColor: '#6939FF',
                    fontFamily: text.helonik,
                  }}>
                  EDIT
                </Text>
              </Text>
              <IconGen tag="info" color="#6939FF" />
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer
        onFooterPressed={() => {}}
        btnText="Continue"
        btnIcon="arrowRight"
        footerText="Go back"
        footerIcon="arrowLeft"
      />
    </View>
  );
}
