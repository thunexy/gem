import React from 'react';
import {View , TextInput , Text , StyleSheet} from 'react-native';
import { verticalScale , scale , moderateScale } from '../../lib/utils/scaleUtils';


export default Search = () => {
    return(
        <View>
            <TextInput style = {styles.searchText}/>
        
        </View>
    )
}


const styles = StyleSheet.create({
  searchText: {
    borderWidth: 1,
    borderRadius: scale(50),
    borderColor: '#0E093F',

  },
});