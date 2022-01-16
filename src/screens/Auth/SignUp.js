import Axios from 'axios';
import React, {useState} from 'react';
import {Image, Keyboard, ScrollView, StyleSheet, Text, View} from 'react-native';
import Picker from 'react-native-picker-select';
import validator from 'validator';
import countries from '../../../assets/data/countries.json';
import flags from '../../../assets/images/flags/flags';
import {footer, reg, text} from '../../../assets/styles/styles';
import BottomModal from '../../components/BottomModal/BottomModal';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import Input from '../../components/Input/Input';
import InputInfo from '../../components/InputInfo/InputInfo';
import {signupUrl} from '../../lib/api/url';
import {moderateScale, scale, verticalScale} from '../../lib/utils/scaleUtils';
import Toast from 'react-native-simple-toast';

export default function SignUp({navigation}) {
  const [showTerms, setTerms] = useState(false);
  const [showPolicy, setPolicy] = useState(false);
  const [countryCode, setCountryCode] = useState('+234');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    first_name: null,
    last_name: null,
    email_address: null,
    mobile_number: null,
    password: null,
  };
  const [state, setState] = useState({
    ...initialState,
    country_code: '',
  });
  let regExpression = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})(?=.*[!@#$%^&*])',
  );
  const {
    first_name,
    last_name,
    email_address,
    mobile_number,
    password,
    country_code,
  } = state;
  function validateInputs() {
    let err = {
      first_name: '',
      last_name: '',
      email_address: '',
      mobile_number: '',
      password: '',
    };
    // let isError = false;
    // // if (first_name.length < 3) {
    // //   isError = true;
    // //   err.first_name = 'First name can’t be empty, please input a name.';
    // // }
    // // if (last_name.length < 3) {
    // //   isError = true;
    // //   err.last_name = 'Last name can’t be empty, please input a name.';
    // // }
    // // if (!validator.isEmail(email_address)) {
    // //   isError = true;
    // //   err.email_address =
    // //     'Email address can’t be empty, please input valid email.';
    // // }
    // // if (!validator.isMobilePhone(mobile_number)) {
    // //   isError = true;
    // //   err.mobile_number =
    // //     'Phone number can’t be empty, please input valid number.';
    // // }
    // // if (!password.match(regExpression)) {
    // //   isError = true;
    // //   err.password =
    // //     'Password can’t be empty, please input a password of your choice.';
    // // }
    // setError(err);
    // return isError;
  }

  function handleSignup() {
    // if (validateInputs()) return;
    setIsLoading(true);
    Keyboard.dismiss();
    Axios.post(signupUrl, {
      type: 'mobile',
      signup: {
        ...state,
        country_code: countries.filter(
          item => item.calling_code === countryCode,
        )[0]?.code,
        mobile_number: countryCode + '' + +mobile_number,
        email_address: email_address,
      },
    })
      .then(response => {
        navigation.navigate('Otp', {
          response: response.data,
          mobile_number,
          email_address,
          countryCode,
        });
        setState(prev => ({...prev, initialState}));
      })
      .catch(e => {
        Toast.show(e.response?.data?.message || e.message, Toast.LONG);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleState(key, value) {
    setState(prev => ({...prev, [key]: value}));
  }
  return (
    <View style={{flex: 1}}>
      <View style={reg.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={reg.headerWrapper}>
            <IconGen tag="logo" />
            <Text style={reg.title}>Bank with Gen</Text>
            <Text style={reg.description}>
              Create an account with us in less than 5 minutes.
            </Text>
          </View>
          <View style={reg.inputContainer}>
            <Input
              label="First name"
              value={state.first_name}
              onChangeText={text => {
                handleState('first_name', text);
              }}
              error={'First name can’t be empty, please input your first name.'}
              showError={
                state.first_name !== null && state.first_name.length < 3
              }
              placeHolder="E.g; Chidimma"
            />
            <Input
              label="Last name"
              value={state.last_name}
              onChangeText={text => handleState('last_name', text)}
              error={'Last name can’t be empty, please input your last name.'}
              showError={state.last_name !== null && state.last_name.length < 3}
              placeHolder="E.g; Tsego"
            />
            <Input
              label="Email address"
              keyboardType="email-address"
              value={state.email_address}
              onChangeText={text => handleState('email_address', text)}
              error={'Email address can’t be empty, please input valid email.'}
              showError={
                email_address !== null && !validator.isEmail(email_address)
              }
              placeHolder="E.g; name@gmail.com"
            />
            <Text
              style={{
                color: '#0E093F',
                fontSize: moderateScale(14),
                lineHeight: moderateScale(18),
                marginBottom: scale(8),
                marginTop: scale(30),
              }}>
              Phone number
              <Text
                style={{
                  color: '#F23C3C',
                  fontSize: moderateScale(14),
                  fontFamily: text.helonik,
                }}>
                *
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: scale(1),
                borderColor:
                  mobile_number !== null &&
                  mobile_number.length < 10 &&
                  !validator.isMobilePhone(mobile_number)
                    ? '#F23C3C'
                    : '#0E093F',
                borderRadius: scale(8),
              }}>
              <View
                style={{
                  backgroundColor: '#F8F5FF',
                  borderTopLeftRadius: scale(8),
                  borderBottomLeftRadius: scale(8),
                  paddingHorizontal: scale(16),
                }}>
                <Picker
                  style={{
                    fontSize: moderateScale(16),
                  }}
                  useNativeAndroidPickerStyle={false}
                  value={countryCode}
                  onValueChange={setCountryCode}
                  items={countries.map(item => ({
                    label: item?.name,
                    value: item?.calling_code,
                  }))}
                  children={
                    <View style={{flexDirection: 'row', marginTop: scale(16)}}>
                      <Image
                        source={
                          flags[
                            countries
                              .filter(
                                item => item.calling_code === countryCode,
                              )[0]
                              ?.name.toLowerCase()
                          ]
                        }
                        style={{
                          width: scale(26),
                          height: scale(18),
                        }}
                      />
                      <Text
                        style={{
                          fontSize: moderateScale(14),
                          marginHorizontal: scale(4),
                          color: '#0E093F',
                        }}>
                        {countryCode}
                      </Text>
                      <IconGen
                        tag="ChevronRight"
                        colour={
                          mobile_number !== null &&
                          !validator.isMobilePhone(mobile_number)
                            ? '#F23C3C'
                            : '#0E093F'
                        }
                      />
                    </View>
                  }
                />
              </View>
              <Input
                placeHolder="xxx-xxx-xxxx"
                type="custom"
                inputStyle={{borderWidth: 0}}
                keyboardType="phone-pad"
                value={state.mobile_number}
                error={
                  mobile_number !== null &&
                  !validator.isMobilePhone(mobile_number)
                }
                onChangeText={text => {
                  handleState('mobile_number', text);
                }}
                style={{
                  flex: 1,
                }}
              />
            </View>
            {mobile_number !== null &&
            !validator.isMobilePhone(mobile_number) ? (
              <View style={style.errorContainer}>
                <IconGen tag="error" />
                <Text style={style.error}>
                  Phone number can’t be empty, please input valid number.
                </Text>
              </View>
            ) : null}
            <Input
              label="Password"
              placeHolder="••••••••••"
              value={state.password}
              onChangeText={text => handleState('password', text)}
              control={showPassword ? 'HIDE' : 'SHOW'}
              onControl={() => setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
              onSubmitEditing={handleSignup}
            />

            {password ? (
              <InputInfo
                numExp={new RegExp('^(?=.*[0-9])')}
                length={new RegExp('^(?=.{8,})')}
                special={new RegExp('^(?=.*[!@#$%^&*])')}
                password={password}
              />
            ) : null}
            <Text style={reg.privacy}>
              By clicking continue, you agree to Genbank’s{' '}
              <Text style={reg.underline} onPress={() => setPolicy(true)}>
                Privacy Policy
              </Text>{' '}
              and{' '}
              <Text style={reg.underline} onPress={() => setTerms(true)}>
                Terms & Conditions.
              </Text>
            </Text>
          </View>
        </ScrollView>
        <BottomModal
          isModalOpen={showTerms || showPolicy}
          containerStyle={{height: verticalScale(700)}}
          showCloseIcon={false}
          closeModal={() => {
            setTerms(false);
            setPolicy(false);
          }}>
          {/* <View style={reg.termsContainer}>
          <View style={reg.termsHeader}></View> */}
          <View style={reg.termsContent}>
            <IconGen
              tag="close"
              style={{
                position: 'absolute',
                right: scale(0),
                padding: scale(16),
                backgroundColor: '#F8F5FF',
                borderTopRightRadius: scale(12),
                borderBottomLeftRadius: scale(12),
              }}
              onPress={() => {
                setPolicy(false);
                setTerms(false);
              }}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: scale(24),
              }}>
              <Text style={reg.termsTitle}>
                {showPolicy && 'Privacy Policies'}
                {showTerms && 'Terms \nand Conditions'}
              </Text>
              <Text style={reg.termsDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui
                nulla urna vulputate dui. Volutpat quis ut nunc, tellus, varius
                sed odio. Viverra velit commodo venenatis semper fames egestas
                mauris. Faucibus condimentum faucibus elit arcu viverra interdum
                risus ac dolor. Nibh sed sed in in mi tempus a. Ut tellus in.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui
                nulla urna vulputate dui. Volutpat quis ut nunc, tellus, varius
                sed odio. Viverra velit commodo venenatis semper fames egestas
                mauris. Faucibus condimentum faucibus elit arcu viverra interdum
                risus ac dolor. Nibh sed sed in in mi tempus a. Ut tellus in.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui
                nulla urna vulputate dui. Volutpat quis ut nunc, tellus, varius
                sed odio. Viverra velit commodo venenatis semper fames egestas
                mauris. Faucibus condimentum faucibus elit arcu viverra interdum
                risus ac dolor. Nibh sed sed in in mi tempus a. Ut tellus in.
              </Text>
            </ScrollView>
          </View>
          {/* </View> */}
        </BottomModal>
      </View>
      <View
        style={{
          ...footer.container,
          backgroundColor: '#fff',
          position: 'relative',
        }}>
        <Button
          text="Continue"
          info="1/2"
          isLoading={isLoading}
          disabled={
            isLoading ||
            state.first_name?.length < 3 ||
            state.last_name?.length < 3 ||
            !validator.isEmail(email_address ?? '') ||
            !validator.isMobilePhone(mobile_number ?? '') ||
            !password?.match(regExpression)
          }
          iconName="arrowRight"
          onPress={handleSignup}
        />

        <Text
          style={reg.extraText}
          onPress={() => navigation.navigate('Login')}>
          Already have an account? <Text style={reg.extraTextBold}>Log in</Text>
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    marginTop: scale(8),
  },
  error: {
    color: '#F23C3C',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
    marginLeft: scale(4),
  },
});
