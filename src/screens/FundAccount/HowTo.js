import {PayWithFlutterwave} from 'flutterwave-react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {onboarding, text} from '../../../assets/styles/styles';
import StatusModal from '../../components/BottomModal/StatusModal';
import Nav from '../../components/HeaderNav/Nav';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import {apiRequest} from '../../lib/api/api';
import {fundEndUrl, initiateFundUrl} from '../../lib/api/url';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {PaymentItem} from '../Dashboard/OpenBalance/components/BalanceItem';

export default function HowTo({navigation, route}) {
  const {amount, sender} = route.params;
  const auth = useSelector(state => state.authentication);
  const [ref, setRef] = useState(null);
  const [ displayModal, setDisplayModal ] = useState(false);
  const [displayACH, setDisplayACH] = useState(false)
  const [loading, setLoading] = useState(false);
  const getUSDBalance = () => {
    return auth.balances?.find(item => item.currency === 'USD')
      ?.available_balance;
  };
  const initiatePayment = async () => {
    apiRequest(initiateFundUrl, 'post', {
      amount,
      currency: 'USD',
      type: 'mobile',
      provider_type: 'flutterwave',
    })
      .then(response => {
        const {transaction_reference} = response.start_funding_response;
        setRef(transaction_reference);
      })
      .catch(e => {
        Toast.show(e.response?.data?.message || e.message, Toast.LONG);
      });
  };

  useEffect(() => {
    !sender && initiatePayment();
  }, []);
  const items = [
    {
      name: 'GenPay',
      onPress() {},
      description: 'Fund your account with bank transfer or debit cards',
    },
    {
      name: 'Request Money',
      onPress() {
        navigation.navigate('RequestFrom', {...route.params});
      },
      description: 'Send request for others to send money to you.',
    },
    {
      name: 'My Account Details',
      description:
        'Fund your account with domestic ACH or international wire transfers',
      onPress() {
        navigation.navigate('WireTransfer', {...route.params});
      },
    },
    {
      name: 'Bank Debit (ACH)',
      description:
        'Connect your bank account with Gen. The money should be in your Gen account in 3 hours.',
      onPress() {
        setDisplayACH(true);
      },
    },
  ];

  const senderItems = [
    {
      name: 'GenPay',
      onPress() {},
      description: 'Fund your account with bank transfer or debit cards',
    },
    {
      name: 'Show Account Details',
      description:
        'Fund your account with domestic ACH or international wire transfers',
      onPress() {
        navigation.navigate('WireTransfer', {...route.params});
      },
    },
  ];

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
              description="Select a preferred payment method"
              onClose={navigation.goBack}
            />
            <View style={{paddingHorizontal: scale(24)}}>
              {!sender
                ? items.map(({name, description, onPress = () => {}}, i) =>
                    name === 'GenPay' ? (
                      <PayWithFlutterwave
                        options={{
                          tx_ref: ref ?? '',
                          authorization:
                            'FLWPUBK_TEST-128ea9d7c4d397252855a2cd33bb3943-X',
                          amount: +amount,
                          currency: 'USD',
                          customer: {
                            email: auth.customer?.email_address,
                          },
                          redirect_url: 'http://test.com',
                          payment_options: 'card',
                        }}
                        onRedirect={snap => {
                          apiRequest(
                            `${fundEndUrl}/${ref}/${snap.flw_ref}`,
                            'get',
                          )
                            .then(res => {
                              setDisplayModal(true);
                            })
                            .catch(e => {});
                        }}
                        key={i}
                        customButton={props => (
                          <PaymentItem
                            name={name}
                            description={description}
                            onPress={() => {
                              ref && props.onPress();
                            }}
                            backgroundColor={ref ? '#FAF2EB' : '#F4F4F6'}
                            disable={!ref}
                          />
                        )}
                      />
                    ) : (
                      <PaymentItem
                        key={i}
                        name={name}
                        description={
                          name === 'My Account Details' && !getUSDBalance()
                            ? 'Please fund your account with the minimum balance to unlock details.'
                            : description
                        }
                        onPress={onPress}
                        backgroundColor={
                          name === 'My Account Details' && !getUSDBalance()
                            ? '#F4F4F6'
                            : '#FAF2EB'
                        }
                        disable={
                          name === 'My Account Details' && !getUSDBalance()
                        }
                      />
                    ),
                  )
                : senderItems.map(
                    ({name, description, onPress = () => {}}, i) =>
                      name === 'GenPay' ? (
                        <PayWithFlutterwave
                          options={{
                            tx_ref: route.params?.payment_reference,
                            authorization:
                              'FLWPUBK_TEST-128ea9d7c4d397252855a2cd33bb3943-X',
                            amount: amount,
                            currency: 'USD',
                            customer: {
                              email: auth.customer?.email_address,
                            },
                            redirect_url: 'http://test.com',
                            payment_options: 'card',
                          }}
                          onRedirect={snap => {
                            apiRequest(
                              `${fundEndUrl}/${route.params?.payment_reference}/${snap.flw_ref}`,
                              'get',
                            )
                              .then(res => {
                                setDisplayModal(true);
                              })
                              .catch(e => {});
                          }}
                          customButton={props => (
                            <PaymentItem
                              key={i}
                              name={name}
                              description={description}
                              onPress={() => {
                                props.onPress();
                              }}
                              backgroundColor={'#FAF2EB'}
                            />
                          )}
                        />
                      ) : (
                        <PaymentItem
                          key={i}
                          name={name}
                          description={description}
                          onPress={onPress}
                          backgroundColor={'#FAF2EB'}
                        />
                      ),
                  )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{alignItems: 'center', paddingBottom: scale(24)}}>
        <IconGen tag="lock" />
        <Text
          style={{
            marginTop: scale(8),
            fontFamily: text.helonik,
            fontSize: moderateScale(14),
            color: '#87849F',
            letterSpacing: moderateScale(0.2),
          }}>
          All transactions are secure
        </Text>
      </View>
      <StatusModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        loading={loading}
        title={`Funding\nSuccessful`}
        description={`Funding ${amount} is successful. You should have the money in your account around 5pm ET on Tuesday, December 07, 2022`}
        btnText="Great, thanks"
        onPress={() => {}}
        icon="arrowRight"
      />
    </View>
  );
}
