import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {text} from '../../../../assets/styles/styles';
import BottomModal from '../../../components/BottomModal/BottomModal';
import {IconGen} from '../../../components/IconGenerator/IconGenerator';
import Text from '../../../components/Text/Text';
import {moderateScale, scale} from '../../../lib/utils/scaleUtils';
// import { moderateScale , scale } from '../../lib/utils/scaleUtils';

export default function DestinationModal({isModalOpen, closeModal = () => {}}) {
  const [selected, setSelected] = useState(null);
  const [typeOfAccount, setTypeOfAccount] = useState('');
  const [inputValue, setInputValue] = useState('Gen Account');
  const [showInnerModal, setShowInnerModal] = useState(null);
  const [genAcctSelected, setGenAcctSelected] = useState(true);
  const [otherSelected, setOtherSelected] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailInput, setEmailInput] = useState(true);

  useEffect(() => {
    emailInput.length >= 3 ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [emailInput]);

  return (
    <BottomModal
      isModalOpen={isModalOpen}
      showCloseIcon={false}
      closeModal={closeModal}
      dismissable={true}
      containerStyle={{
        backgroundColor: '#fff',
        paddingTop: scale(10),
      }}>
      <View style={{paddingTop: scale(12), marginBottom: scale(26)}}>
        {[
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
        ].map(({icon, title}) => (
          <TouchableOpacity
            onPress={() => {
              setGenAcctSelected(!genAcctSelected);
              setOtherSelected(!otherSelected);
              setInputValue('Gen Account');
              setShowInnerModal(null);
            }}>
            <View
              style={{
                backgroundColor: genAcctSelected ? '#F5F9E4' : '#fff',
              }}>
              <View
                style={{
                  paddingHorizontal: scale(30),
                  flexDirection: 'row',
                  paddingVertical: scale(20),
                  alignItems: 'center',
                }}>
                <IconGen tag={icon} size={1} />
                <Text
                  size="h3"
                  style={{
                    marginLeft: scale(18),
                  }}>
                  {title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </BottomModal>
  );
}
