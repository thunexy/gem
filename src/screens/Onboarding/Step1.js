import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInputMask} from 'react-native-masked-text';
import Picker from 'react-native-picker-select';
import {useDispatch} from 'react-redux';
import {footer, onboarding, text} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import Input from '../../components/Input/Input';
import {AppContext} from '../../controllers/AppContext';
import {apiRequest} from '../../lib/api/api';
import {countriesUrl, statesUrl, updateProfileUrl} from '../../lib/api/url';
import {getReversedFormattedDate} from '../../lib/utils/dateUtils';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {updateStep} from '../Auth/actions/authActions';
import Toast from 'react-native-simple-toast';
import DateInput from '../../components/Input/DateInput';

export default function Step1({navigation}) {
  const initialState = {
    date_of_birth: null,
    address: null,
    country_id: null,
    state_id: null,
    gender: 'Male',
  };
  const [state, setState] = useState(initialState);
  const {countries, states, dispatch: cDispatch} = useContext(AppContext);
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {date_of_birth, address, country_id, state_id, gender} = state;
  const [loading, setLoading] = useState(false);

  function handleProfileUpdate() {
    setLoading(true);
    apiRequest(updateProfileUrl, 'post', {
      ...state,
      date_of_birth: getReversedFormattedDate(date_of_birth), //TODO: change for ios
    })
      .then(response => {
        dispatch(updateStep({profile_completed: true}));
        navigation.navigate('Step2');
      })
      .catch(e => {
        Toast.show(e.response?.data?.message || e.message, Toast.LONG);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!countries.length) {
      apiRequest(countriesUrl, 'get')
        .then(res => {
          cDispatch({countries: res.data});
        })
        .catch(e => console.log(e.message));
    } else {
      fetchStates(country_id);
    }
  }, []);

  const fetchStates = id => {
    apiRequest(`${statesUrl}/${id}`, 'get')
      .then(res => {
        cDispatch({states: res.data});
      })
      .catch(e => console.log(e.response.data));
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
          <Text style={onboarding.title}>Complete your profile</Text>
          <Text style={onboarding.description}>
            Just a few items remaining before{'\n'}you get full access
          </Text>
        </View>
        <View style={{backgroundColor: '#6939FF'}}>
          <View style={onboarding.inputContainer}>
            <Text style={onboarding.personalInfo}>Personal Information</Text>
            <View style={[{position: 'relative'}]}>
              <DateInput
                modal
                label="Date of birth (DD-MM-YYYY)"
                mode="date"
                value={state.date_of_birth}
                onConfirm={date =>
                  setState(prev => ({...prev, date_of_birth: date}))
                }
                error="Date of birth cannot be in the future"
                showError={state.date_of_birth > new Date().getTime()}
              />
            </View>
            <Input
              label="Residential Address"
              placehoder="Apartment, street name, etc."
              value={address}
              onChangeText={address => setState(prev => ({...prev, address}))}
            />

            <View>
              <Text style={onboarding.label}>
                Country<Text style={onboarding.asterisks}>*</Text>
              </Text>
              <Picker
                useNativeAndroidPickerStyle={false}
                placeholder="Select your country"
                items={countries.map(item => ({
                  label: item?.name,
                  value: item?.id,
                }))}
                value={country_id}
                onValueChange={country_id => {
                  setState(prev => ({...prev, country_id}));
                  cDispatch({states: []});
                  fetchStates(country_id);
                }}
                children={
                  <View>
                    <View
                      style={[
                        onboarding.input,
                        {flexDirection: 'row', justifyContent: 'space-between'},
                      ]}>
                      <Text style={onboarding.inputText}>
                        {
                          countries?.find(item => item.id === country_id ?? 1)
                            ?.name
                        }
                      </Text>
                      <IconGen tag="ChevronRight" />
                    </View>
                    <View style={onboarding.line} />
                  </View>
                }
              />
            </View>
            <View>
              <Text style={onboarding.label}>
                State<Text style={onboarding.asterisks}>*</Text>
              </Text>
              <Picker
                useNativeAndroidPickerStyle={false}
                placeholder="Select your state"
                items={states.map(item => ({
                  label: item?.name,
                  value: item?.id,
                }))}
                value={state_id}
                onValueChange={state_id => {
                  setState(prev => ({...prev, state_id}));
                }}
                children={
                  <View>
                    <View
                      style={[
                        onboarding.input,
                        {flexDirection: 'row', justifyContent: 'space-between'},
                      ]}>
                      <Text style={onboarding.inputText}>
                        {states?.find(item => item.id === state_id)?.name}
                      </Text>
                      <IconGen tag="ChevronRight" />
                    </View>
                    <View style={onboarding.line} />
                  </View>
                }
              />
            </View>
            <View>
              <Text style={onboarding.label}>
                Gender<Text style={onboarding.asterisks}>*</Text>
              </Text>
              <Picker
                useNativeAndroidPickerStyle={false}
                placeholder="Select your gender"
                items={['Male', 'Female'].map(item => ({
                  label: item,
                  value: item,
                }))}
                value={gender}
                onValueChange={gender => {
                  setState(prev => ({...prev, gender}));
                }}
                children={
                  <View>
                    <View
                      style={[
                        onboarding.input,
                        {flexDirection: 'row', justifyContent: 'space-between'},
                      ]}>
                      <Text style={onboarding.inputText}>{gender}</Text>
                      <IconGen tag="ChevronRight" />
                    </View>
                    <View style={onboarding.line} />
                  </View>
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          ...footer.container,
          backgroundColor: '#fff',
          position: 'relative',
        }}>
        <Button
          text="Save & Continue"
          iconName="arrowRight"
          info={'1/3'}
          onPress={handleProfileUpdate}
          otherStyles={{marginTop: scale(32)}}
          isLoading={loading}
          disabled={
            !address ||
            new Date().getFullYear - new Date(date_of_birth).getFullYear() <
              18 ||
            !country_id ||
            !state_id ||
            !gender
          }
        />
      </View>
    </View>
  );
}
