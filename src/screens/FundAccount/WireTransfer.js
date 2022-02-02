import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {footer, onboarding, text} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import Nav from '../../components/HeaderNav/Nav';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import {AppContext} from '../../controllers/AppContext';
import {apiRequest} from '../../lib/api/api';
import {acceptMoneyUrl} from '../../lib/api/url';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';

export default function WireTransfer({navigation, route}) {
  const auth = useSelector(state => state.authentication);
  const {account: cAccount} = useContext(AppContext);
  const [account, setAccount] = useState(
    route.params?.sender ? null : cAccount,
  );
  const [showLocal, setLocal] = useState(false);
  const [showInternational, setShowInternational] = useState(false);

  useEffect(() => {
    if (route.params?.sender) {
      apiRequest(acceptMoneyUrl, 'post', {
        payment_reference: route.params?.payment_reference,
        accepted: true,
        method: 'wire',
        type: 'mobile',
      })
        .then(res => setAccount(res.data))
        .catch(e => console.log(e));
    }
  }, [route.params.sender]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `\nBank name & address: ${account?.bank_name}, ${account?.bank_address} \n
        IBAN/Account Number: ${account?.account_number}\n
        Beneficiary name & address: ${account?.account_name}, ${account?.account_owner_address}\n
        Account type: ${account?.account_type}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };
  return !route.params.sender || account ? (
    <View style={onboarding.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: '#DCF995'}}>
          <View
            style={{
              ...onboarding.inputContainer,
              flex: 1,
              paddingHorizontal: 0,
            }}>
            <Nav
              title={
                route.params?.sender ? 'Funding request' : 'Fund your Account'
              }
              description={
                route.params?.sender
                  ? `Use the details provided below to send money to\n${route.params?.request_by_name}`
                  : 'View, copy, or share your bank details below.'
              }
              onClose={navigation.goBack}
            />

            <View style={{paddingHorizontal: scale(24)}}>
              <View style={[s.container]}>
                <TouchableOpacity
                  onPress={() => {
                    setLocal(!showLocal);
                    setShowInternational(false);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}>
                    <View>
                      <Text style={s.details}>Domestic transfer details</Text>
                      <Text style={s.type}>For transfers within the US</Text>
                    </View>
                    <IconGen tag="share" onPress={() => onShare('local')} />
                  </View>
                  <Text style={s.instruction}>
                    Click for details to receive US Bank ACH or Domestic Wires.
                  </Text>
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: scale(16),
                    }}>
                    <IconGen tag="ChevronRight" colour="#6939FF" />
                  </View>
                  {showLocal ? (
                    <View>
                      <Text style={s.headerText}>Beneficiary details</Text>
                      <Text style={s.title}>Account holder name</Text>
                      <Text style={s.value}>
                        {account?.domestic?.account_name}
                      </Text>
                      <Text style={s.title}>Account number</Text>
                      <Text style={s.value}>
                        {account?.domestic?.account_number}
                      </Text>
                      <Text style={s.title}>Account type</Text>
                      <Text style={s.value}>
                        {account?.domestic?.account_type}
                      </Text>
                      <Text style={s.title}>Routing number</Text>
                      <Text style={s.value}>
                        {account?.domestic?.ach_rounting_number}
                      </Text>
                      <Text style={s.title}>Bank name & address</Text>
                      <Text style={s.value}>
                        {account?.domestic?.bank_name},{' '}
                        {account?.domestic?.bank_address}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>

              <View style={s.container}>
                <TouchableOpacity
                  onPress={() => {
                    setLocal(false);
                    setShowInternational(!showInternational);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}>
                    <View>
                      <Text style={s.details}>
                        International wire tranfer details
                      </Text>
                      <Text style={s.type}>For transfers outside the US</Text>
                    </View>
                    <IconGen
                      tag="share"
                      onPress={() => onShare('international')}
                    />
                  </View>
                  <Text style={s.instruction}>
                    Click for details to receive International Dollar Wires.
                  </Text>
                  <View
                    style={{
                      position: 'absolute',
                      right: scale(0),
                      bottom: scale(16),
                    }}>
                    <IconGen tag="ChevronRight" colour="#6939FF" />
                  </View>
                  {showInternational ? (
                    <View>
                      <Text style={s.headerText}>Receiving bank details</Text>
                      <Text style={s.title}>Swift/BIC code</Text>
                      <Text style={s.value}>
                        {account?.international?.wire_routing_number}
                      </Text>
                      <Text style={s.title}>Bank name & address</Text>
                      <Text style={s.value}>
                        {account?.international?.bank_name},{' '}
                        {account?.international?.bank_address}
                      </Text>
                      <Text style={[s.headerText, {marginTop: scale(0)}]}>
                        Beneficiary details
                      </Text>
                      <Text style={s.title}>IBAN/Account Number</Text>
                      <Text style={s.value}>
                        {account?.international?.account_number}
                      </Text>
                      <Text style={s.title}>Beneficiary name & address</Text>
                      <Text style={s.value}>
                        {account?.international?.account_name},{' '}
                        {account?.international?.account_owner_address}
                      </Text>
                      <Text style={s.title}>Account type</Text>
                      <Text style={[s.value, {marginBottom: scale(0)}]}>
                        {account?.international?.account_type}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderTopWidth: scale(1),
                  marginBottom: scale(16),
                  marginHorizontal: scale(40),
                  borderColor: '#F4F4F6',
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: scale(16),
                  backgroundColor: '#F9E1B8',
                  borderRadius: scale(12),
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <IconGen tag="info" />
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    lineHeight: moderateScale(21),
                    color: '#0E093F',
                    letterSpacing: moderateScale(0.2),
                    marginLeft: scale(10),
                    fontFamily: text.helonik,
                    flex: 1,
                  }}>
                  If you want to receive money from a Gen account, you can use
                  your email address.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          ...footer.container,
          backgroundColor: '#FFFFFF',
        }}>
        <Button
          text={route.params?.sender ? 'I have paid' : 'Done'}
          iconName="complete"
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
          isLoading={false}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            paddingTop: scale(32),
            paddingBottom: scale(16),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconGen tag="doubleArrowBack" />
          <Text
            style={{
              textAlign: 'center',
              fontSize: moderateScale(16),
              lineHeight: moderateScale(18.78),
              color: '#6939FF',
              letterSpacing: moderateScale(0.2),
              fontFamily: text.helonikBold,
              marginLeft: scale(4),
            }}>
            I’ll do this later
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{fontFamily: text.helonik, fontSize: scale(14), color: '#ddd'}}>
        Loading...
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: '#F8F5FF',
    borderRadius: scale(12),
    marginBottom: scale(12),
    padding: scale(16),
  },
  details: {
    fontSize: moderateScale(18),
    marginBottom: scale(8),
    lineHeight: moderateScale(23.3),
    fontFamily: text.helonikBold,
    color: '#0E093F',
  },
  type: {
    fontSize: moderateScale(14),
    marginBottom: scale(24),
    lineHeight: moderateScale(16.44),
    letterSpacing: moderateScale(0.2),
    fontFamily: text.helonik,
    color: '#6939FF',
  },
  instruction: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
    letterSpacing: moderateScale(0.2),
    width: scale(293),
    fontFamily: text.helonik,
    color: '#4A476F',
  },
  headerText: {
    fontSize: moderateScale(16),
    marginTop: scale(40),
    marginBottom: scale(16),
    lineHeight: moderateScale(18.78),
    fontFamily: text.helonik,
    color: '#6939FF',
  },
  title: {
    fontSize: moderateScale(14),
    marginBottom: scale(4),
    lineHeight: moderateScale(21),
    letterSpacing: moderateScale(0.2),
    fontFamily: text.helonik,
    color: '#4A476F',
  },
  value: {
    fontSize: moderateScale(20),
    marginBottom: scale(24),
    lineHeight: moderateScale(30),
    letterSpacing: moderateScale(0.2),
    fontFamily: text.helonik,
    color: '#0E093F',
    width: scale(263),
  },
});
