import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {footer, onboarding, text} from '../../../../../assets/styles/styles';
import Button from '../../../../components/Button/Button';
import {IconGen} from '../../../../components/IconGenerator/IconGenerator';
import FileUpload from '../../../../components/Input/FileUpload';
import Input from '../../../../components/Input/Input';
import {moderateScale, scale} from '../../../../lib/utils/scaleUtils';

export default function VerifyAddress({navigation, route}) {
  const initialState = route.params.payload;
  const [state, setState] = useState(initialState);
  const {Address, UtilityBill} = state;

  const handleProceed = () => {
    navigation.navigate('FaceCapture', {payload: state});
  };

  return (
    <View style={{flex: 1}}>
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
              <Text style={onboarding.personalInfo}>Verify Address</Text>
              <Input
                label="Address"
                placehoder="Your residential address"
                value={Address}
                onChangeText={Address => setState(prev => ({...prev, Address}))}
                showError={Address && Address?.length < 5}
                error="Enter a valid address"
              />
              <FileUpload
                info="Tap to upload .jpg/.png"
                icon="upload"
                label="Upload Proof of Address (Utility Bill)"
                setDocument={doc => {
                  setState(prev => ({...prev, UtilityBill: doc}));
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={{...footer.container, backgroundColor: '#FAF2EB'}}>
        <Button
          text="Save & Continue"
          iconName="arrowRight"
          onPress={handleProceed}
          isLoading={false}
          disabled={!UtilityBill || Address?.length < 5}
          info="2/3"
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: scale(28),
            alignItems: 'center',
          }}>
          <IconGen tag="arrowLeft" />
          <Text
            style={{
              marginLeft: scale(8),
              color: '#0E093F',
              fontFamily: text.helonikBold,
              fontSize: moderateScale(16),
            }}>
            Go back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
