import React, { useEffect, useState, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ImageBackground, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import FavoriteConverters from './components/FavoriteConverters';
import LengthUnits from './components/LengthUnits';
import WeightAndVolume from './components/WeightAndVolume';

const MemoizedFavoriteConverters = memo(FavoriteConverters);
const MemoizedLengthUnits = memo(LengthUnits);
const MemoizedWeightAndVolume = memo(WeightAndVolume);

export default function App() {
  const [marginTop, setMarginTop] = useState(0);
  const [bottom, setBottom] = useState(0);

  const updateMarginTop = () => {
    const screenHeight = Dimensions.get('window').height;
    if (screenHeight < 700) {
      setMarginTop(45);
      setBottom(0);
    } else {
      setMarginTop(100);
      setBottom(30);
    }
  };

  useEffect(() => {
    updateMarginTop(); 
    const subscription = Dimensions.addEventListener('change', updateMarginTop);
    return () => {
      subscription?.remove(); 
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground source={require("./assets/background-green.jpg")} style={styles.backgroundImage}>
          <StatusBar style="auto" />
          <View style={[styles.textContainer, { marginTop }]}>
            <Text style={styles.header}>Converter</Text>
          </View>
          <Swiper
            style={styles.swiper}
            showsPagination={true}
            loop={true}
            dotStyle={[styles.paginationDot, { bottom }]}
            activeDotStyle={[styles.activePaginationDot, { bottom }]}
            loadMinimal
            loadMinimalSize={1}
            scrollEnabled={true}
          >
            <View style={styles.slide}>
              <MemoizedFavoriteConverters />
            </View>
            <View style={styles.slide}>
              <MemoizedLengthUnits />
            </View>
            <View style={styles.slide}>
              <MemoizedWeightAndVolume />
            </View>
          </Swiper>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  swiper: {
    alignSelf: 'center',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
    bottom: 30,
  },
  activePaginationDot: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
    bottom: 30,
  },
});