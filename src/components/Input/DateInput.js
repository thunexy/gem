import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInputMask} from 'react-native-masked-text';
import {onboarding, text} from '../../../assets/styles/styles';
import {getFormattedDate} from '../../lib/utils/dateUtils';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
export default function DateInput({
  onChangeText,
  value,
  onBlur = () => {},
  label,
  onPress,
  onConfirm,
  showError,
  error,
}) {
  const [showPicker, setShowPicker] = useState(false);
  return (
    <View>
      <View style={[{position: 'relative'}]}>
        <Text style={onboarding.label}>
          {label}
          <Text style={onboarding.asterisks}>*</Text>
        </Text>
        <DatePicker
          modal
          open={showPicker}
          date={new Date(value)}
          mode="date"
          textColor="#6939FF"
          onConfirm={date => {
            setShowPicker(false);
            onConfirm(date);
          }}
          onCancel={() => {
            setShowPicker(false);
          }}
        />
        <TextInputMask
          type="datetime"
          value={getFormattedDate(value)}
          options={{
            format: 'DD-MM-YYYY',
          }}
          style={onboarding.input}
          placeholder="Choose Date"
          placeholderTextColor={'#C2C3C3'}
          onBlur={onBlur}
          // editable={!state.isModalOpen}
          onFocus={() => setShowPicker(true)}
        />
        <View style={onboarding.line} />
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(15),
            right: scale(14),
          }}>
          <IconGen tag="calendar" onPress={() => setShowPicker(true)} />
        </View>
      </View>
      {showError ? (
        <View style={style.errorContainer}>
          <IconGen tag="error" />
          <Text style={style.error}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const style = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(8),
  },
  error: {
    color: '#F23C3C',
    fontFamily: text.helonik,
    fontSize: moderateScale(12),
    // lineHeight: scale(14),
    marginLeft: scale(4),
  },
});
