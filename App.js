import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  TouchableWithoutFeedback, 
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Dimensions } from 'react-native';
import UnitConverter from './components/UnitConverter';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const CATEGORIES = [
  {
    id: 'temperature',
    title: 'Temperature',
    icon: 'thermometer-half',
    conversions: [
      {
        id: 'celsius-fahrenheit',
        unit1: { name: 'Celsius', symbol: '°C' },
        unit2: { name: 'Fahrenheit', symbol: '°F' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? (value * 9/5) + 32 : (value - 32) * 5/9
      },
      {
        id: 'celsius-kelvin',
        unit1: { name: 'Celsius', symbol: '°C' },
        unit2: { name: 'Kelvin', symbol: 'K' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value + 273.15 : value - 273.15
      },
      {
        id: 'fahrenheit-kelvin',
        unit1: { name: 'Fahrenheit', symbol: '°F' },
        unit2: { name: 'Kelvin', symbol: 'K' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? (value - 32) * 5/9 + 273.15 : (value - 273.15) * 9/5 + 32
      }
    ]
  },
  {
    id: 'length',
    title: 'Length',
    icon: 'arrows-h',
    conversions: [
      {
        id: 'inches-meters',
        unit1: { name: 'Inches', symbol: 'in' },
        unit2: { name: 'Meters', symbol: 'm' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value / 39.3701 : value * 39.3701
      },
      {
        id: 'feet-meters',
        unit1: { name: 'Feet', symbol: 'ft' },
        unit2: { name: 'Meters', symbol: 'm' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 0.3048 : value / 0.3048
      },
      {
        id: 'miles-meters',
        unit1: { name: 'Miles', symbol: 'mi' },
        unit2: { name: 'Meters', symbol: 'm' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 1609.34 : value / 1609.34
      },
      {
        id: 'miles-kilometers',
        unit1: { name: 'Miles', symbol: 'mi' },
        unit2: { name: 'Kilometers', symbol: 'km' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 1.60934 : value / 1.60934
      },
      {
        id: 'yards-meters',
        unit1: { name: 'Yards', symbol: 'yd' },
        unit2: { name: 'Meters', symbol: 'm' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 0.9144 : value / 0.9144
      },
      {
        id: 'kilometers-meters',
        unit1: { name: 'Kilometers', symbol: 'km' },
        unit2: { name: 'Meters', symbol: 'm' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 1000 : value / 1000
      }
    ]
  },
  {
    id: 'weight',
    title: 'Weight',
    icon: 'balance-scale',
    conversions: [
      {
        id: 'pounds-kilograms',
        unit1: { name: 'Pounds', symbol: 'lbs' },
        unit2: { name: 'Kilograms', symbol: 'kg' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value / 2.20462 : value * 2.20462
      },
      {
        id: 'ounces-grams',
        unit1: { name: 'Ounces', symbol: 'oz' },
        unit2: { name: 'Grams', symbol: 'g' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 28.3495 : value / 28.3495
      },
      {
        id: 'ounces-kilograms',
        unit1: { name: 'Ounces', symbol: 'oz' },
        unit2: { name: 'Kilograms', symbol: 'kg' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value / 35.274 : value * 35.274
      },
      {
        id: 'stone-kilograms',
        unit1: { name: 'Stone', symbol: 'st' },
        unit2: { name: 'Kilograms', symbol: 'kg' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 6.35029 : value / 6.35029
      }
    ]
  },
  {
    id: 'volume',
    title: 'Volume',
    icon: 'flask',
    conversions: [
      {
        id: 'gallons-liters',
        unit1: { name: 'Gallons (US)', symbol: 'gal' },
        unit2: { name: 'Liters', symbol: 'L' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 3.78541 : value / 3.78541
      },
      {
        id: 'cups-milliliters',
        unit1: { name: 'Cups', symbol: 'cup' },
        unit2: { name: 'Milliliters', symbol: 'ml' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 236.588 : value / 236.588
      },
      {
        id: 'tablespoons-milliliters',
        unit1: { name: 'Tablespoons', symbol: 'tbsp' },
        unit2: { name: 'Milliliters', symbol: 'ml' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 14.7868 : value / 14.7868
      },
      {
        id: 'fluid-ounces-milliliters',
        unit1: { name: 'Fluid Ounces', symbol: 'fl oz' },
        unit2: { name: 'Milliliters', symbol: 'ml' },
        convert: (value, fromUnit) => 
          fromUnit === 'unit1' ? value * 29.5735 : value / 29.5735
      }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = CATEGORIES[activeTab];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ImageBackground 
          source={require("./assets/background-green.jpg")} 
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <StatusBar style="light" />
          
          <ScrollView 
            style={styles.mainScroll}
            contentContainerStyle={styles.mainScrollContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Converter</Text>
              <Text style={styles.headerSubtitle}>Your everyday friend</Text>
            </View>

            {/* Tab Navigation */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.tabScrollView}
              contentContainerStyle={styles.tabContainer}
            >
              {CATEGORIES.map((category, index) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.tab,
                    activeTab === index && styles.tabActive
                  ]}
                  onPress={() => setActiveTab(index)}
                  activeOpacity={0.7}
                >
                  <FontAwesome 
                    name={category.icon} 
                    size={20} 
                    color={activeTab === index ? '#2E7D32' : 'rgba(255,255,255,0.8)'} 
                  />
                  <Text style={[
                    styles.tabText,
                    activeTab === index && styles.tabTextActive
                  ]}>
                    {category.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Converter Content */}
            <View style={styles.content}>
              <View style={styles.converterWrapper}>
                {activeCategory && activeCategory.conversions && (
                  <UnitConverter
                    key={activeCategory.id}
                    conversions={activeCategory.conversions}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
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
  },
  mainScroll: {
    flex: 1,
  },
  mainScrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? (isTablet ? 120 : 100) : (isTablet ? 100 : 80),
    paddingBottom: isTablet ? 50 : 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: isTablet ? 52 : 42,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: isTablet ? 22 : 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
  },
  tabScrollView: {
    maxHeight: 80,
    flexGrow: 0,
    marginTop: 10,
    alignSelf: isTablet ? 'center' : 'stretch',
  },
  tabContainer: {
    paddingHorizontal: 20,
    marginBottom: 0,
    paddingLeft: isTablet ? 0 : 20,
    paddingRight: isTablet ? 0 : 20,
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    minHeight: 70,
    width: 80,
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#2E7D32',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  converterWrapper: {
    paddingBottom: 50,
  },
});