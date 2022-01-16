import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {footer, openBalance, text} from '../../../../assets/styles/styles';
import BottomModal from '../../../components/BottomModal/BottomModal';
import Button from '../../../components/Button/Button';
import HeaderNav from '../../../components/HeaderNav/HeaderNav';
import HeaderText from '../../../components/HeaderText/HeaderText';
import {IconGen} from '../../../components/IconGenerator/IconGenerator';
import {
  verticalScale,
  scale,
  moderateScale,
} from '../../../lib/utils/scaleUtils';
import BalanceItem from './components/BalanceItem';
import OpenNaira from './components/modals/OpenNaira';
import OpenRand from './components/modals/OpenRand';
import OpenUSD from './components/modals/OpenUSD';
export default function OpenBalance({navigation}) {
  const {container, title, description} = openBalance;
  const [selected, setSelected] = useState(null);
  const items = [
    {
      name: 'Local Naira Balance',
      country: 'NIGERIA',
      description:
        'You can fund, save, send, and receive naira with this account.',
    },
    {
      name: 'Local Rand Balance',
      country: 'SOUTH AFRICA',
      description:
        'You can fund, save, send, and receive naira with this account.',
    },
    {
      name: 'International Dollar Balance',
      country: 'UNITED STATES',
      description:
        'You can fund, save, send, and receive naira with this account.',
    },
  ];
  return (
    <View style={container}>
      <HeaderNav
        onPress={() => navigation.navigate('Dashboard')}
        text="Go back"
        icon="ChevronLeft"
      />
      <HeaderText
        title="Open a Balance"
        description="You can open a local account and a US account."
        style={{marginBottom: scale(60)}}
      />
      {items.map(({name, country, description}, i) => (
        <BalanceItem
          key={i}
          name={name}
          country={country}
          description={description}
          onPress={() => setSelected(i)}
        />
      ))}
      <BottomModal
        isModalOpen={typeof selected === 'number'}
        topLine={false}
        showCloseIcon
        closeModal={() => setSelected(null)}
        containerStyle={{backgroundColor: '#fff', paddingTop: scale(20)}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {selected === 0 ? <OpenNaira /> : null}
          {selected === 1 ? <OpenRand /> : null}
          {selected === 2 ? <OpenUSD /> : null}
        </ScrollView>
        <View style={[footer.container, {paddingBottom: 0}]}>
          <Button
            text="Proceed"
            iconName="arrowRight"
            onPress={() => {
              selected === 2 && navigation.navigate('VerifyIdentity');
              selected === 1 &&
                navigation.navigate('DetailsReady', {final: true});
              selected === 0 &&
                navigation.navigate('DetailsReady', {final: true});
              setSelected(null);
            }}
            isLoading={false}
            disabled={false}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Dashboard')}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: scale(24),
              paddingBottom: scale(20),
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginLeft: scale(8),
                color: '#0E093F',
                fontFamily: text.helonikBold,
                fontSize: moderateScale(15),
              }}>
              I'll be back >>
            </Text>
          </TouchableOpacity>
        </View>
      </BottomModal>
    </View>
  );
}
