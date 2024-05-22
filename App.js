import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Swiper from 'react-native-swiper';
import FavoriteConverters from './components/FavoriteConverters';
import LengthUnits from './components/LengthUnits';
import WeightAndVolume from './components/WeightAndVolume';

export default function App() {
  const appleId = process.env.APPLE_ID;
  const ascAppId = process.env.ASC_APP_ID;
  const appleTeamId = process.env.APPLE_TEAM_ID;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground source={require("./assets/background-green.jpg")} style={styles.backgroundImage}>
          <StatusBar style="auto" />
          <View style={styles.textContainer}>
            <Text style={styles.header}>Converter</Text>
          </View>
          <Swiper
            style={styles.swiper}
            showsPagination={true}
            loop={false}
            dotStyle={styles.paginationDot}
            activeDotStyle={styles.activePaginationDot}
          >
            <View style={styles.slide}>
              <FavoriteConverters />
            </View>
            <View style={styles.slide}>
              <LengthUnits />
            </View>
            <View style={styles.slide}>
              <WeightAndVolume />
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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 100,
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