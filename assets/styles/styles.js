import {StyleSheet} from 'react-native';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../src/lib/utils/scaleUtils';

export const text = StyleSheet.create({
  monument: 'MonumentExtended-Regular',
  helonik: 'helonik',
  helonikBold: 'helonikBold',
});

export const bottomModalStyle = StyleSheet.create({
  container: {
    borderTopRightRadius: scale(12),
    borderTopLeftRadius: scale(12),
    // paddingBottom: scale(10),
    maxHeight: verticalScale(700),
    margin: 0,
    justifyContent: 'flex-end',
  },
  topLine: {
    backgroundColor: '#C9C9C9',
    borderRadius: scale(10),
    width: scale(30),
    alignSelf: 'center',
    height: scale(5),
    marginBottom: scale(15),
  },
  headerContainer: {
    flexDirection: 'row',
    paddingBottom: scale(10),
  },
  // headerText: {
  //   fontFamily: text.font_averta_bold.fontFamily,
  //   color: colours.quicktellerSubText,
  //   textAlign: 'center',
  //   justifyContent: 'center',
  //   fontSize: moderateScale(text.h5.fontSize),
  // },
});

export const reg = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF1EA',
  },
  headerWrapper: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(18),
  },
  termsHeader: {
    position: 'absolute',
    opacity: 0.5,
    width: '100%',
    zIndex: 2,
    // height: verticalScale(400),
    backgroundColor: '#87849F',
  },
  termsContent: {
    // position: 'absolute',
    bottom: 0,
    zIndex: 3,
    width: '100%',
    // backgroundColor: '#ffffff',
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    paddingTop: scale(52),
    maxHeight: verticalScale(700),
  },
  title: {
    marginTop: verticalScale(18),
    fontSize: moderateScale(22),
    color: '#0E093F',
    fontFamily: text.monument,
  },
  termsTitle: {
    // marginTop: scale(16),
    fontSize: moderateScale(22),
    lineHeight: moderateScale(28),
    color: '#0E093F',
    fontFamily: text.monument,
  },
  description: {
    marginTop: scale(8),
    fontSize: moderateScale(16),
    lineHeight: moderateScale(23),
    color: '#4A476F',
    fontFamily: text.helonik,
    letterSpacing: moderateScale(0.2),
  },
  termsDescription: {
    marginTop: scale(16),
    marginBottom: scale(16),
    fontSize: moderateScale(16),
    lineHeight: scale(24),
    color: '#4A476F',
    fontFamily: text.helonik,
  },
  inputContainer: {
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(24),
  },
  personalInfo: {
    color: '#0C093E',
    fontSize: moderateScale(16),
    fontFamily: text.monument,
    lineHeight: scale(19),
    marginBottom: scale(8),
  },
  extraText: {
    color: '#0E093F',
    textAlign: 'center',
    fontFamily: text.helonik,
    fontSize: moderateScale(16.5),
    paddingTop: scale(24),
    paddingBottom: scale(12),
  },
  extraTextBold: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  privacy: {
    color: '#4A476F',
    textAlign: 'left',
    fontFamily: text.helonik,
    fontSize: moderateScale(14),
    lineHeight: scale(24),
    marginTop: scale(20),
    letterSpacing: moderateScale(0.2),
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export const login = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(15),
    backgroundColor: '#FAF2EB',
  },
  title: {
    marginTop: scale(64),
    fontSize: moderateScale(21),
    lineHeight: scale(29),
    color: '#0E093F',
    fontFamily: text.monument,
  },
  description: {
    marginTop: scale(4),
    marginBottom: scale(24),
    fontSize: moderateScale(14),
    color: '#4A476F',
    fontFamily: text.helonik,
    letterSpacing: moderateScale(0.2),
  },
  inputContainer: {
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    backgroundColor: '#ffffff',
    paddingHorizontal: moderateScale(24),
    paddingBottom: scale(24),
    flex: 1,
  },
  help: {
    fontSize: moderateScale(13),
    lineHeight: moderateScale(16),
    color: '#6939FF',
    fontFamily: text.helonikBold,
    paddingTop: scale(16),
    letterSpacing: moderateScale(0.1),
  },
  underline: {
    textDecorationLine: 'underline',
  },
  noAccount: {
    fontSize: moderateScale(15),
    lineHeight: scale(18),
    color: '#4A476F',
    fontFamily: text.helonik,
    marginTop: scale(28),
    textAlign: 'center',
    letterSpacing: moderateScale(0.02),
  },
  createAccount: {
    fontSize: moderateScale(17),
    lineHeight: scale(21),
    color: '#6939FF',
    fontFamily: text.helonikBold,
    paddingVertical: scale(12),
    textAlign: 'center',
  },
});

