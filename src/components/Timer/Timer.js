import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {otp} from '../../../assets/styles/styles';
export default function Timer({timeVal, onResend, sent, setSent, sending}) {
  const [rem, setRem] = useState(timeVal - 1);
  let timer;

  const setTimer = () => {
    timer = setTimeout(() => {
      setRem(rem - 1);
    }, 1000);
  };

  useEffect(() => {
    setTimer();
    if (rem < 1) {
      clearTimeout(timer);
      setSent(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [rem]);
  useEffect(() => {
    if (sent) {
      setRem(timeVal - 1);
    }
  }, [sent]);
  return (
    <>
      {rem > 0 && (
        <Text style={otp.timer}>
          {Math.floor(rem / 60)}
          min{' '}
          {Math.floor(rem % 60)
            .toString()
            .padStart(2, '0')}
          sec{rem < 2 ? '' : 's'}
        </Text>
      )}
      {typeof sent === 'undefined' ? null : !sent ? (
        <Text style={otp.noCode}>
          Didn’t get a code?{' '}
          <Text
            style={[otp.bold, {color: rem < 1 ? '#0E093F' : 'grey'}]}
            onPress={() => {
              clearTimeout(timer);
              onResend();
            }}>
            Resend{sending ? 'ing...' : ''}
          </Text>
        </Text>
      ) : (
        <Text
          style={otp.noCode}
          onPress={() => {
            setRem(timeVal);
            onResend();
          }}>
          Code sent!
        </Text>
      )}
    </>
  );
}
