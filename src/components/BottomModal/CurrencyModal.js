// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   InteractionManager,
// } from 'react-native';
// import BottomModal from "./BottomModal";
// import {IconGen} from "../IconGenerator/IconGenerator";
// import Input from "../Input/Search";
// import Search from "../Input/Search";



// export default function CurrencyModal({
//     selected,
//     currencyList,
//     setCountryCurrency,
//     currencySelected,
//     setCurrencySelected

// }) {
  
//   return (

//     <BottomModal
//       isModalOpen={typeof selected === 'number'}
//       topLine={false}
//       showCloseIcon={false}
//       closeModal={() => {
//         setSelected(null);
//         setCountryCurrency(currencyList);
//         setCurrencySelected(0);
//         setSearchText('');
//       }}
//       containerStyle={{backgroundColor: '#fff'}}>
//       <View>
//         <Input
//           placeHolder="Search for currency"
//           inputStyle={{borderRadius: scale(40)}}
//           hideLine
//           onChangeText={setSearchText}
//           suffix={<IconGen tag="search" />}
//           style={{margin: scale(20)}}
//         />
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {countryCurrency.map((item, i) => {
//           return (
//             <ChooseCurrency
//               imageSource={item.imageSource}
//               countryName={item.countryName}
//               currency={item.slug}
//               index={i}
//               currencySelected={currencySelected}
//               setCurrencySelected={setCurrencySelected}
//             />
//           );
//         })}
//       </ScrollView>
//     </BottomModal>
//   );
// }
