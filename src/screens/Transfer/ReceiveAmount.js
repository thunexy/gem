import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {onboarding, text} from '../../../assets/styles/styles';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/HeaderNav/Nav';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import Picker from '../../components/Input/Picker';
import Text from '../../components/Text/Text';
import {apiRequest} from '../../lib/api/api';
import {
  allowedCountriesUrl,
  getCurrenciesUrl,
  getStatesUrl,
} from '../../lib/api/url';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import CountryModal from './components/CountryModal';
import DestinationModal from './components/DestinationModal';
import EditModal from './components/EditModal';
import InfoModal from './components/InfoModal';

export default function ReceiveAmount({navigation, route}) {
  console.log(route.params?.rate);
  const [amount, setAmount] = useState(route.params?.amount);
  const [rate, setRate] = useState(route.params?.rate);
  const [currency, setCurrency] = useState(route.params?.rate?.to_currency);
  const [editModal, setEditModal] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [destinationModal, setDestinationModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [destination, setDestination] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState({
    allowedCountries: false,
  });
  const getCurrencies = () => {
    setLoading(prev => ({...prev, allowedCountries: true}));
    apiRequest(getCurrenciesUrl, 'get')
      .then(response => {
        setCurrencies(response.data.filter(({is_allowed}) => is_allowed));
      })
      .catch(e =>
        SimpleToast.show(
          e.response?.data?.message || e.message,
          SimpleToast.LONG,
        ),
      )
      .finally(() => {
        setLoading(prev => ({...prev, allowedCountries: false}));
      });
  };
  useEffect(() => {
    getCurrencies();
  }, []);
  console.log(currencies);
  return (
    <View style={onboarding.container}>
      <View style={{backgroundColor: '#F7C57C', flex: 1}}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View
            style={{
              ...onboarding.inputContainer,
              paddingHorizontal: scale(0),
              flex: 1,
            }}>
            <Nav
              title="Send money"
              description="How much will they receive?"
              onClose={navigation.goBack}
              noPadding
            />
            <View style={{backgroundColor: '#FAF2EB', padding: scale(24)}}>
              <View
                style={{
                  backgroundColor: '#F9E1B8',
                  paddingVertical: scale(5),
                  paddingHorizontal: scale(10),
                  borderRadius: scale(16),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(36),
                    fontFamily: text.helonik,
                    color: '#0E093F',
                  }}>
                  ₦
                  {`${rate?.amount}`
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
                <IconGen tag="edit" onPress={() => setEditModal(true)} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: scale(24),
                paddingVertical: scale(16),
                borderBottomColor: '#FAF2EB',
                borderBottomWidth: scale(1),
                alignItems: 'center',
              }}>
              <Text color="#0E093F" size="h3" style={{alignItems: 'center'}}>
                You’re sending: $
                {`${+amount}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                <Text
                  onPress={() => setEditModal(true)}
                  size={'h5'}
                  style={{
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'dotted',
                    textDecorationColor: '#6939FF',
                  }}>
                  EDIT
                </Text>
              </Text>
              <IconGen
                tag="info"
                color="#6939FF"
                onPress={() => setInfoModal(true)}
              />
            </View>
            <View style={{marginHorizontal: scale(20)}}>
              <Picker
                value={currency}
                label="Currency"
                placeholder={
                  loading.allowedCountries ? 'Loading currencies' : currency
                }
                onValueChange={setCurrency}
                info={`Exchange rate: ${rate?.to_currency}570/${rate?.from_currency}1`}
                disabled
                onPress={() => setCurrencyModal(true)}
              />
              <Picker
                value={currency}
                label="Destination"
                onValueChange={setCurrency}
                data={[]}
                disabled
                onPress={() => setDestinationModal(true)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <CountryModal
        isModalOpen={currencyModal}
        data={currencies}
        closeModal={() => setCurrencyModal(false)}
        setCurrency={setCurrency}
        currency={currency}
      />
      <InfoModal isModalOpen={infoModal} />
      <DestinationModal isModalOpen={destinationModal} />
      <EditModal isModalOpen={editModal} />
      <Footer
        onFooterPressed={() => {}}
        btnText="Continue"
        btnIcon="arrowRight"
        footerText="Go back"
        footerIcon="arrowLeft"
      />
    </View>
  );
}
