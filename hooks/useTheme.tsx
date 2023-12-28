import {useColorScheme} from 'react-native';
import {blackTxt, titleTxt, white} from '../Components/colors';

const useTheme = () => {
  const theme = useColorScheme();
  if (theme === 'dark') {
    return {
      background: '#111',
      imageBackground: titleTxt,
      txtColor: blackTxt,
      opacity: null,
    };
  } else {
    return {
      background: '#EEE',
      imageBackground: white,
      txtColor: titleTxt,
      opacity: '#FFFFFF95',
    };
  }
};

export default useTheme;
