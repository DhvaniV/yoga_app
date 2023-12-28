import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Modal,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useId, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCategortDetail, getlevelData, setLevelName} from '../redux/actions';
import {Scale, screenHeight, screenWidth} from '../Components/scale';
import {buttonColor, green, grey, titleTxt} from '../Components/colors';
import {backIcon, crossArrow, menuIcon} from '../Components/assests';
import CustomHeader from '../CustomComponents/CustomHeader';
import useTheme from '../hooks/useTheme';
import {useScale} from '../hooks/Dimensions';

const CategoryDetail = ({navigation}: any) => {
  const dispatch = useDispatch();

  // Get the selected Category
  const selectedCategory = useSelector(
    (state: any) => state.reducer.currentCategory,
  );
  // Get the details of yoga list of selected category
  const detail = useSelector(
    (state: any) => state.reducer.selectedCategoryData,
  );

  const scrollX = useRef(new Animated.Value(0)).current;

  const itemSize = screenWidth * 0.72;

  const [modal, setModal] = useState(false);
  const [modalDesc, setModalDesc] = useState(false);
  const [openOptionModal, setOptionModal] = useState(false);

  const theme = useTheme();

  const {Scale} = useScale();
  const styles = getStyles(Scale);

  // User can the level of yoga
  const setLevel = (level: string) => {
    dispatch(setLevelName(level));
    setOptionModal(false);
    navigation.navigate('LevelPoses');
  };

  //UI of differnet yoga poses
  const renderItem = ({item, index}: any) => {
    const inputRange = [
      (index - 2) * itemSize,
      (index - 1) * itemSize,
      index * itemSize,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [0, -50, 0],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });
    let text = '';

    if (item?.key === 'space_item') {
      return <View style={{width: (screenWidth - itemSize) / 2}} />;
    }
    return (
      <View style={styles.mainView}>
        <Animated.View
          style={[styles.view, {transform: [{translateY}], opacity: opacity}]}>
          <Image
            source={{uri: item.url_png}}
            style={[styles.image, {backgroundColor: theme.imageBackground}]}
          />
          <View style={styles.descView}>
            <Text style={styles.nameTxt}>
              {item.sanskrit_name} (
              <Text style={{color: green}}>{item.english_name}</Text>)
            </Text>
            <Text style={styles.txt}>Translation</Text>
            <Text style={styles.translation}>{item.translation_name}</Text>
            <Text style={styles.txt}>Benefits</Text>
            <View style={styles.txtView}>
              <Text style={styles.benefits}>
                {item.pose_benefits.slice(0, 80)}...{' '}
                {item.pose_benefits.length > 80 && (
                  <Text
                    onPress={() => {
                      setModal(true), (text = item.pose_benefits);
                    }}
                    style={styles.read_more}>
                    Read more
                  </Text>
                )}
              </Text>
            </View>
            <Text style={styles.txt}>Description</Text>
            <View style={styles.txtView}>
              <Text style={styles.benefits}>
                {item.pose_benefits.slice(0, 80)}...{' '}
                {item.pose_benefits.length > 80 && (
                  <Text
                    onPress={() => {
                      setModalDesc(true), (text = item.pose_description);
                    }}
                    style={styles.read_more}>
                    Read more
                  </Text>
                )}
              </Text>
            </View>
          </View>
        </Animated.View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}>
          <TouchableOpacity
            onPress={() => {
              setModal(false);
            }}
            style={{flex: 1, backgroundColor: theme.opacity}}
          />
          <View
            style={[
              styles.descModalView,
              {backgroundColor: theme.imageBackground},
            ]}>
            <TouchableOpacity onPress={() => setModal(false)}>
              <Image source={crossArrow} />
            </TouchableOpacity>
            <Text style={[styles.benefitTxt, {color: theme.txtColor}]}>
              {item.pose_benefits}
            </Text>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDesc}
          onRequestClose={() => {
            setModalDesc(false);
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalDesc(false);
            }}
            style={{flex: 1, backgroundColor: theme.opacity}}
          />
          <View
            style={[
              styles.descModalView,
              {backgroundColor: theme.imageBackground},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => setModalDesc(false)}>
                <Image source={crossArrow} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.benefitTxt, {color: theme.txtColor}]}>
              {item.pose_description}
            </Text>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={openOptionModal}
          onRequestClose={() => {
            setOptionModal(false);
          }}>
          <TouchableOpacity
            onPress={() => {
              setOptionModal(false);
            }}
            style={{flex: 1, backgroundColor: '#FFFFFF95'}}
          />
          <View
            style={[
              styles.descModalView,
              {backgroundColor: theme.imageBackground},
            ]}>
            <View style={styles.row}>
              <Text
                style={styles.levelTxt}
                onPress={() => setLevel('beginner')}>
                Beginner
              </Text>
              <Text
                style={styles.levelTxt}
                onPress={() => setLevel('intermediate')}>
                Intermediate
              </Text>
              <Text style={styles.levelTxt} onPress={() => setLevel('expert')}>
                Expert
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  useEffect(() => {
    if (selectedCategory) {
      dispatch(getCategortDetail(selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <CustomHeader
        title={selectedCategory}
        onBackPress={() => navigation.goBack()}
        onBack={backIcon}
        about={menuIcon}
        navigation={() => setOptionModal(true)}
      />

      <Animated.FlatList
        data={detail.poses}
        renderItem={renderItem}
        horizontal
        snapToInterval={screenWidth * 0.72}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const getStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: screenWidth * 0.65,
      height: screenHeight * 0.45,
      resizeMode: 'contain',
      borderRadius: Scale(24),
    },
    mainView: {
      width: screenWidth * 0.72,
      alignItems: 'center',
      height: screenHeight * 0.35,
      marginTop: Scale(50),
    },
    view: {
      marginHorizontal: Scale(40),
    },
    nameTxt: {
      color: buttonColor,
      fontSize: Scale(17),
      fontWeight: '600',
      fontFamily: 'sans-serif',
      textAlign: 'center',
    },
    descView: {
      // alignItems: 'center',
      marginTop: Scale(20),
    },
    txtView: {
      flexDirection: 'row',
    },
    read_more: {
      color: buttonColor,
    },
    descModalView: {
      padding: Scale(20),
      borderTopEndRadius: Scale(20),
      borderTopLeftRadius: Scale(20),
    },
    benefitTxt: {
      marginTop: Scale(10),
    },
    benefits: {
      color: titleTxt,
    },
    txt: {
      marginTop: Scale(20),
      marginBottom: Scale(5),
      color: green,
      fontSize: Scale(14),
      fontWeight: '700',
    },
    translation: {
      color: grey,
      fontSize: Scale(15),
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: Scale(20),
    },
    levelTxt: {
      color: buttonColor,
      fontSize: Scale(15),
      fontWeight: '500',
    },
  });

export default CategoryDetail;
