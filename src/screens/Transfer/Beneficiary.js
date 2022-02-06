import React, {useState} from 'react';
import {ScrollView, Text, View, Image} from 'react-native';
import Nav from '../../components/HeaderNav/Nav';
import {scale, moderateScale} from '../../lib/utils/scaleUtils';
import Button from '../../components/Button/Button';
import {onboarding} from '../../../assets/styles/styles';
import Input from '../../components/Input/Input';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import {text, dashboard} from '../../../assets/styles/styles';
import BeneficiaryContainer from '../../components/BeneficiaryContainer/BeneficiaryContainer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Footer from '../../components/Footer/Footer';
import ConfirmTransfer from './components/ConfirmTransfer';

// import RadioForm, {RadioButton} from 'react-native-simple-radio-button';

export default function Beneficiary({navigation}) {
  const [beneficiaryDetail, setBeneficiaryDetail] = useState({});
  const [showConfirmTransfer , setShowConfirmTransfer] = useState(false);
  const apiResponse = [
    {
      email_address: 'chukwuka123@yahoo.com',
      first_name: 'Chukwuka',
      last_name: 'Ezeoke Joseph',
      avatar: '',
    },
    {
      email_address: 'princesscilla@gmail.com',
      first_name: 'Priscilla',
      last_name: 'Agbam',
      avatar: '',
    },
    {
      email_address: 'princesscilla@gmail.com',
      first_name: 'Priscilla',
      last_name: 'Agbam',
      avatar: '',
    },
    {
      email_address: 'princesscilla@gmail.com',
      first_name: 'Priscilla',
      last_name: 'Agbam',
      avatar: '',
    },
    {
      email_address: 'princesscilla@gmail.com',
      first_name: 'Priscilla',
      last_name: 'Agbam',
      avatar: '',
    },
    {
      email_address: 'princesscilla@gmail.com',
      first_name: 'Priscilla',
      last_name: 'Agbam',
      avatar: '',
    },
  ];
  const initialState = {
    email_address: '',
    first_name: '',
    last_name: '',
  };

  const [state, setState] = useState(initialState);
  const [selected, setSelected] = useState(0);
  const [searchText, setSearchText] = useState('');
  return (
    <View style={onboarding.container}>
      <View style={{backgroundColor: '#F7C57C', flex: 1}}>
        <View
          style={{
            ...onboarding.inputContainer,
            paddingHorizontal: scale(0),
            flex: 1,
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
              style={{
                textAlign: 'center',
                marginTop: scale(14),
                borderColor: '#CFBEFF',
                borderWidth: 1,
                borderRadius: scale(12),
                paddingVertical: scale(14),
                backgroundColor: !apiResponse.length ? '#8960FF' : 'none',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: scale(8), color: '#fff'}}>
                  <IconGen
                    tag="addbensvg"
                    color={!apiResponse.length ? '#fff' : '#6939FF'}
                  />
                </Text>

                <Text
                  style={{
                    fontFamily: text.helonikBold,
                    paddingTop: scale(4),
                    color: !apiResponse.length ? '#fff' : '',
                  }}>
                  Add New Beneficiary
                </Text>
              </View>
            </Text>
          </View>

          {apiResponse.length ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                borderRadius: scale(8),
                paddingVertical: scale(16),
                flex: 1,
                marginTop: scale(20),
              }}>
              {apiResponse.map((item, i) => {
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

          <View>
              <ConfirmTransfer 
                  isModalOpen={showConfirmTransfer}
                  closeModal= {() => {setShowConfirmTransfer(false)}}
                  data = {beneficiaryDetail}
              />
          </View>
        </View>
      </View>
      <Footer
        onFooterPressed={() => {
          navigation.goBack();
        }}
        btnText="Continue"
        btnIcon="arrowRight"
        footerText="Go Back"
        footerIcon="arrowLeft"
        disabled={apiResponse.length ? false : true}
      />
    </View>
  );
}
