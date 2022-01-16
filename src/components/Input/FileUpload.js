import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
export default function FileUpload({label, info, icon, setDocument, type}) {
  const [image, setTempImage] = useState(null);
  return (
    <TouchableWithoutFeedback
      onPress={async () => {
        await ImagePicker[
          type === 'camera' ? 'launchCamera' : 'launchImageLibrary'
        ](
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: scale(200),
            maxWidth: scale(200),
          },
          async response => {
            setTempImage(response.assets[0].uri);
            const {
              type,
              fileName: name,
              uri,
              width,
              height,
            } = response.assets[0];
            setDocument({
              type,
              name,
              width,
              height,
              uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
            });
          },
        );
      }}>
      <View style={s.container}>
        <Text style={s.label}>
          {label}
          <Text style={s.asterisks}>*</Text>
        </Text>

        <View style={s.upload}>
          {image ? (
            <Image
              source={{uri: image}}
              width={200}
              height={200}
              style={{width: '100%', height: scale(140)}}
              resizeMode="contain"
            />
          ) : (
            <>
              <IconGen tag={icon} />
              <Text style={s.text}>{info}</Text>
            </>
          )}
        </View>
        <Text
          style={{
            ...s.label,
            marginTop: scale(2),
            fontSize: moderateScale(12),
          }}>
          Attach your file here (up to 5MB)
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  container: {
    // marginTop: scale(24),
  },
  upload: {
    borderStyle: 'dotted',
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingVertical: scale(34),
    paddingHorizontal: scale(16),
    borderColor: '#0E093F',
    alignItems: 'center',
  },
  text: {
    color: '#6939FF',
    fontSize: moderateScale(14),
    fontFamily: text.helonik,
    marginTop: moderateScale(14),
  },
  asterisks: {
    color: '#F23C3C',
    fontFamily: text.helonik,
    fontSize: moderateScale(14),
  },
  label: {
    color: '#0E093F',
    fontSize: moderateScale(14),
    fontFamily: text.helonik,
    lineHeight: scale(20.8),
    marginBottom: scale(8),
    marginTop: scale(24),
  },
});
