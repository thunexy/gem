import React, {useContext, useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {dashboard} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import {AppContext} from '../../controllers/AppContext';
import {apiRequest} from '../../lib/api/api';
import {
  fundRequestUrl,
  getUserDetailsUrl,
  wireTransferUrl,
} from '../../lib/api/url';
import {resetCache, updateProfile} from '../Auth/actions/authActions';
export function Dashboard({navigation}) {
  const {onboarding, customer} = useSelector(state => state.authentication);
  const dispatch = useDispatch();
  const {dispatch: cDispatch, fundRequests} = useContext(AppContext);
  const {steps, percent_completed} = onboarding || {};
  const {
    container,
    greetings,
    inactiveBtn,
    btnText,
    header,
    actions,
    progress,
    content,
    achieved,
    rem,
    progressText,
    completeProfile,
    background,
    title,
    empty,
    noAccount,
  } = dashboard;
  useEffect(() => {
    apiRequest(wireTransferUrl, 'get')
      .then(res => {
        cDispatch({account: res.data}); 
      })
      .catch(e => console.log(e.message));
    apiRequest(getUserDetailsUrl, 'get')
      .then(res => {
        dispatch(updateProfile(res));
      })
      .catch(e => {});
    apiRequest(`${fundRequestUrl}?Limit=20`, 'get')
      .then(res => {
        cDispatch({fundRequests: res?.items});
        // dispatch(updateProfile(res));
      })
      .catch(e => {});
  }, []);
  return (
    <View style={container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={header}>
          <Text style={greetings} numberOfLines={1} ellipsizeMode="tail">
            Hi, {customer?.first_name}
          </Text>
          <View style={actions}>
            <TouchableOpacity
              disabled={!fundRequests.length}
              onPress={() => {
                navigation.navigate('FundingRequest');
              }}>
              <IconGen
                tag="notification"
                color={fundRequests.length ? '#0E093F' : '#ddd'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={inactiveBtn}
              onPress={() => {
                navigation.navigate('HowMuch');
              }}>
              <Text style={btnText}>Add Funds</Text>
              <IconGen tag="add" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={content}>
          {(percent_completed < 100 || !steps?.pin_set) && (
            <View style={progress}>
              <View style={background}>
                <View
                  style={[achieved, {width: `${percent_completed ?? 20}%`}]}
                />
                <View style={rem} />
              </View>
              <Text style={progressText}>
                Your profile is {onboarding?.percent_completed}% complete. To
                enjoy the full services of Gen, you would need to complete your
                profile.
              </Text>
              <Text
                style={completeProfile}
                onPress={
                  // () => navigation.navigate('Step2')
                  () =>
                    navigation.navigate(
                      !steps?.profile_completed
                        ? 'Step1'
                        : !steps?.secret_question_completed
                        ? 'Step2'
                        : !steps?.pin_set
                        ? 'Step3'
                        : 'ProfileComplete',
                    )
                }>
                Complete profile here >>
              </Text>
            </View>
          )}
          <Text style={title}>Balances</Text>
          <Image
            source={require('../../../assets/images/empty.png')}
            style={empty}
          />
          <Text style={noAccount}>
            You have no accounts opened yet. Click on the button below to open
            an account
          </Text>
          <Button
            text="Create a balance"
            iconName="arrowRight"
            onPress={() => navigation.navigate('OpenBalance')}
          />
          <Text style={title}>Recent Activity</Text>
          <Image
            source={require('../../../assets/images/empty.png')}
            style={empty}
          />
          <Text style={noAccount}>
            You have no transactions yet you can initiate a transaction by using
            the “Quick Actions” button above.
          </Text>
          {/* <Button text="Save & Continue" iconName="arrowRight" info={'1/3'} /> */}
        </View>

        <View>
          <Text
            style={{textAlign: 'center'}}
            onPress={() => {
              dispatch(resetCache());
            }}>
            Logout
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