export const onboarding = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    paddingHorizontal: scale(24),
    paddingTop: scale(16),
    backgroundColor: '#6939FF',
  },
  title: {
    marginTop: scale(24),
    fontSize: moderateScale(20),
    lineHeight: scale(33.6),
    color: '#fff',
    fontFamily: text.helonik,
  },
  description: {
    marginTop: scale(4),
    marginBottom: scale(24),
    fontSize: moderateScale(14),
    lineHeight: scale(23),
    color: '#CFBEFF',
    fontFamily: text.helonik,
    letterSpacing: scale(0.4),
  },
  personalInfo: {
    color: '#0C093E',
    fontSize: moderateScale(18),
    fontFamily: text.helonikBold,
    lineHeight: scale(23),
    letterSpacing: -scale(0.2),
  },
  inputContainer: {
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    backgroundColor: '#ffffff',
    padding: scale(24),
  },
  help: {
    fontSize: moderateScale(14),
    lineHeight: scale(16),
    color: '#6939FF',
    fontFamily: text.helonikBold,
    marginTop: scale(16),
  },
  underline: {
    textDecorationLine: 'underline',
  },
  noAccount: {
    fontSize: moderateScale(16),
    lineHeight: scale(18),
    color: '#4A476F',
    fontFamily: text.helonikBold,
    marginTop: scale(28),
    textAlign: 'center',
  },
  createAccount: {
    fontSize: moderateScale(18),
    lineHeight: scale(21),
    color: '#6939FF',
    fontFamily: text.helonikBold,
    marginTop: scale(12),
    textAlign: 'center',
  },
  label: {
    color: '#0E093F',
    fontSize: moderateScale(14),
    fontFamily: text.helonik,
    lineHeight: scale(20.8),
    marginBottom: scale(8),
    marginTop: scale(30),
  },
  asterisks: {
    color: '#F23C3C',
    fontFamily: text.helonik,
    fontSize: moderateScale(14),
  },
  input: {
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    fontFamily: text.helonik,
    color: '#0E093F',
    fontSize: moderateScale(16),
    letterSpacing: moderateScale(0.1),
  },
  inputText: {
    fontFamily: text.helonik,
    fontSize: moderateScale(16),
    color: '#0E093F',
  },
  instructions: {
    // width: scale(260),
    color: '#4A476F',
    fontSize: moderateScale(13),
    lineHeight: scale(18),
    letterSpacing: scale(0.5),
    fontFamily: text.helonik,
    marginBottom: scale(40),
    marginTop: scale(8),
  },
  line: {
    position: 'absolute',
    bottom: scale(1),
    height: scale(3),
    backgroundColor: '#CFBEFF',
    opacity: 0.5,
    width: scale(360),
    marginLeft: scale(3),
    borderBottomLeftRadius: scale(24),
    borderBottomRightRadius: scale(24),
  },
});

export const complete = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: scale(24),
  },
  image: {
    marginTop: scale(40),
    width: scale(64),
    height: scale(64),
  },
  headerWrapper: {
    paddingTop: scale(16),
  },
  title: {
    fontSize: moderateScale(20),
    lineHeight: scale(33.6),
    color: '#0E093F',
    fontFamily: text.helonik,
  },
  description: {
    marginTop: scale(8),
    fontSize: moderateScale(14),
    lineHeight: scale(23),
    color: '#4A476F',
    fontFamily: text.helonik,
    letterSpacing: scale(0.4),
  },
});

export const forgot = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF1EA',
  },
  headerWrapper: {
    paddingHorizontal: scale(24),
    paddingTop: scale(40),
  },
  title: {
    marginTop: verticalScale(200),
    fontSize: moderateScale(22),
    lineHeight: scale(28),
    color: '#0E093F',
    fontFamily: text.monument,
  },
  description: {
    marginTop: scale(4),
    marginBottom: scale(24),
    fontSize: moderateScale(15),
    lineHeight: scale(23),
    color: '#4A476F',
    fontFamily: text.helonik,
    letterSpacing: scale(0.2),
  },
  inputContainer: {
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(24),
    flex: 1,
  },
});

export const reset = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF1EA',
  },
  headerWrapper: {
    paddingHorizontal: scale(24),
    paddingTop: scale(40),
  },
  title: {
    marginTop: verticalScale(150),
    fontSize: moderateScale(22),
    lineHeight: scale(28),
    color: '#0E093F',
    fontFamily: text.monument,
  },
  description: {
    marginTop: scale(4),
    marginBottom: scale(24),
    fontSize: moderateScale(13),
    lineHeight: scale(18),
    color: '#4A476F',
    fontFamily: text.helonik,
  },
  inputContainer: {
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(24),
    flex: 1,
  },
  helper: {
    fontSize: moderateScale(12),
    lineHeight: scale(14),
    marginTop: scale(8),
    color: '#4A476F',
    fontFamily: text.helonik,
  },
});

