import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import profile from '../../../assets/images/profile.png';
import {complete as s, footer, text} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
export default function ProfileComplete({navigation}) {
  return (
    <View style={s.container}>
      <View style={{paddingHorizontal: scale(24), flex: 1}}>
        <Image source={profile} style={s.image} />
        <View style={s.headerWrapper}>
          <Text style={s.title}>Profile complete</Text>
          <Text style={s.description}>
            You can now access borderless{'\n'}finance with Gen!
          </Text>
        </View>
      </View>
      <View style={footer.container}>
        <Button
          text="Open your first balance"
          iconName="arrowRight"
          onPress={() => navigation.navigate('OpenBalance')}
          // otherStyles={{width: scale(320)}}
          isLoading={false}
          disabled={false}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: scale(24),
            alignItems: 'center',
          }}>
          <IconGen tag="logout" size={0.6} />
          <Text
            style={{
              marginLeft: scale(8),
              color: '#0E093F',
              fontFamily: text.helonikBold,
              fontSize: moderateScale(15),
            }}>
            Return home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
