import React, {useContext, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  dashboard,
  onboarding as onboard,
  text,
} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import QuickActions from '../../components/QuickActions/QuickActions';
import WalletCard from '../../components/WalletCard/WalletCard';
import {AppContext} from '../../controllers/AppContext';
import {apiRequest} from '../../lib/api/api';
import {
  fundRequestUrl,
  getUserDetailsUrl,
  wireTransferUrl,
} from '../../lib/api/url';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {updateProfile} from '../Auth/actions/authActions';
export function Dashboard({navigation}) {
  const {onboarding, customer, kycs, ...others} = useSelector(
    state => state.authentication,
  );
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
    <View
      style={[
        container,
        {
          backgroundColor: '#FFFFFF',
          paddingHorizontal: scale(0),
        },
      ]}>
      <View
        style={[
          header,
          {
            paddingHorizontal: scale(24),
            backgroundColor: !kycs?.[0]?.kyc_completed ? '#fff' : '#CFBEFF',
          },
        ]}>
        <Text style={greetings} numberOfLines={1} ellipsizeMode="tail">
          Hi, {customer?.first_name}
        </Text>
        <View
          style={[
            actions,
            {
              justifyContent: !kycs?.[0]?.kyc_completed
                ? 'space-between'
                : 'flex-end',
            },
          ]}>
          <TouchableOpacity
            disabled={!fundRequests.length}
            onPress={() => {
              navigation.navigate('FundingRequest');
            }}>
            <IconGen
              tag="notification"
              color={
                fundRequests.length || kycs?.[0]?.kyc_completed
                  ? '#0E093F'
                  : '#ddd'
              }
            />
          </TouchableOpacity>
          {!kycs?.[0]?.kyc_completed ? (
            <TouchableOpacity
              style={inactiveBtn}
              onPress={() => {
                navigation.navigate('HowMuch');
              }}>
              <Text style={btnText}>Add Funds</Text>
              <IconGen tag="add" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {!kycs?.[0]?.kyc_completed ? (
        <View style={[content, {marginHorizontal: scale(24)}]}>
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
      ) : (
        <View style={{backgroundColor: '#CFBEFF', flex: 1}}>
          <View style={{marginHorizontal: scale(24)}}>
            <WalletCard />
          </View>
          <View
            style={[
              onboard.inputContainer,
              {
                marginTop: scale(24),
                backgroundColor: '#fff',
                flex: 1,
                paddingBottom: 0,
              },
            ]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <QuickActions
                  icon={'transfer'}
                  text="Transfer"
                  onPress={() => navigation.navigate('TransferAmount')}
                />
                <QuickActions icon={'request'} text="Request" />
                <QuickActions icon={'beneficiary'} text="Beneficiaries" />
              </View>
              <View style={s.detailsContainer}>
                <Text style={s.recent}>Recent Activity</Text>
                <View style={s.detailsWrapper}>
                  <Text style={s.date}>TODAY</Text>
                  <View style={s.textContainer}>
                    <IconGen tag="debit" />
                    <View style={s.textWrapper}>
                      <Text style={s.name} numberOfLines={1}>
                        Figma LLC, Subscription
                      </Text>
                      <Text style={s.status} numberOfLines={1}>
                        Card • Chidimma Adamu
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={s.debit}>–$22,999</Text>
                      <Text style={s.superscript}>.99</Text>
                    </View>
                  </View>
                  <View style={s.textContainer}>
                    <IconGen tag="credit" />
                    <View style={s.textWrapper}>
                      <Text style={s.name} numberOfLines={1}>
                        Figma LLC, Subscription
                      </Text>
                      <Text style={s.status} numberOfLines={1}>
                        Card • Chidimma Adamu
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={s.credit}>–$22,999</Text>
                      <Text style={s.creditSuperscript}>.99</Text>
                    </View>
                  </View>
                </View>
                <View style={s.detailsWrapper}>
                  <Text style={s.date}>TODAY</Text>
                  <View style={s.textContainer}>
                    <IconGen tag="debit" />
                    <View style={s.textWrapper}>
                      <Text style={s.name} numberOfLines={1}>
                        Figma LLC, Subscription
                      </Text>
                      <Text style={s.status} numberOfLines={1}>
                        Card • Chidimma Adamu
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={s.debit}>–$22,999</Text>
                      <Text style={s.superscript}>.99</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      {/* <View>
          <Text
            style={{textAlign: 'center'}}
            onPress={() => {
              dispatch(resetCache());
            }}>
            Logout
          </Text>
        </View> */}
    </View>
  );
}

const s = StyleSheet.create({
  recent: {
    color: '#0E093F',
    fontFamily: text.helonikBold,
    fontSize: moderateScale(18),
    lineHeight: moderateScale(21),
    marginBottom: scale(12),
  },
  detailsContainer: {
    paddingTop: scale(40),
    marginTop: scale(24),
    borderTopColor: '#F4F4F6',
    borderTopWidth: scale(1),
  },
  date: {
    color: '#0E093F',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
    fontFamily: text.helonik,
    paddingVertical: scale(12),
    letterSpacing: scale(0.7),
  },
  textContainer: {
    borderTopColor: '#F4F4F6',
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
    borderBottomColor: '#F4F4F6',
    flexDirection: 'row',
    paddingVertical: scale(24),
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    marginHorizontal: scale(8),
  },
  name: {
    color: '#0E093F',
    fontFamily: text.helonikBold,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(18.8),
    marginBottom: scale(4),
  },
  status: {
    color: '#87849F',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16),
    letterSpacing: moderateScale(0.2),
    fontFamily: text.helonik,
  },
  debit: {
    color: '#F23C3C',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(23),
    fontFamily: text.helonikBold,
  },
  superscript: {
    fontSize: moderateScale(12),
    color: '#F23C3C',
    fontFamily: text.helonik,
    lineHeight: moderateScale(14),
  },
  credit: {
    color: '#000000',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(23),
    fontFamily: text.helonikBold,
  },
  creditSuperscript: {
    fontSize: moderateScale(12),
    color: '#000000',
    fontFamily: text.helonik,
    lineHeight: moderateScale(14),
  },
});
