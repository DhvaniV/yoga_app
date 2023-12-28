import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getlevelData} from '../redux/actions';
import {useScale} from '../hooks/Dimensions';
import CustomHeader from '../CustomComponents/CustomHeader';
import {backArrow, backIcon, crossArrow} from '../Components/assests';
import useTheme from '../hooks/useTheme';
import {screenHeight, screenWidth} from '../Components/scale';
import {buttonColor, green, titleTxt, white} from '../Components/colors';

const LevelPoses = ({navigation}: any) => {
  const {Scale} = useScale();
  const styles = getStyles(Scale);
  const selectedLevel = useSelector((state: any) => state.reducer.levelName);

  const [index, setIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const detail = useSelector((state: any) => state.reducer.levelData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedLevel) {
      console.log('selected!!!!!!!!!!!!!!!', selectedLevel);
      dispatch(getlevelData(selectedLevel));
    }
  }, [selectedLevel]);

  const flatListRef = useRef<FlatList | null>(null);

  // List of poses of selected Level
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.itemView} key={item.id}>
        <Image source={{uri: item.url_png}} style={styles.image} />
        <View style={{flex: 1}}>
          <Text style={styles.headingTxt}>{item.english_name}</Text>
          <Text style={styles.desc}>{item.pose_benefits}</Text>
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
                setIndex(detail.poses.length - 1);
                flatListRef.current?.scrollToIndex({
                  index: detail.poses.length - 1,
                  animated: true,
                });
              }
            }}>
            <Image source={backArrow} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpenModal(true)}
            style={styles.nextView}>
            <Text style={styles.nextTxt}>DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (index < detail.poses.length - 1) {
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={openModal}
          onRequestClose={() => {
            setOpenModal(false);
          }}>
          <TouchableOpacity
            onPress={() => {
              setOpenModal(false);
            }}
            style={{flex: 1, backgroundColor: theme.opacity}}
          />
          <View
            style={[
              styles.descModalView,
              {backgroundColor: theme.imageBackground},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <Image source={crossArrow} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.benefitTxt, {color: theme.txtColor}]}>
              {item.pose_description}
            </Text>
          </View>
        </Modal>
      </View>
    );
  };
  
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <CustomHeader
        title={`${selectedLevel} Level`}
        onBackPress={() => navigation.goBack()}
        onBack={backIcon}
      />
      <FlatList
        ref={flatListRef}
        data={detail.poses}
        renderItem={renderItem}
        horizontal
        scrollEnabled={false}
        pagingEnabled
        onScrollToIndexFailed={() => Alert.alert('This is first category!')}
      />
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
    descModalView: {
      padding: Scale(20),
      borderTopEndRadius: Scale(20),
      borderTopLeftRadius: Scale(20),
    },
    benefitTxt: {
      marginTop: Scale(10),
    },
  });
export default LevelPoses;
