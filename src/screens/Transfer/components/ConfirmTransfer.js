import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import BottomModal from '../../../components/BottomModal/BottomModal';
import {IconGen} from '../../../components/IconGenerator/IconGenerator';
import {scale, moderateScale} from '../../../lib/utils/scaleUtils';
import {text} from '../../../../assets/styles/styles';
import FundingText from '../../../components/Funding/FundingText';
import Details from '../../../components/TransactionDetails/details';
import Footer from '../../../components/Footer/Footer';
import SetPin from './SetPin';

export default function ConfirmTransfer({isModalOpen, closeModal, data}) {
  const onboarding = '';
  const exists = false;
  const [showSetPinArea, setShowSetPinArea] = useState(false);
  return (
    <BottomModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      containerStyle={{backgroundColor: '#fff'}}
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

            <View style={{alignItems: 'center', marginTop: scale(16)}}>
              <Text>
                <IconGen tag="arrowInclinedTopRight" />
              </Text>
              <Text
                style={{
                  marginTop: scale(8),
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
              <FundingText amount="9150500" hideBorder={true} />
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
                    {data?.first_name} {data?.last_name}
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
                    {data?.email_address}
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
                amountToPay={data?.amountToPay}
                amountToReceive={data?.amountToRecieve}
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
          closeModal = {() => {
              setShowSetPinArea(false)
          }}
      />
    </BottomModal>
  );
}
