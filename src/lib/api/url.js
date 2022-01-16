const baseUrl = 'https://genbank.techdev.work/api/v1';

export const signupUrl = `${baseUrl}/customers/customer/signup`;
export const loginUrl = `${baseUrl}/customers/customer/login/with-email`;
export const loginWithPinUrl = `${baseUrl}/customers/customer/login/with-email-and-pin`;
export const pinUrl = `${baseUrl}/customers/customer/set-pin`;
export const forgotPasswordUrl = `${baseUrl}/customers/`;
export const resetPasswordUrl = `${baseUrl}/customers/customer/password/reset`;
export const signupVerifyUrl = `${baseUrl}/customers/customer/signup/verify`;
export const passwordResetVerifyUrl = `${baseUrl}/customers/customer/password/reset/validate`;
export const passwordResetCompleteUrl = `${baseUrl}/customers/customer/password/reset/complete`;
export const securityUrl = `${baseUrl}/onboarding/secret/add`;
export const updateProfileUrl = `${baseUrl}/onboarding/profile/update`;
export const mobileOtpUrl = `${baseUrl}/customers/customer/signup/otp/resend`;
export const passwordResetOtpResendUrl = `${baseUrl}/customers/customer/password/reset/otp/resend`;
export const countriesUrl = `${baseUrl}/onboarding/countries`;
export const statesUrl = `${baseUrl}/onboarding/states`;
export const stepsUrl = `${baseUrl}/onboarding/steps`;
export const createBalanceUrl = `${baseUrl}/account/create`;
export const initiateFundUrl = `${baseUrl}/fund/initiate`;
export const resolveCustomerUrl = `${baseUrl}/fund/resolve/gen/customer`;
export const wireTransferUrl = `${baseUrl}/fund/wire`;
export const requestMoneyUrl = `${baseUrl}/fund/request/money`;
export const fundEndUrl = `${baseUrl}/fund/end`;
export const getUserDetailsUrl = `${baseUrl}/customers/customer/me`;
export const fundRequestUrl = `${baseUrl}/fund/request/money/from/me`;
export const acceptMoneyUrl = `${baseUrl}/fund/accept/money`;