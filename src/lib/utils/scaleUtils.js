import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = width;
const guidelineBaseHeight = height;
// const guidelineBaseWidth = 414;
// const guidelineBaseHeight = 898;

const scale = size => (width / guidelineBaseWidth) * size;
const autoScale = (size, length) => {
  if (size * length > width) {
    return width / length;
  }
  return moderateScale(size);
};
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {scale, verticalScale, moderateScale, autoScale};
