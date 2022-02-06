import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BottomModal from '../../../components/BottomModal/BottomModal';
import {IconGen} from '../../../components/IconGenerator/IconGenerator';
import {scale, moderateScale} from '../../../lib/utils/scaleUtils';
import {text} from '../../../../assets/styles/styles';
import FundingText from '../../../components/Funding/FundingText';
import Details from '../../../components/TransactionDetails/details';
import Footer from '../../../components/Footer/Footer';
import SetPin from './SetPin';
import {apiRequest} from '../../../lib/api/api';
import {sendMoneyUrl} from '../../../lib/api/url';
import SimpleToast from 'react-native-simple-toast';
import StatusModal from '../../../components/BottomModal/StatusModal';

export default function ConfirmTransfer({
  isModalOpen,
  closeModal,
  data,
  selected,
}) {
  const onboarding = '';
  const navigation = useNavigation();
  const exists = false;
  const [loading, setLoading] = useState(false);
  const [showSetPinArea, setShowSetPinArea] = useState(false);
  const [successModal, showSuccessModal] = useState(false);
  const handleTransfer = pin => {
    setLoading(true);
    const payload = {
      narration: '',
      amount: data.amount,
      pin,
      currency: data.rate.to_currency,
      beneficiary_id: data.beneficiaries[selected].id,
      customer_account_id: data.beneficiaries[selected].customer_id,
    };
    apiRequest(sendMoneyUrl, 'post', payload)
      .then(response => {
        showSuccessModal(true);
      })
      .catch(e => {
        SimpleToast.show(
          e.response?.data?.message || e.message,
          SimpleToast.LONG,
        );
      })
      .finally(() => {
        setLoading(false);
        closeModal();
        setShowSetPinArea(false);
      });
  };
  const name = data?.beneficiaries[selected]?.account_name
    ? data?.beneficiaries[selected]?.account_name
    : `${data?.beneficiaries[selected]?.first_name} ${data?.beneficiaries[selected]?.last_name}`;
  return (
    <BottomModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      containerStyle={{backgroundColor: '#fff', paddingTop: scale(10)}}
      showCloseIcon={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: scale(0),
          }}>
          <View
            style={{
              alignItems: 'flex-end',
              paddingRight: scale(16),
            }}>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                paddingLeft: scale(20),
              }}>
              <IconGen tag="cancel" color="#0E093F" onPress={closeModal} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: scale(24),
            }}>
            <Text
              style={[
                onboarding.personalInfo,
                {
                  fontSize: moderateScale(24),
                  lineHeight: moderateScale(28),
                  fontFamily: text.helonikBold,
                  color: '#0E093F',
                },
              ]}>
              Confirm transfer details
            </Text>

            <View style={{alignItems: 'center', marginTop: scale(20)}}>
              <IconGen tag="arrowInclinedTopRight" />
              <Text
                style={{
                  marginTop: scale(16),
                  fontFamily: text.helonik,
                  backgroundColor: '#F9E1B8',
                  paddingVertical: scale(8),
                  paddingHorizontal: scale(12),
                  color: '#0E093F',
                  borderRadius: scale(20),
                }}>
                You are transferring
              </Text>
            </View>
            <View style={{marginTop: scale(8)}}>
              <FundingText
                amount={`${data?.amount}`
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                hideBorder={true}
              />
            </View>

            <View
              style={{
                marginTop: scale(18),
                marginBottom: scale(24),
                backgroundColor: '#F8F5FF',
                borderRadius: scale(12),
                padding: scale(12),
              }}>
              <Text
                style={{
                  marginBottom: scale(12),
                  color: '#0E093F',
                  fontFamily: text.helonik,
                }}>
                RECIPIENT
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {data?.avatar ? (
                  <Image
                    source={require('../../../../assets/images/empty.png')}
                    style={{width: scale(48), height: scale(48)}}
                  />
                ) : (
                  <IconGen tag="avatar" />
                )}
                <View
                  style={{
                    marginLeft: scale(12),
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: moderateScale(20),
                      fontFamily: text.helonikBold,
                      letterSpacing: moderateScale(0.1),
                      color: '#0E093F',
                    }}>
                    {name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: text.helonik,
                      letterSpacing: moderateScale(0.2),
                      color: '#0E093F',
                    }}>
                    {
                      data?.beneficiaries?.[selected]
                        ?.beneficiary_customer_email
                    }
                  </Text>
                </View>
              </View>
              <View style={{marginLeft: scale(4), marginTop: scale(4)}}>
                <IconGen tag={exists ? 'gen' : 'nonGen'} />
              </View>
            </View>

            <View>
              <Details
                processingFee={data?.processingFee}
                estimatedTime={data?.estimatedTime}
                amountToPay={
                  `${data?.amount}`
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                  ` ${data?.rate?.from_currency}`
                }
                amountToReceive={
                  `${data?.rate?.amount}`
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                  ` ${data?.rate?.to_currency}`
                }
                arrival
              />
            </View>
          </View>
          <View style={{marginTop: scale(40)}}>
            <Footer
              btnText="Continue and send money"
              btnIcon="arrowRight"
              onPress={() => {
                setShowSetPinArea(true);
              }}
            />
          </View>
        </View>
      </ScrollView>
      <SetPin
        isModalOpen={showSetPinArea}
        loading={loading}
        handleTransfer={handleTransfer}
        closeModal={() => {
          setShowSetPinArea(false);
        }}
      />
      <StatusModal
        displayModal={successModal}
        setDisplayModal={showSuccessModal}
        dismissable={false}
        loading={loading}
        title={`Money Sent.`}
        description={
          <Text>
            You have successfully sent{' '}
            <Text style={{fontFamily: text.helonikBold}}>
              ${data?.amount + ''.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>{' '}
            to <Text style={{fontFamily: text.helonikBold}}>{name}</Text>. The
            money should arrive in the recipient’s account shortly.
          </Text>
        }
        btnText="Ok, thanks"
        onPress={() => {
          navigation.navigate('Dashboard');
        }}
        icon="arrowRight"
      />
    </BottomModal>
  );
}