export const otp = StyleSheet.create({
  eclipse: {
    backgroundColor: '#F9E1B8',
    width: scale(96),
    height: scale(96),
    borderRadius: scale(48),
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    paddingHorizontal: scale(24),
    paddingTop: scale(40),
    backgroundColor: '#FAF1EA',
  },
  title: {
    marginTop: scale(32),
    fontSize: moderateScale(22),
    lineHeight: scale(28),
    color: '#0E093F',
    textAlign: 'center',
    fontFamily: text.monument,
  },
  description: {
    marginTop: scale(4),
    marginBottom: scale(42),
    fontSize: moderateScale(13),
    lineHeight: moderateScale(19),
    textAlign: 'center',
    color: '#4A476F',
    fontFamily: text.helonik,
    letterSpacing: moderateScale(0.2),
  },
  inputContainer: {
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    backgroundColor: '#ffffff',
    padding: scale(24),
    paddingTop: scale(48),
    flex: 1,
  },
  help: {
    fontSize: moderateScale(14),
    lineHeight: scale(16),
    color: '#6939FF',
    fontFamily: text.helonik,
    marginTop: scale(16),
    fontWeight: 'bold',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  timer: {
    fontSize: moderateScale(16),
    lineHeight: scale(21),
    color: '#4A476F',
    fontFamily: text.helonik,
    textAlign: 'center',
  },
  noCode: {
    fontSize: moderateScale(18),
    lineHeight: scale(21),
    color: '#0E093F',
    fontFamily: text.helonik,
    paddingTop: scale(12),
    textAlign: 'center',
  },
  sendEmail: {
    fontSize: moderateScale(16),
    lineHeight: scale(19),
    color: '#6939FF',
    fontFamily: text.helonik,
    marginTop: scale(16),
    paddingTop: scale(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export const welcome = StyleSheet.create({
  eclipse: {
    backgroundColor: '#F9E1B8',
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    marginTop: scale(32),
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#0E81FF',
  },
  title: {
    marginTop: scale(52),
    fontSize: moderateScale(52),
    lineHeight: moderateScale(62.4),
    color: '#FAF2EB',
    fontFamily: text.monument,
  },
  description: {
    marginTop: scale(8),
    marginBottom: scale(42),
    fontSize: moderateScale(16),
    lineHeight: scale(22.4),
    color: '#E6F4FF',
    fontFamily: text.helonik,
  },
  inputContainer: {
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    backgroundColor: '#ffffff',
    padding: scale(24),
    paddingTop: scale(48),
  },
});

export const dashboard = StyleSheet.create({
  container: {
    paddingHorizontal: scale(24),
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  greetings: {
    fontSize: moderateScale(22),
    // lineHeight: scale(25),
    fontFamily: text.helonik,
    color: '#0E093F',
    flex: 1,
  },
  inactiveBtn: {
    padding: scale(12),
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: '#C3C1CF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    marginRight: scale(8),
    color: '#C3C1CF',
    fontSize: moderateScale(12),
  },
  header: {
    height: scale(72),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    marginTop: scale(20),
  },
  progress: {
    position: 'relative',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  achieved: {
    backgroundColor: '#DCF995',
    borderTopLeftRadius: scale(6),
    borderBottomLeftRadius: scale(6),
  },
  rem: {
    backgroundColor: '#F5F9E4',
    flex: 1,
    borderTopRightRadius: scale(6),
    borderBottomRightRadius: scale(6),
  },
  progressText: {
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
    paddingBottom: scale(10),
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
    color: '#0E093F',
    fontFamily: text.helonik,
    letterSpacing: moderateScale(0.2),
  },
  completeProfile: {
    paddingTop: scale(10),
    paddingBottom: scale(14),
    paddingRight: scale(16),
    textAlign: 'right',
    color: '#6939FF',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16),
    fontFamily: text.helonik,
  },
  title: {
    marginTop: scale(32),
    marginBottom: scale(18),
    color: '#0E093F',
    fontFamily: text.helonikBold,
    fontSize: moderateScale(20),
  },
  empty: {
    width: scale(100),
    height: scale(100),
    alignSelf: 'center',
  },
  noAccount: {
    marginTop: scale(16),
    marginBottom: scale(14),
    color: '#0E093F',
    fontFamily: text.helonik,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(22.4),
    letterSpacing: moderateScale(0.2),
  },
});

export const openBalance = StyleSheet.create({
  container: {
    backgroundColor: '#FAF2EB',
    paddingHorizontal: scale(24),
    flex: 1,
  },
  title: {},
  description: {},
});

export const footer = StyleSheet.create({
  container: {
    paddingHorizontal: scale(24),
    paddingTop: scale(20),
    paddingBottom: scale(20),
    borderTopColor: '#F4F4F6',
    borderTopWidth: scale(2),
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
});
