import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {onboarding, text} from '../../../assets/styles/styles';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/HeaderNav/Nav';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import Picker from '../../components/Input/Picker';
import Text from '../../components/Text/Text';
import {apiRequest} from '../../lib/api/api';
import {
  fetchBeneficiariesUrl,
  getCurrenciesUrl,
  rateUrl,
} from '../../lib/api/url';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import CountryModal from './components/CountryModal';
import DestinationModal from './components/DestinationModal';
import EditModal from './components/EditModal';
import InfoModal from './components/InfoModal';

export default function ReceiveAmount({navigation, route}) {
  const [amount, setAmount] = useState((+route.params?.amount / 1).toFixed(2));
  const [receiptAmount, setReceiptAmount] = useState(null);
  const [rate, setRate] = useState(null);
  const [currency, setCurrency] = useState(route.params?.rate?.to_currency);
  const [editModal, setEditModal] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [destinationModal, setDestinationModal] = useState(false);
  const [editType, setEditType] = useState('from');
  const [infoModal, setInfoModal] = useState(false);
  const destinations = [
    {
      icon: 'logo',
      title: 'Gen User',
    },
    {
      icon: 'logo',
      title: 'Within US (ACH Domestic Wire)',
    },
    {
      icon: 'logo',
      title: 'Outside US (International Wire)',
    },
  ];
  const [destination, setDestination] = useState(destinations[0].title);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState({
    allowedCountries: false,
    rate: false,
    beneficiaries: false,
  });
  const auth = useSelector(state => state.authentication);
  const getRate = () => {
    setLoading(prev => ({...prev, rate: true}));
    apiRequest(rateUrl, 'post', {
      amount: amount / 100,
      from_currency_name: 'USD',
      to_currency_name: currency,
    })
      .then(response => {
        setRate(response.data);
        setReceiptAmount((+response.data.amount * 100).toFixed(0));
      })
      .catch(e =>
        SimpleToast.show(
          e.response?.data?.message || e.message,
          SimpleToast.LONG,
        ),
      )
      .finally(() => setLoading(prev => ({...prev, rate: false})));
  };
  const fetchBeneficiaries = () => {
    setLoading(prev => ({...prev, beneficiaries: true}));
    apiRequest(
      `${fetchBeneficiariesUrl}?Type=${
        destination === 'Gen User' ? 'GEN' : 'OTHERS'
      }&EmailAddress=${auth.customer?.email_address}`,
      'get',
    )
      .then(response => {
        navigation.navigate('Beneficiary', {
          beneficiaries: response.data,
          destination,
          currencies,
          amount,
          rate,
        });
      })
      .catch(e => {
        SimpleToast.show(
          e.response?.data?.message || e.message,
          SimpleToast.LONG,
        );
      })
      .finally(() => {
        setLoading(prev => ({...prev, beneficiaries: false}));
      });
  };
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
  useEffect(() => {
    editType === 'from' && getRate();
  }, [amount, currency, editModal]);

  useEffect(() => {
    editType === 'to' && setAmount((receiptAmount / rate.rate).toFixed(0));
  }, [receiptAmount]);

  const currencyMap = new Map([
    ['USD', '$'],
    ['NGN', '₦'],
    ['ZAR', 'R'],
  ]);

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
                  numberOfLines={1}
                  style={{
                    fontSize: moderateScale(36),
                    fontFamily: text.helonik,
                    color: '#0E093F',
                    flex: 1,
                    marginRight: scale(10),
                  }}>
                  {loading.rate
                    ? '...'
                    : `${currencyMap.get(rate?.to_currency)}${
                        (+receiptAmount / 100).toFixed(2) ?? 0
                      }`
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>

                <IconGen
                  tag="edit"
                  onPress={
                    receiptAmount
                      ? () => {
                          setEditModal(true);
                          setEditType('to');
                        }
                      : () => {}
                  }
                />
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
              <Text
                color="#0E093F"
                size="h3"
                style={{alignItems: 'center', flex: 1}}>
                You're sending: $
                {`${(+amount / 100).toFixed(2)}`
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                <Text
                  onPress={() => {
                    setEditModal(true);
                    setEditType('from');
                  }}
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
                info={
                  rate?.to_currency
                    ? `Exchange rate: ${rate?.to_currency}${rate?.rate}/${rate?.from_currency}1`
                    : ''
                }
                disabled
                onPress={() => setCurrencyModal(true)}
              />
              <Picker
                placeholder={destination}
                label="Destination"
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
      <InfoModal
        isModalOpen={infoModal}
        exchangeRate={`${rate?.to_currency ?? '...'}${rate?.rate ?? '...'}/${
          rate?.from_currency ?? ''
        }1`}
        amountPaid={
          `${amount ?? 0}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
          ` ${rate?.from_currency ?? ''}`
        }
        amountReceived={
          `${rate?.amount ?? 0}`
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
          ` ${rate?.to_currency ?? ''}`
        }
        closeModal={() => setInfoModal(false)}
      />
      <DestinationModal
        isModalOpen={destinationModal}
        destination={destination}
        setDestination={setDestination}
        data={destinations}
        closeModal={() => setDestinationModal(false)}
      />
      <EditModal
        isModalOpen={editModal}
        amount={editType === 'to' ? +receiptAmount : amount}
        currency={currencyMap.get(rate?.to_currency)}
        setAmount={editType === 'to' ? setReceiptAmount : setAmount}
        closeModal={() => setEditModal(false)}
      />
      <Footer
        onFooterPressed={() => {}}
        btnText="Continue"
        btnIcon="arrowRight"
        footerText="Go back"
        footerIcon="arrowLeft"
        onPress={fetchBeneficiaries}
        disabled={
          !destination || !currency || loading.beneficiaries || loading.rate
        }
        loading={loading.beneficiaries}
      />
    </View>
  );
}
