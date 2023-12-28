import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useId, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getYogaList, setCategoryName} from '../redux/actions';
import useTheme from '../hooks/useTheme';
import {screenHeight, screenWidth} from '../Components/scale';
import {buttonColor, green, titleTxt, white} from '../Components/colors';
import {backArrow, backIcon} from '../Components/assests';
import CustomHeader from '../CustomComponents/CustomHeader';
import {useScale} from '../hooks/Dimensions';

const yogaList = ({navigation}: any) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const userList = useSelector((state: any) => state.reducer);
  const [index, setIndex] = useState(0);

  const {Scale} = useScale();
  const styles = getStyles(Scale);

  const goToCategory = (name: any) => {
    console.log('name:', name);
    dispatch(setCategoryName(name));
    navigation.navigate('CategoryDetail');
  };

  //List of Categories
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.itemView} key={item.id}>
        <Image source={{uri: item.poses[0].url_png}} style={styles.image} />
        <View style={{flex: 1}}>
          <Text style={styles.headingTxt}>{item.category_name}</Text>
          <Text style={styles.desc}>{item.category_description}</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => {
              if (index > 0) {
                setIndex(prev => prev - 1);
                flatListRef.current?.scrollToIndex({
                  index: index - 1,
                  animated: true,
                });
              } else {
                setIndex(userList.categoryList.length - 1);
                flatListRef.current?.scrollToIndex({
                  index: userList.categoryList.length - 1,
                  animated: true,
                });
              }
            }}>
            <Image source={backArrow} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => goToCategory(item.category_name)}
            style={styles.nextView}>
            <Text style={styles.nextTxt}>DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (index < userList.categoryList.length - 1) {
                setIndex(prev => prev + 1);
                flatListRef.current?.scrollToIndex({
                  index: index + 1,
                  animated: true,
                });
              } else {
                setIndex(0);
                flatListRef.current?.scrollToIndex({index: 0, animated: true});
              }
            }}>
            <Image style={styles.arrowImage} source={backArrow} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    dispatch(getYogaList());
  }, []);

  useEffect(() => {
    console.log('list', userList);
  }, [userList]);

  const flatListRef = useRef<FlatList | null>(null);
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      {userList.categoryList.length === 0 ? (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color={buttonColor} />
        </View>
      ) : (
        <>
          <CustomHeader
            title={'Yoga Category'}
            onBackPress={() => navigation.goBack()}
            onBack={backIcon}
          />
          <FlatList
            ref={flatListRef}
            data={userList.categoryList}
            renderItem={renderItem}
            horizontal
            scrollEnabled={false}
            pagingEnabled
            onScrollToIndexFailed={() => Alert.alert('This is first category!')}
          />
        </>
      )}
    </View>
  );
};

const getStyles = (Scale: any) =>
  StyleSheet.create({
    container: {flex: 1},
    itemView: {
      flex: 1,
      width: screenWidth,
    },
    image: {
      width: screenWidth,
      height: screenHeight * 0.5,
      resizeMode: 'contain',
    },
    headingTxt: {
      color: buttonColor,
      fontWeight: '700',
      fontSize: Scale(22),
      marginLeft: Scale(20),
      marginTop: Scale(20),
    },
    desc: {
      fontSize: Scale(12),
      marginHorizontal: Scale(20),
      marginTop: Scale(10),
      color: titleTxt,
      lineHeight: Scale(17),
    },
    nextView: {
      backgroundColor: green,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: Scale(35),
      paddingHorizontal: Scale(10),
      paddingVertical: Scale(10),
      borderRadius: Scale(10),
    },
    nextTxt: {
      color: white,
      fontSize: Scale(14),
      letterSpacing: Scale(1),
      fontWeight: '700',
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: Scale(25),
      gap: Scale(10),
    },
    arrowImage: {
      transform: [{rotate: '180deg'}],
    },
  });

export default yogaList;
