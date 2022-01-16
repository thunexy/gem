import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {footer, text} from '../../../../../assets/styles/styles';
import Button from '../../../../components/Button/Button';
import HeaderText from '../../../../components/HeaderText/HeaderText';
import empty from '../../../../../assets/images/profile.png';
import {IconGen} from '../../../../components/IconGenerator/IconGenerator';
import {moderateScale, scale} from '../../../../lib/utils/scaleUtils';
export default function DetailsReady({navigation, route}) {
  return (
    <View style={{flex: 1}}>
      <View style={s.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: scale(24),
            paddingBottom: scale(20),
          }}>
          <Image source={empty} style={s.image} />
          <HeaderText
            title="Your details are ready!"
            description={
              'We successfully verified your documents. A USD account have been opened for you.\n\nFind the details below.'
            }
          />
          <View style={{marginTop: scale(20)}} />
          <View style={s.itemWrapper}>
            <View style={s.item}>
              <Text style={s.title}>Domestic transfer details</Text>
              <Text style={s.info}>For transfers within the US</Text>
              <Text style={s.description}>
                Use these details when you want to receive money sent from a US
                bank account.
              </Text>
              <View style={s.expand}>
                <IconGen tag="ChevronRight" colour="#6939FF" />
              </View>
            </View>
          </View>
          <View style={s.itemWrapper}>
            <View style={s.item}>
              <Text style={s.title}>Domestic transfer details</Text>
              <Text style={s.info}>For transfers within the US</Text>
              <Text style={s.description}>
                Use these details when you want to receive money sent from a US
                bank account.
              </Text>
              <View style={s.expand}>
                <IconGen tag="ChevronRight" colour="#6939FF" />
              </View>
            </View>
          </View>
          <View style={s.information}>
            <Text style={s.infoText}>
              If you want to receive money from a Gen account, you can use your
              email address.
            </Text>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          ...footer.container,
          backgroundColor: '#fff',
          position: 'relative',
        }}>
        <Button
          text={route.params?.final ? 'Fund Account' : 'Save & Continue'}
          iconName="arrowRight"
          onPress={() => {}}
          isLoading={false}
          disabled={false}
          info={route?.params?.final ? '' : '3/3'}
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: scale(28),
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: scale(8),
              color: '#6939FF',
              fontFamily: text.helonikBold,
              fontSize: moderateScale(16),
            }}>
            Go to account >>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF2EB',
  },
  image: {
    width: scale(72),
    marginTop: scale(20),
    height: scale(72),
    alignSelf: 'flex-end',
  },
  itemWrapper: {
    marginBottom: scale(12),
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(16),
  },
  title: {
    fontSize: moderateScale(20),
    color: '#0E093F',
    marginBottom: scale(8),
    fontFamily: text.helonikBold,
  },
  info: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16.5),
    color: '#6939FF',
    marginBottom: scale(24),
    fontFamily: text.helonikBold,
    letterSpacing: moderateScale(0.2),
  },
  description: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
    color: '#4A476F',
    fontFamily: text.helonik,
    letterSpacing: moderateScale(0.2),
  },
  expand: {
    position: 'absolute',
    right: scale(16),
    bottom: scale(16),
  },
  information: {
    padding: scale(16),
    borderRadius: scale(12),
    backgroundColor: '#F9E1B8',
  },
  infoText: {
    color: '#0E093F',
    fontFamily: text.helonik,
    fontSize: moderateScale(14),
    lineHeight: scale(21),
    letterSpacing: scale(0.2),
  },
});
