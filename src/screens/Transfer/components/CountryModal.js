import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import flags from '../../../../assets/images/flags/flags';
import BottomModal from '../../../components/BottomModal/BottomModal';
import ChooseCurrency from '../../../components/Currency/ChooseCurrency';
import {IconGen} from '../../../components/IconGenerator/IconGenerator';
import Input from '../../../components/Input/Input';
import {scale} from '../../../lib/utils/scaleUtils';

// import { Image } from 'react-native-svg';

export default function CountryModal({isModalOpen}) {
  const [selected, setSelected] = useState(null);
  const [currencySelected, setCurrencySelected] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [countryCurrency, setCountryCurrency] = useState([]);
  const currencyList = [
    {
      countryName: 'United States Dollar',
      slug: 'USD',
      imageSource: flags.usa,
    },
    {
      countryName: 'Nigerian Naira',
      slug: 'NGN',
      imageSource: flags.nigeria,
    },

    {
      countryName: 'South African Rand',
      slug: 'ZAR',
      imageSource: flags.south_africa,
    },

    {
      countryName: 'Egyptian Pound',
      slug: 'EGP',
      imageSource: flags.egypt,
    },
    {
      countryName: 'Algerian Dinar',
      slug: 'DZD',
      imageSource: flags.algeria,
    },
    {
      countryName: 'Ghanian Cedi',
      slug: 'GHS',
      imageSource: flags.ghana,
    },
    {
      countryName: 'Ghan Cedi',
      slug: 'GHS',
      imageSource: flags.ghana,
    },
  ];

  useEffect(() => {
    setCountryCurrency(currencyList);
  }, []);

  useEffect(() => {
    let testArray;
    testArray = [];


    searchText.length
      ? (testArray = countryCurrency.filter(item => {
          if (
            item.countryName.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return item;
          }
        }))
      : (testArray = []);
    if (testArray.length) {
      setCountryCurrency(testArray);
    } else {
      setCountryCurrency(currencyList);
    }
  }, [searchText]);

  return (
    <BottomModal
      isModalOpen={isModalOpen}
      topLine={false}
      showCloseIcon={false}
      closeModal={() => {
        setSelected(null);
        setSearchText('');
        setCurrencySelected(0);
        setCountryCurrency(currencyList);
      }}
      containerStyle={{backgroundColor: '#fff'}}>
      <View>
        <Input
          placeHolder="Search for currency"
          inputStyle={{borderRadius: scale(40)}}
          hideLine
          onChangeText={setSearchText}
          suffix={<IconGen tag="search" />}
          style={{margin: scale(20)}}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {countryCurrency.map((item, i) => {
          return (
            <ChooseCurrency
              imageSource={item.imageSource}
              countryName={item.countryName}
              currency={item.slug}
              index={i}
              currencySelected={currencySelected}
              setCurrencySelected={setCurrencySelected}
            />
          );
        })}
      </ScrollView>
    </BottomModal>
  );
}
