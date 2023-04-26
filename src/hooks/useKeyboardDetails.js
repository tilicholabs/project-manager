import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export const useKeyboardDetails = (
  initialValue = {height: 0, isVisible: false},
) => {
  const [keyboardDetails, setKeyboardDetails] = useState(initialValue);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      response => {
        setKeyboardDetails(prv => ({
          ...prv,
          isVisible: true,
          height: response?.endCoordinates?.height,
        }));
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardDetails(prv => ({
          ...prv,
          isVisible: false,
        }));
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return [keyboardDetails, setKeyboardDetails];
};
