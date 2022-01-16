import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {footer, onboarding, text} from '../../../../../assets/styles/styles';
import Button from '../../../../components/Button/Button';
import {IconGen} from '../../../../components/IconGenerator/IconGenerator';
import DateInput from '../../../../components/Input/DateInput';
import FileUpload from '../../../../components/Input/FileUpload';
import Input from '../../../../components/Input/Input';
import {moderateScale, scale} from '../../../../lib/utils/scaleUtils';

export default function VerifyIdentity({navigation}) {
  const initialState = {
    Currency: 'USD',
    IdentityNumber: null,
    PassportNumber: null,
    PassportImage: null,
    Selfie: null,
    Address: null,
    UtilityBill: null,
    PassportIssueDate: new Date().getTime(),
    PassportExpiryDate: new Date().getTime(),
  };
  const [state, setState] = useState(initialState);
  const {
    IdentityNumber,
    PassportNumber,
    PassportIssueDate,
    PassportExpiryDate,
    PassportImage,
  } = state;

  const handleProceed = () => {
    navigation.navigate('VerifyAddress', {payload: state});
  };

  return (
    <View style={onboarding.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={onboarding.headerWrapper}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconGen tag="cancel" color="#fff" />
            <Text
              onPress={() => navigation.navigate('Dashboard')}
              style={{
                fontSize: moderateScale(19),
                fontFamily: text.helonik,
                marginLeft: scale(10),
                color: '#CFBEFF',
              }}>
              Cancel
            </Text>
          </View>
          <Text style={onboarding.title}>Open a Naira balance</Text>
          <Text style={onboarding.description}>
            You can fund, save, send, and receive naira with this account.
          </Text>
        </View>
        <View style={{backgroundColor: '#6939FF'}}>
          <View style={{...onboarding.inputContainer, flex: 1}}>
            <Text style={onboarding.personalInfo}>Verify Identity</Text>
            <Input
              label="NIN"
              placehoder="E.G; 123456789"
              value={IdentityNumber}
              keyboardType="number-pad"
              maxLength={11}
              onChangeText={IdentityNumber =>
                setState(prev => ({...prev, IdentityNumber}))
              }
              error="NIN must be a total of 11 digits"
              showError={IdentityNumber?.length < 11}
            />
            <Input
              label="International passport number"
              placehoder="E.G; 123456789"
              value={PassportNumber}
              onChangeText={PassportNumber => {
                setState(prev => ({
                  ...prev,
                  PassportNumber: PassportNumber.toUpperCase(),
                }));
              }}
              error="International passport must be 9 digits"
              showError={PassportNumber?.length < 9}
              maxLength={9}
            />
            <DateInput
              label="International passport issue date (DD-MM-YYYY)"
              value={PassportIssueDate}
              onConfirm={date =>
                setState(prev => ({...prev, PassportIssueDate: date}))
              }
              showError={PassportIssueDate > new Date().getTime()}
              error="Issued date cannot be in the future"
            />
            <DateInput
              label="International passport expiry date (DD-MM-YYYY)"
              value={PassportExpiryDate}
              onConfirm={PassportExpiryDate =>
                setState(prev => ({...prev, PassportExpiryDate}))
              }
              showError={
                PassportIssueDate > PassportExpiryDate + 2000000 ||
                PassportExpiryDate < new Date().getTime() - 2000000
              }
              error={
                PassportExpiryDate < new Date().getTime() - 2000000
                  ? 'Expiry date cannot be in the past'
                  : PassportIssueDate > PassportExpiryDate + 2000000
                  ? 'Issued date cannot be greater than expiry date'
                  : ''
              }
            />
            <FileUpload
              info="Tap to upload .jpg/.png"
              icon="upload"
              label="Upload International Passport"
              setDocument={doc => {
                setState(prev => ({...prev, PassportImage: doc}));
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{...footer.container, backgroundColor: '#FAF2EB'}}>
        <Button
          text="Proceed"
          iconName="arrowRight"
          onPress={handleProceed}
          isLoading={false}
          disabled={
            IdentityNumber?.length < 11 ||
            PassportNumber?.length !== 9 ||
            PassportIssueDate > new Date().getTime() ||
            PassportExpiryDate < new Date().getTime() ||
            PassportExpiryDate < PassportIssueDate ||
            !PassportImage
          }
          info="1/3"
        />
      </View>
    </View>
  );
}
