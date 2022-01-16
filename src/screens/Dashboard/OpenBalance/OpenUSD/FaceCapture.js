import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  complete,
  footer,
  onboarding,
  text,
} from '../../../../../assets/styles/styles';
import BottomModal from '../../../../components/BottomModal/BottomModal';
import Button from '../../../../components/Button/Button';
import {IconGen} from '../../../../components/IconGenerator/IconGenerator';
import FileUpload from '../../../../components/Input/FileUpload';
import {apiRequest} from '../../../../lib/api/api';
import {createBalanceUrl} from '../../../../lib/api/url';
import {getReversedFormattedDate} from '../../../../lib/utils/dateUtils';
import Toast from 'react-native-simple-toast';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../../../lib/utils/scaleUtils';
import VerifyingDocuments from '../components/modals/VerifyingDocuments';

export default function FaceCapture({navigation, route}) {
  const initialState = route.params.payload;
  const [state, setState] = useState(initialState);
  const [displayModal, setDisplayModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    IdentityNumber,
    PassportNumber,
    PassportIssueDate,
    PassportExpiryDate,
    PassportImage,
    Currency,
    Selfie,
    Address,
    UtilityBill,
  } = state;

  const createBalance = () => {
    setLoading(true);
    const fd = new FormData();
    fd.append('Currency', Currency);
    fd.append('IdentityNumber', IdentityNumber);
    fd.append('PassportNumber', PassportNumber);
    fd.append('PassportImage', PassportImage);
    fd.append('Selfie', Selfie);
    fd.append('Address', Address);
    fd.append('UtilityBill', UtilityBill);
    fd.append('PassportIssueDate', getReversedFormattedDate(PassportIssueDate));
    fd.append(
      'PassportExpiryDate',
      getReversedFormattedDate(PassportExpiryDate),
    );
    apiRequest(createBalanceUrl, 'post', fd, {}, 'multipart/form-data')
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        setDisplayModal(false);
        console.log(e?.response?.data)
        Toast.show(e?.response?.data?.message || e?.message, Toast.LONG);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={onboarding.container}>
      <View style={{flex: 1}}>
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
              <Text style={onboarding.personalInfo}>Face Capture</Text>
              <Text style={{...complete.description}}>
                You’ll need to grant temporary access to your device camera.
              </Text>
              <Text style={{...complete.description, marginTop: scale(24)}}>
                To get the best quality, make sure you are in a well-lit
                environment, your face is in the frame and clearly visible.{' '}
              </Text>
              <FileUpload
                info="Tap to launch camera"
                icon="upload"
                label="Tap to launch camera"
                type="camera"
                setDocument={doc => {
                  setState(prev => ({...prev, Selfie: doc}));
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
          onPress={() => {
            setDisplayModal(true);
            createBalance();
          }}
          isLoading={false}
          disabled={!Selfie}
          info="3/3"
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
      <BottomModal
        isModalOpen={displayModal}
        topLine={false}
        showCloseIcon={false}
        closeModal={() => setDisplayModal(false)}
        containerStyle={{
          backgroundColor: '#fff',
          borderTopLeftRadius: scale(16),
          borderTopRightRadius: scale(16),
          minHeight: verticalScale(798),
        }}>
        <VerifyingDocuments
          onPress={() => {
            setDisplayModal(false);
            navigation.navigate('Dashboard');
          }}
          loading={loading}
        />
      </BottomModal>
    </View>
  );
}
