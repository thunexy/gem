import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {footer, text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import Button from '../Button/Button';
import {IconGen} from '../IconGenerator/IconGenerator';
export default function Footer({
  btnText,
  btnIcon,
  onPress = () => {},
  loading,
  disabled,
  info,
  footerIcon,
  footerText,
  onFooterPressed = () => {},
}) {
  return (
    <View
      style={{
        ...footer.container,
        backgroundColor: '#fff',
        position: 'relative',
        paddingBottom: scale(10),
      }}>
      <Button
        text={btnText}
        iconName={btnIcon}
        onPress={onPress}
        isLoading={loading}
        disabled={disabled}
        info={info}
      />
      {footerText || footerIcon ? (
        <TouchableOpacity
          onPress={onFooterPressed}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: scale(28),
            alignItems: 'center',
          }}>
          <IconGen tag={footerIcon} />
          <Text
            style={{
              marginLeft: scale(8),
              color: '#0E093F',
              fontFamily: text.helonikBold,
              fontSize: moderateScale(16),
            }}>
            {footerText}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
