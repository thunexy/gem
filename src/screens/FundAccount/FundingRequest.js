import React, { useContext } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { onboarding, text } from '../../../assets/styles/styles';
import Nav from '../../components/HeaderNav/Nav';
import { AppContext } from '../../controllers/AppContext';
import { moderateScale, scale } from '../../lib/utils/scaleUtils';
export default function FundingRequest({navigation}) {
  const { dispatch, fundRequests } = useContext(AppContext);
  // useEffect(() => {
  //   apiRequest(fundRequestUrl, 'get')
  //     .then(res => {
  //       console.log(res);
  //       // dispatch(updateProfile(res));
  //     })
  //     .catch(e => {});
  // }, []);
  return (
    <View style={onboarding.container}>
      <View style={{backgroundColor: '#DCF995', flex: 1}}>
        <View
          style={{
            ...onboarding.inputContainer,
            flex: 1,
            paddingHorizontal: scale(0),
          }}>
          <Nav
            title="Funding request"
            description="You just received a funding request."
            onClose={navigation.goBack}
          />
          <View style={{flex: 1}}>
            {fundRequests.length ? (
              <FlatList
                data={fundRequests}
                keyExtractor={(_, i) => i + ''}
                renderItem={({_, item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('HowTo', {sender: true, ...item})
                      }
                      style={{
                        padding: scale(12),
                        backgroundColor: '#F4F4F6',
                        borderRadius: scale(12),
                        marginHorizontal: scale(24),
                        marginBottom: scale(24),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: scale(12),
                          marginBottom: scale(24),
                        }}>
                        <Image
                          source={require('../../../assets/images/empty.png')}
                          style={{width: scale(48), height: scale(48)}}
                        />
                        <Text
                          style={{
                            fontSize: moderateScale(16),
                            fontFamily: text.helonik,
                            letterSpacing: moderateScale(0.1),
                            color: '#0E093F',
                            marginLeft: scale(8),
                          }}>
                          {item.request_by_name} requested for:
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: moderateScale(32),
                          fontFamily: text.monument,
                          letterSpacing: moderateScale(0.1),
                          color: '#0E093F',
                          textAlign: 'right',
                        }}>
                        <Text style={{color: '#6939FF'}}>$</Text>
                        {item.amount}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: text.helonik,
                    fontSize: scale(14),
                    color: '#ddd',
                  }}>
                  No request available
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* {fundRequests.length ? (
        <View style={{...footer.container, backgroundColor: '#F8F5FF'}}>
          <Button
            text="Send Money"
            iconName="arrowRight"
            onPress={() => {
              navigation.navigate('HowTo', {sender: true, ...fundRequests[0]});
            }}
            isLoading={false}
          />
        </View>
      ) : null} */}
    </View>
  );
}
