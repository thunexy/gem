import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import validator from 'validator';
import {text} from '../../../../assets/styles/styles';
import BottomModal from '../../../components/BottomModal/BottomModal';
import Footer from '../../../components/Footer/Footer';
import HeaderText from '../../../components/HeaderText/HeaderText';
import {IconGen} from '../../../components/IconGenerator/IconGenerator';
import InfoText from '../../../components/InfoText/infoText';
import Input from '../../../components/Input/Input';
import Picker from '../../../components/Input/Picker';
import {apiRequest} from '../../../lib/api/api';
import {
  fetchBanksUrl,
  resolveCustomerUrl,
  saveBeneficiaryUrl,
} from '../../../lib/api/url';
import {moderateScale, scale} from '../../../lib/utils/scaleUtils';
export default function BeneficiaryModal({
  isModalOpen,
  closeModal = () => {},
  fetchBeneficiaries,
  currencies,
  beneficiaries,
  countries,
}) {
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState(0);
  const [typeModal, setTypeModal] = useState(false);
  const [exists, setExistence] = useState(false);
  const [user, setUser] = useState(null);
  const [resolve, setResolve] = useState(false);
  const [selectedGen, setSelectedGen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries?.[0]?.value);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [account_number, setAccountNumber] = useState(null);
  const [bank_name, setBankName] = useState('');
  const [bank_address, setBankAddress] = useState('');
  const [city, setCity] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [step, setStep] = useState(1);
  const [routing_number, setRoutingNumber] = useState('');
  const [swift_code, setSwiftCode] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [banks, setBanks] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencies?.[0]?.value,
  );
  const beneficiaryType = [
    {
      icon: 'logo',
      title: 'Gen Account',
    },
    {
      icon: 'location',
      title: 'Others',
    },
  ];

  const resolveCustomer = () => {
    setResolve(true);
    apiRequest(resolveCustomerUrl, 'post', {
      identifier: email,
    })
      .then(res => {
        setUser(res.data);
        setExistence(true);
      })
      .catch(e => {
        SimpleToast.show(e.response.data.message, SimpleToast.LONG);
        setExistence(false);
      })
      .finally(() => {
        setResolve(false);
      });
  };

  const saveBeneficiary = () => {
    setLoading(true);
    let data;
    if (!selected) {
      data = {
        type: 'gen',
        beneficiary_customer_id: user.id,
      };
    } else if (selectedAccount === 'SAVINGS') {
      data = {
        account_number,
        account_name: beneficiary,
        country_id: selectedCountry,
        currency_id: selectedCurrency,
        account_type: selectedAccount,
        bank_id: selectedBank,
        address: bank_address,
        city,
        postal_code,
        type: 'others',
      };
    } else {
      data = {
        account_number,
        account_name: beneficiary,
        country_id: selectedCountry,
        currency_id: selectedCurrency,
        account_type: selectedAccount,
        bank_name,
        address: bank_address,
        city,
        postal_code,
        routing_number,
        swift_code,
        type: 'others',
      };
    }
    apiRequest(saveBeneficiaryUrl, 'post', data)
      .then(res => {
        closeModal();
        fetchBeneficiaries();
      })
      .catch(e => {
        SimpleToast.show(
          e.response?.data?.message || e.message,
          SimpleToast.LONG,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchBanks = () => {
    apiRequest(`${fetchBanksUrl}?countryid=1`, 'get')
      .then(res => {
        setBanks(
          res.data.map(item => {
            item.label = item.bank_name;
            item.value = item.id;
            return item;
          }),
        );
      })
      .catch(e => {
        SimpleToast.show(
          e.response?.data?.message || e.message,
          SimpleToast.LONG,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(fetchBanks, []);
  return (
    <BottomModal
      isModalOpen={isModalOpen}
      topline={false}
      showCloseIcon={true}
      dismissable={false}
      closeModal={() => {
        closeModal();
        setSelected(0);
        setSelectedCountry('');
        setSelectedCurrency('');
        setSelectedAccount('');
        setBeneficiary('');
        setRoutingNumber('');
        setBankName('');
        setAccountNumber('');
        setSwiftCode('');
        setBankAddress('');
        setCity('');
        setPostalCode('');
        setStep(1);
      }}
      containerStyle={{
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: scale(10),
      }}>
      <ScrollView
        style={{paddingHorizontal: scale(24), flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <HeaderText
            title="Add a beneficiary"
            textStyle={{fontFamily: text.helonikBold}}
          />
          {step !== 2 && (
            <>
              <Picker
                placeholder={beneficiaryType[selected].title}
                label="Beneficiary type"
                data={[]}
                disabled
                onPress={() => setTypeModal(true)}
              />
            </>
          )}

          {!selected ? (
            <>
              <Input
                label="Email address"
                value={email}
                onChangeText={setEmail}
                onBlur={() => {
                  validator.isEmail(email) && resolveCustomer();
                }}
                placeHolder="Enter beneficiary’s Gen email"
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
                        user?.avatar
                          ? {
                              uri: user?.avatar,
                            }
                          : require('../../../../assets/images/empty.png')
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
                      {user?.first_name} {user?.last_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontFamily: text.helonik,
                        letterSpacing: moderateScale(0.2),
                        paddingHorizontal: scale(14),
                        paddingVertical: scale(4),
                        color: selectedGen ? '#fff' : '#6939FF',
                        backgroundColor: selectedGen ? '#6939FF' : '#fff',
                        borderColor: '#6939FF',
                        borderRadius: scale(32),
                        borderWidth: scale(1),
                        marginRight: scale(8),
                      }}
                      onPress={() => setSelectedGen(true)}>
                      Yes
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontFamily: text.helonik,
                        letterSpacing: moderateScale(0.2),
                        paddingHorizontal: scale(14),
                        paddingVertical: scale(4),
                        color: '#0E093F',
                        backgroundColor: '#fff',
                        borderColor: '#0E093F',
                        borderRadius: scale(32),
                        borderWidth: scale(1),
                      }}
                      onPress={() => {
                        setExistence(null);
                        setSelectedGen(false);
                        setEmail(null);
                      }}>
                      No
                    </Text>
                  </View>
                </View>
              )}
            </>
          ) : step === 1 ? (
            <>
              <Input
                label="Beneficiary name"
                placeHolder="E.g; Ndubuisi Hassana"
                value={beneficiary}
                onChangeText={setBeneficiary}
              />
              <Picker
                label="Bank country"
                value={selectedCountry}
                data={countries}
                onValueChange={setSelectedCountry}
              />
              <Picker
                label="Currency"
                data={currencies}
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              />
              <Picker
                placeholder={beneficiaryType[selected].title}
                label="Account type"
                data={[
                  {
                    label: 'Savings',
                    value: 'SAVINGS',
                  },
                  {
                    label: 'Checking',
                    value: 'CHECKING',
                  },
                ]}
                value={selectedAccount}
                onValueChange={setSelectedAccount}
              />
            </>
          ) : step === 2 && selectedAccount === 'SAVINGS' ? (
            <>
              <Input
                label="Account number"
                placeHolder="E.g; 12099717312"
                keyboardType="number-pad"
                value={account_number}
                onChangeText={setAccountNumber}
              />
              <Picker
                placeholder={beneficiaryType[selected].title}
                label="Bank name"
                data={banks}
                value={selectedBank}
                onValueChange={setSelectedBank}
              />
              <Input
                label="Bank address"
                placeHolder="E.g; Apartment, street name, etc"
                value={bank_address}
                onChangeText={setBankAddress}
              />
              <Input
                label="City"
                placeHolder="E.g; Yaba"
                value={city}
                onChangeText={setCity}
              />
              <Input
                label="Postal code"
                placeHolder="E.g; 100001"
                value={postal_code}
                onChangeText={setPostalCode}
              />
            </>
          ) : (
            <>
              <Input
                label="Account number"
                placeHolder="E.g; 12099717312"
                keyboardType="number-pad"
                value={account_number}
                onChangeText={setAccountNumber}
              />
              <Input
                label="Routing number"
                placeHolder="E.g; 12099717312"
                keyboardType="number-pad"
                value={routing_number}
                onChangeText={setRoutingNumber}
              />
              <Input
                label="Bank name"
                placeHolder="E.g; Chase Bank"
                value={bank_name}
                onChangeText={setBankName}
              />
              <Input
                label="SWIFT code"
                placeHolder="E.g; 12099717312"
                value={swift_code}
                onChangeText={setSwiftCode}
              />
              <Input
                label="Bank address"
                placeHolder="E.g; Apartment, street name, etc"
                value={bank_address}
                onChangeText={setBankAddress}
              />
              <Input
                label="City"
                placeHolder="E.g; Yaba"
                value={city}
                onChangeText={setCity}
              />
              <Input
                label="Postal code"
                placeHolder="E.g; 100001"
                value={postal_code}
                onChangeText={setPostalCode}
              />
            </>
          )}
        </View>

        <View style={{marginTop: scale(20)}}>
          <InfoText text="Kindly ensure using correct account details" />
        </View>
      </ScrollView>
      <Footer
        btnText="Save beneficiary"
        btnIcon="arrowRight"
        footerIcon={'arrowLeft'}
        footerText="Go back"
        disabled={
          !selected
            ? !selectedGen || loading
            : step === 1
            ? !selectedAccount ||
              !selectedCurrency ||
              !selectedCountry ||
              !beneficiary
            : step === 2 && selectedAccount === 'SAVINGS'
            ? !account_number ||
              !selectedBank ||
              !bank_address ||
              !city ||
              !postal_code
            : !account_number ||
              !bank_name ||
              !bank_address ||
              !city ||
              !postal_code ||
              !swift_code ||
              !routing_number
        }
        onPress={() => {
          if (!selected) {
            saveBeneficiary();
          } else if (step === 1) {
            setStep(2);
            Keyboard.dismiss();
          } else {
            saveBeneficiary();
          }
        }}
        loading={loading}
        info={!selected ? '' : step === 1 ? '1/2' : '2/2'}
      />
      <BottomModal
        isModalOpen={typeModal}
        showCloseIcon={false}
        closeModal={() => {
          setTypeModal(false);
        }}
        containerStyle={{
          backgroundColor: '#fff',
          paddingTop: scale(10),
        }}>
        <View style={{marginTop: scale(22), marginBottom: scale(26)}}>
          {beneficiaryType.map(({icon, title}, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelected(i);
                  setTypeModal(false);
                }}
                key={i}>
                <View
                  style={{
                    paddingHorizontal: scale(30),
                    flexDirection: 'row',
                    paddingVertical: scale(20),
                    backgroundColor: i === selected ? '#F5F9E4' : '#fff',
                    alignItems: 'center',
                  }}>
                  <IconGen tag={icon} size={1} />
                  <Text
                    style={{
                      marginLeft: scale(18),
                      fontFamily: text.helonik,
                      fontSize: moderateScale(20),
                    }}>
                    {title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomModal>
    </BottomModal>
  );
}
