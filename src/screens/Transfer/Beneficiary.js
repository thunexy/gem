import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {dashboard, onboarding, text} from '../../../assets/styles/styles';
import BeneficiaryContainer from '../../components/BeneficiaryContainer/BeneficiaryContainer';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/HeaderNav/Nav';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import Input from '../../components/Input/Input';
import {apiRequest} from '../../lib/api/api';
import {
  allowedCountriesUrl,
  countriesUrl,
  fetchBeneficiariesUrl,
} from '../../lib/api/url';
import {scale} from '../../lib/utils/scaleUtils';
import BeneficiaryModal from './components/BeneficiaryModal';
import ConfirmTransfer from './components/ConfirmTransfer';

// import RadioForm, {RadioButton} from 'react-native-simple-radio-button';

export default function Beneficiary({navigation, route}) {
  const [beneficiaryDetail, setBeneficiaryDetail] = useState({});
  const [beneficiaryModal, setBeneficiaryModal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState(
    route.params?.beneficiaries,
  );
  const [showConfirmTransfer, setShowConfirmTransfer] = useState(false);
  const [selected, setSelected] = useState(0);
  const [searchText, setSearchText] = useState('');

  const auth = useSelector(state => state.authentication);
  const fetchBeneficiaries = () => {
    apiRequest(
      `${fetchBeneficiariesUrl}?Type=${
        route.params?.destination === 'Gen User' ? 'GEN' : 'OTHERS'
      }&EmailAddress=${auth.customer?.email_address}`,
      'get',
    )
      .then(response => {
        setBeneficiaries(response.data);
      })
      .catch(e => {
        SimpleToast.show(
          e.response?.data?.message || e.message,
          SimpleToast.LONG,
        );
      })
      .finally(() => {});
  };

  const fetchCountries = () => {
    apiRequest(countriesUrl, 'get')
      .then(response => {
        setCountries(
          response.data.filter(item => {
            item.label = item.name;
            item.value = item.id;
            return item.allowed;
          }),
        );
      })
      .catch(e => {
        SimpleToast.show(
          e.response?.data?.message || e.message,
          SimpleToast.LONG,
        );
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <View style={onboarding.container}>
      <View style={{backgroundColor: '#CFBEFF', flex: 1}}>
        <View
          style={{
            ...onboarding.inputContainer,
            paddingHorizontal: scale(0),
            flex: 1,
            paddingBottom: 0,
          }}>
          <Nav
            title="Send money"
            description="Who would you like to send money to?"
            onClose={navigation.goBack}
          />
          <View>
            <Input
              placeHolder="Search by name or email"
              inputStyle={{borderRadius: scale(40)}}
              hideLine
              onChangeText={setSearchText}
              suffix={<IconGen tag="search" />}
              style={{marginHorizontal: scale(20)}}
            />
            <Text
              style={{
                marginHorizontal: scale(40),
                marginVertical: scale(8),
                fontFamily: text.helonik,
              }}>
              Select a recipient
            </Text>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderColor: '#F4F4F6',
              marginTop: scale(4),
              paddingHorizontal: scale(20),
              position: 'relative',
            }}>
            <Text
              onPress={() => setBeneficiaryModal(true)}
              style={{
                textAlign: 'center',
                marginTop: scale(14),
                borderColor: '#CFBEFF',
                borderWidth: 1,
                borderRadius: scale(12),
                paddingVertical: scale(14),
                backgroundColor: !beneficiaries?.length ? '#8960FF' : 'none',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: scale(8), color: '#fff'}}>
                  <IconGen
                    tag="addbensvg"
                    color={!beneficiaries?.length ? '#fff' : '#6939FF'}
                  />
                </Text>

                <Text
                  style={{
                    fontFamily: text.helonikBold,
                    paddingTop: scale(4),
                    color: !beneficiaries?.length ? '#fff' : '',
                  }}>
                  Add New Beneficiary
                </Text>
              </View>
            </Text>
          </View>

          {beneficiaries?.length ? (
            <View style={{flex: 1}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  borderRadius: scale(8),
                  marginTop: scale(20),
                }}>
                {beneficiaries.map((item, i) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(i);
                        setBeneficiaryDetail(item);
                        setShowConfirmTransfer(true);
                      }}>
                      <BeneficiaryContainer
                        beneficiaryDetails={item}
                        index={i}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                paddingTop: scale(24),
              }}>
              <Image
                source={require('../../../assets/images/empty.png')}
                style={dashboard.empty}
              />
              <Text
                style={{
                  ...dashboard.noAccount,
                  marginTop: scale(20),
                  textAlign: 'center',
                  marginHorizontal: scale(16),
                  fontFamily: text.helonik,
                }}>
                You have no Gen beneficiary saved.{'\n'} Please add a
                beneficiary to send money to them.
              </Text>
            </View>
          )}
        </View>
      </View>
      <View>
        <ConfirmTransfer
          isModalOpen={showConfirmTransfer}
          closeModal={() => {
            setShowConfirmTransfer(false);
          }}
          data={beneficiaryDetail}
        />
      </View>
      <BeneficiaryModal
        isModalOpen={beneficiaryModal}
        closeModal={() => setBeneficiaryModal(false)}
        fetchBeneficiaries={fetchBeneficiaries}
        currencies={route.params?.currencies?.map(item => {
          item.label = item.name;
          item.value = item.id;
          return item;
        })}
        countries={countries}
        beneficiaries={beneficiaries}
      />
      <Footer
        onFooterPressed={() => {
          navigation.goBack();
        }}
        btnText="Continue"
        btnIcon="arrowRight"
        footerText="Go Back"
        footerIcon="arrowLeft"
        disabled={beneficiaries?.length ? false : true}
      />
    </View>
  );
}
