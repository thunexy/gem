import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import BottomModal from '../../components/BottomModal/BottomModal';
import HeaderText from '../../components/HeaderText/HeaderText';
import Input from '../../components/Input/Input';
import {scale, moderateScale} from '../../lib/utils/scaleUtils';
import Picker from 'react-native-picker-select';
import InfoText from '../../components/InfoText/infoText';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import {text} from '../../../assets/styles/styles';
// import { moderateScale , scale } from '../../lib/utils/scaleUtils';

export default function Beneficiary() {
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
    <View>
      <TouchableOpacity
        onPress={() => {
          setSelected(1);
        }}>
        <Text>Open Beneficiary Modal</Text>
      </TouchableOpacity>

      <BottomModal
        isModalOpen={typeof selected == 'number'}
        topline={false}
        showCloseIcon={true}
        closeModal={() => {
          setSelected(null);
        }}
        containerStyle={{
          backgroundColor: '#fff',
        }}>
        <View style={{padding: scale(24)}}>
          <HeaderText
            title="Add a beneficiary"
            textStyle={{fontFamily: text.helonikBold}}
          />
          <TouchableOpacity
            onPress={() => {
              setShowInnerModal(1);
            }}>
            <View>
              <Input
                label="Beneficiary Type"
                value={inputValue}
                editable={false}
              />
            </View>
          </TouchableOpacity>

          <BottomModal
            isModalOpen={typeof showInnerModal == 'number'}
            showCloseIcon={false}
            closeModal={() => {
              setShowInnerModal(null);
            }}
            containerStyle={{
              backgroundColor: '#fff',
            }}>
            <View style={{marginTop: scale(22), marginBottom: scale(26)}}>
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
                  <IconGen />
                  <View
                    style={{
                      paddingHorizontal: scale(30),
                      flexDirection: 'row',
                      paddingVertical: scale(20),
                    }}>
                    <IconGen tag="logo" size={1.5} />
                    <Text
                      style={{
                        marginLeft: scale(18),
                        fontFamily: text.helonik,
                        fontSize: moderateScale(20),
                        paddingTop: scale(10),
                      }}>
                      Gen Account
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Other Selected  */}

              <TouchableOpacity
                onPress={() => {
                  setGenAcctSelected(!genAcctSelected);
                  setOtherSelected(!otherSelected);
                  setInputValue('Others');
                  setShowInnerModal(null);
                }}>
                <View
                  style={{
                    backgroundColor: otherSelected ? '#F5F9E4' : '#fff',
                  }}>
                  <IconGen />
                  <View
                    style={{
                      paddingHorizontal: scale(30),
                      flexDirection: 'row',
                      paddingVertical: scale(20),
                    }}>
                    <IconGen tag="location" size={1.5} />
                    <Text
                      style={{
                        marginLeft: scale(18),
                        fontFamily: text.helonik,
                        fontSize: moderateScale(20),
                        paddingTop: scale(10),
                      }}>
                      Others
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </BottomModal>

          <Input label="Email Address" onChangeText={setEmailInput} />

          <View style={{marginTop: scale(80)}}>
            <InfoText text="Kindly ensure using correct account details" />
          </View>
        </View>
        <View
          style={{
            borderTopColor: '#CFBEFF',
            borderWidth: 0.5,
            padding: scale(20),
          }}>
          <Button disabled={buttonDisabled} text="save beneficiary" />
        </View>
      </BottomModal>
    </View>
  );
}
