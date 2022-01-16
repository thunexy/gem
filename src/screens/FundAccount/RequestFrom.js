import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import validator from 'validator';
import {footer, onboarding, text} from '../../../assets/styles/styles';
import BottomModal from '../../components/BottomModal/BottomModal';
import StatusModal from '../../components/BottomModal/StatusModal';
import Button from '../../components/Button/Button';
import FundingText from '../../components/Funding/FundingText';
import Nav from '../../components/HeaderNav/Nav';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import Input from '../../components/Input/Input';
import {apiRequest} from '../../lib/api/api';
import {requestMoneyUrl, resolveCustomerUrl} from '../../lib/api/url';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';

export default function RequestFrom({navigation, route}) {
  const initialState = {
    email_address: '',
    first_name: '',
    last_name: '',
  };
  const [state, setState] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [confirmRequest, setConfirmRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exists, setExistence] = useState(null);

  const resolveCustomer = () => {
    apiRequest(resolveCustomerUrl, 'post', {
      identifier: state.email_address,
    })
      .then(res => {
        setState(res.data);
        setExistence(true);
      })
      .catch(e => {
        Toast.show(e.response.data.message, Toast.LONG);
        setExistence(false);
      });
  };
  const handleRequest = () => {
    const {email_address, first_name, last_name} = state;
    setLoading(true);
    apiRequest(requestMoneyUrl, 'post', {
      email_address,
      currency: 'USD',
      first_name,
      last_name,
      naration: '',
      amount: +route.params?.amount,
      is_gen_customer: !!exists,
    })
      .then(res => {
        setDisplayModal(true);
      })
      .catch(e => {
        Toast.show(e.response.data.message, Toast.LONG);
      })
      .finally(() => {
        setLoading(false);
        setConfirmRequest(false);
      });
  };

  return (
    <View style={onboarding.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: '#DCF995'}}>
          <View
            style={{
              ...onboarding.inputContainer,
              flex: 1,
              paddingHorizontal: scale(0),
            }}>
            <Nav
              title="Fund your Account"
              description="Request money from friends, family, and colleaugues. "
              onClose={navigation.goBack}
            />
            <View
              style={{
                paddingHorizontal: scale(24),
              }}>
              <Input
                label="Email address"
                placeHolder="E.g; name@gmail.com"
                value={state.email_address}
                keyboardType="email-address"
                onChangeText={email_address => {
                  setState(prev => ({...prev, email_address}));
                  setExistence(null);
                  setSelected(false);
                  setState(prev => ({...initialState, email_address}));
                }}
                onBlur={() => {
                  validator.isEmail(state.email_address) && resolveCustomer();
                }}
                error="Please enter a valid email address"
                showError={
                  state.email_address && !validator.isEmail(state.email_address)
                }
              />
              {exists && (
                <View
                  style={{
                    borderWidth: scale(1),
                    borderRadius: scale(8),
                    padding: scale(16),
                    borderColor: '#C3C1CF',
                    marginTop: scale(20),
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      fontFamily: text.helonik,
                      letterSpacing: moderateScale(0.2),
                      color: '#4A476F',
                      marginBottom: scale(20),
                    }}>
                    Is this the person you want to send a request to?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        state?.avatar
                          ? {
                              uri: state?.avatar,
                            }
                          : require('../../../assets/images/empty.png')
                      }
                      style={{width: scale(40), height: scale(40)}}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: moderateScale(16),
                        fontFamily: text.helonikBold,
                        letterSpacing: moderateScale(0.1),
                        color: '#0E093F',
                        flex: 1,
                        paddingHorizontal: scale(16),
                      }}>
                      {state?.first_name} {state?.last_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontFamily: text.helonik,
                        letterSpacing: moderateScale(0.2),
                        paddingHorizontal: scale(14),
                        paddingVertical: scale(8),
                        color: selected === 'yes' ? '#fff' : '#6939FF',
                        backgroundColor:
                          selected === 'yes' ? '#6939FF' : '#fff',
                        borderColor: '#6939FF',
                        borderRadius: scale(32),
                        borderWidth: scale(1),
                        marginRight: scale(8),
                      }}
                      onPress={() => setSelected('yes')}>
                      Yes
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontFamily: text.helonik,
                        letterSpacing: moderateScale(0.2),
                        paddingHorizontal: scale(14),
                        paddingVertical: scale(8),
                        color: selected === 'no' ? '#fff' : '#0E093F',
                        backgroundColor: selected === 'no' ? '#0E093F' : '#fff',
                        borderColor: '#0E093F',
                        borderRadius: scale(32),
                        borderWidth: scale(1),
                      }}
                      onPress={() => {
                        setExistence(null);
                        setSelected('no');
                      }}>
                      No
                    </Text>
                  </View>
                </View>
              )}
              {exists === false ? (
                <>
                  <Input
                    label="First name"
                    value={state.first_name}
                    onChangeText={first_name =>
                      setState(prev => ({...prev, first_name}))
                    }
                    error="Please enter a valid first name"
                    showError={state.first_name && state.first_name.length < 2}
                  />
                  <Input
                    label="Last name"
                    value={state.last_name}
                    onChangeText={last_name =>
                      setState(prev => ({...prev, last_name}))
                    }
                    error="Please enter a valid last name"
                    showError={state.last_name && state.last_name.length < 2}
                  />
                </>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{...footer.container, backgroundColor: '#F8F5FF'}}>
        <Button
          text="Request Money"
          iconName="arrowRight"
          onPress={() => {
            setConfirmRequest(true);
          }}
          isLoading={false}
          disabled={
            (exists && (selected === 'no' || !selected)) ||
            (exists === false &&
              (!state.first_name ||
                !state.last_name ||
                !state.email_address)) ||
            exists === null
          }
        />
      </View>
      <StatusModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        loading={loading}
        title={`Request Sent`}
        description={`Your request to ${state.first_name} ${state.last_name} at ${state.email_address}`}
        btnText="Great, thanks"
        topLine={true}
        onPress={() => {
          setDisplayModal(false);
          navigation.navigate('Dashboard');
        }}
        icon="arrowRight"
      />
      <BottomModal
        isModalOpen={confirmRequest}
        closeModal={() => setConfirmRequest(false)}
        topLine={true}
        showCloseIcon={false}
        containerStyle={{
          backgroundColor: '#fff',
          paddingTop: scale(8),
        }}>
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#0E093F',
                fontFamily: text.helonik,
                fontSize: moderateScale(14),
                letterSpacing: moderateScale(0.2),
                width: moderateScale(149),
                backgroundColor: '#F9E1B8',
                paddingHorizontal: scale(12),
                paddingVertical: scale(8),
                borderRadius: scale(20),
                marginTop: scale(70),
                marginBottom: scale(16),
              }}>
              You are requesting
            </Text>
          </View>
          <FundingText amount={route?.params?.amount} hideBorder />
          <View
            style={{
              marginTop: scale(60),
              borderColor: '#F4F4F6',
              borderTopWidth: scale(1.6),
            }}>
            <View
              style={{
                marginTop: scale(32),
                marginHorizontal: scale(24),
                marginBottom: scale(24),
                backgroundColor: '#F8F5FF',
                borderRadius: scale(12),
                padding: scale(12),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {state?.avatar ? (
                  <Image
                    source={require('../../../assets/images/empty.png')}
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
                    {state?.first_name} {state?.last_name}
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
                    {state?.email_address}
                  </Text>
                </View>
              </View>
              <View style={{marginLeft: scale(4), marginTop: scale(4)}}>
                <IconGen tag={exists ? 'gen' : 'nonGen'} />
              </View>
            </View>
          </View>
        </View>
        <View style={{...footer.container, backgroundColor: '#F8F5FF'}}>
          <Button
            text="Confirm request"
            iconName="arrowRight"
            onPress={() => handleRequest()}
            isLoading={loading}
          />
        </View>
      </BottomModal>
    </View>
  );
}
