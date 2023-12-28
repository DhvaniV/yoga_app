import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import {yogaSymbol} from '../Components/assests';
import {Scale, screenHeight, screenWidth} from '../Components/scale';
import {
  blackTxt,
  buttonColor,
  grey,
  txtColor,
  white,
} from '../Components/colors';
import useTheme from '../hooks/useTheme';
import {useScale} from '../hooks/Dimensions';

const WelcomeScreen = ({navigation}: any) => {
  const theme = useTheme();

  const {Scale} = useScale();
  const styles = useMemo(() => getStyles(Scale), [Scale]);
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.imageView}>
        <Image source={yogaSymbol} style={styles.yogaImage} />
      </View>

      <View style={styles.middle}>
        <Text style={styles.yogaTxt}>Yoga</Text>
        <Text style={styles.bestTxt}>Practice Yoga</Text>
        <Text style={styles.practiceTxt}>
          Do your practice of physical exrercise and relaxation. Transform your
          body and mind with our comprehensive yoga app
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('yogaList')}
        style={styles.bottom}>
        <Text style={styles.startedTxt}>Let's Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    yogaImage: {
      height: screenHeight * 0.35,
      width: screenWidth * 0.8,
      borderRadius: Scale(300),
    },
    imageView: {
      alignItems: 'center',
      marginTop: screenHeight * 0.15,
    },
    bottom: {
      justifyContent: 'flex-end',
      marginBottom: Scale(30),
      alignItems: 'center',
      paddingVertical: Scale(15),
      paddingHorizontal: Scale(10),
      borderRadius: Scale(15),
      backgroundColor: buttonColor,
      marginHorizontal: Scale(30),
    },
    middle: {
      flex: 1,
      marginHorizontal: Scale(20),
    },
    startedTxt: {
      color: txtColor,
      fontFamily: 'sans-serif',
      fontSize: Scale(15),
      fontWeight: '700',
    },
    bestTxt: {
      color: blackTxt,
      fontSize: Scale(32),
      fontWeight: '700',
      textAlign: 'center',
    },
    yogaTxt: {
      color: buttonColor,
      fontSize: Scale(20),
      fontWeight: '700',
      textAlign: 'center',
      marginTop: Scale(30),
    },
    practiceTxt: {
      color: grey,
      textAlign: 'center',
      marginTop: Scale(15),
      fontSize: Scale(14),
      fontWeight: '400',
    },
  });

export default WelcomeScreen;
