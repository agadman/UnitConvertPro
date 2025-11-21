import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const UnitConverter = ({ conversions }) => {
  const allUnits = useMemo(() => {
    if (!conversions || conversions.length === 0) return [];
    const unitsMap = new Map();
    conversions.forEach(conv => {
      if (!unitsMap.has(conv.unit1.symbol)) unitsMap.set(conv.unit1.symbol, conv.unit1);
      if (!unitsMap.has(conv.unit2.symbol)) unitsMap.set(conv.unit2.symbol, conv.unit2);
    });
    return Array.from(unitsMap.values());
  }, [conversions]);

  const [fromUnit, setFromUnit] = useState(null);
  const [toUnit, setToUnit] = useState(null);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  useEffect(() => {
    if (allUnits.length > 0) {
      setFromUnit(allUnits[0]);
      setToUnit(allUnits[1] || allUnits[0]);
    }
  }, [allUnits]);

  const getConversionFunction = useCallback((from, to) => {
    if (!conversions || !from || !to) return null;
    if (from.symbol === to.symbol) return (value) => value;
    let conv = conversions.find(c => c.unit1.symbol === from.symbol && c.unit2.symbol === to.symbol);
    if (conv) return (value) => conv.convert(value, 'unit1');
    conv = conversions.find(c => c.unit2.symbol === from.symbol && c.unit1.symbol === to.symbol);
    if (conv) return (value) => conv.convert(value, 'unit2');
    for (let intermediateConv of conversions) {
      let fromToIntermediate = null, intermediateUnit = null;
      if (intermediateConv.unit1.symbol === from.symbol) {
        fromToIntermediate = (v) => intermediateConv.convert(v, 'unit1');
        intermediateUnit = intermediateConv.unit2;
      } else if (intermediateConv.unit2.symbol === from.symbol) {
        fromToIntermediate = (v) => intermediateConv.convert(v, 'unit2');
        intermediateUnit = intermediateConv.unit1;
      }
      if (fromToIntermediate && intermediateUnit) {
        const toConv = conversions.find(c => (c.unit1.symbol === intermediateUnit.symbol && c.unit2.symbol === to.symbol) || (c.unit2.symbol === intermediateUnit.symbol && c.unit1.symbol === to.symbol));
        if (toConv) {
          let intermediateToTo = toConv.unit1.symbol === intermediateUnit.symbol ? (v) => toConv.convert(v, 'unit1') : (v) => toConv.convert(v, 'unit2');
          return (value) => intermediateToTo(fromToIntermediate(value));
        }
      }
    }
    return null;
  }, [conversions]);

  const formatNumber = useCallback((num) => {
    if (isNaN(num)) return '';
    return parseFloat(num.toFixed(4)).toString();
  }, []);

  const handleValue1Change = useCallback((text) => {
    if (!fromUnit || !toUnit) return;
    const cleaned = text.replace(',', '.').replace(/[^0-9.-]/g, '');
    setValue1(cleaned);
    if (cleaned === '' || cleaned === '-' || cleaned === '.') { setValue2(''); return; }
    const numValue = parseFloat(cleaned);
    if (!isNaN(numValue)) {
      const convertFn = getConversionFunction(fromUnit, toUnit);
      if (convertFn) setValue2(formatNumber(convertFn(numValue)));
    } else setValue2('');
  }, [fromUnit, toUnit, getConversionFunction, formatNumber]);

  const handleValue2Change = useCallback((text) => {
    if (!fromUnit || !toUnit) return;
    const cleaned = text.replace(',', '.').replace(/[^0-9.-]/g, '');
    setValue2(cleaned);
    if (cleaned === '' || cleaned === '-' || cleaned === '.') { setValue1(''); return; }
    const numValue = parseFloat(cleaned);
    if (!isNaN(numValue)) {
      const convertFn = getConversionFunction(toUnit, fromUnit);
      if (convertFn) setValue1(formatNumber(convertFn(numValue)));
    } else setValue1('');
  }, [fromUnit, toUnit, getConversionFunction, formatNumber]);

  const handleClear = useCallback(() => { setValue1(''); setValue2(''); setActiveInput(null); }, []);

  const handleFromUnitChange = useCallback((unit) => {
    setFromUnit(unit); setShowFromDropdown(false);
    if (value1) {
      const numValue = parseFloat(value1);
      if (!isNaN(numValue)) {
        const convertFn = getConversionFunction(unit, toUnit);
        if (convertFn) setValue2(formatNumber(convertFn(numValue)));
      }
    }
  }, [value1, toUnit, getConversionFunction, formatNumber]);

  const handleToUnitChange = useCallback((unit) => {
    setToUnit(unit); setShowToDropdown(false);
    if (value1) {
      const numValue = parseFloat(value1);
      if (!isNaN(numValue)) {
        const convertFn = getConversionFunction(fromUnit, unit);
        if (convertFn) setValue2(formatNumber(convertFn(numValue)));
      }
    }
  }, [value1, fromUnit, getConversionFunction, formatNumber]);

  const handleSwapUnits = useCallback(() => {
    if (!fromUnit || !toUnit) return;
    setFromUnit(toUnit); setToUnit(fromUnit); setValue1(value2); setValue2(value1);
  }, [fromUnit, toUnit, value1, value2]);

  if (!conversions || conversions.length === 0 || !fromUnit || !toUnit) return null;

  return (
    <View style={[styles.container, isTablet && styles.containerTablet]}>
      <View style={styles.selectorRow}>
        <Text style={styles.selectorLabel}>From:</Text>
        <TouchableOpacity style={styles.unitSelector} onPress={() => setShowFromDropdown(true)} activeOpacity={0.7}>
          <Text style={styles.unitSelectorText}>{fromUnit.name}</Text>
          <FontAwesome name="chevron-down" size={14} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputSection}>
        <View style={[styles.inputContainer, activeInput === 'input1' && styles.inputContainerActive]}>
          <TextInput style={styles.input} placeholder="0" placeholderTextColor="#999" value={value1} onChangeText={handleValue1Change} onFocus={() => {setActiveInput('input1'); setValue1(''); setValue2('');}} onBlur={() => setActiveInput(null)} keyboardType="numbers-and-punctuation" />
          <Text style={styles.unitSymbol}>{fromUnit.symbol}</Text>
        </View>
      </View>
      <View style={styles.exchangeContainer}>
        <TouchableOpacity style={styles.exchangeIconWrapper} onPress={handleSwapUnits} activeOpacity={0.7}>
          <FontAwesome name="exchange" size={24} color="#66BB6A" />
        </TouchableOpacity>
      </View>
      <View style={styles.selectorRow}>
        <Text style={styles.selectorLabel}>To:</Text>
        <TouchableOpacity style={styles.unitSelector} onPress={() => setShowToDropdown(true)} activeOpacity={0.7}>
          <Text style={styles.unitSelectorText}>{toUnit.name}</Text>
          <FontAwesome name="chevron-down" size={14} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputSection}>
        <View style={[styles.inputContainer, activeInput === 'input2' && styles.inputContainerActive]}>
          <TextInput style={styles.input} placeholder="0" placeholderTextColor="#999" value={value2} onChangeText={handleValue2Change} onFocus={() => {setActiveInput('input2'); setValue1(''); setValue2('');}} onBlur={() => setActiveInput(null)} keyboardType="numbers-and-punctuation" />
          <Text style={styles.unitSymbol}>{toUnit.symbol}</Text>
        </View>
      </View>
      {(value1 || value2) && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton} activeOpacity={0.7}>
          <FontAwesome name="times-circle" size={20} color="#FFF" />
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      )}
      <Modal visible={showFromDropdown} transparent={true} animationType="fade" onRequestClose={() => setShowFromDropdown(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowFromDropdown(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Unit</Text>
              <TouchableOpacity onPress={() => setShowFromDropdown(false)}><FontAwesome name="times" size={24} color="#666" /></TouchableOpacity>
            </View>
            <ScrollView>
              {allUnits.map((unit) => (
                <TouchableOpacity key={unit.symbol} style={[styles.dropdownItem, fromUnit.symbol === unit.symbol && styles.dropdownItemActive]} onPress={() => handleFromUnitChange(unit)}>
                  <Text style={[styles.dropdownItemText, fromUnit.symbol === unit.symbol && styles.dropdownItemTextActive]}>{unit.name} ({unit.symbol})</Text>
                  {fromUnit.symbol === unit.symbol && <FontAwesome name="check" size={18} color="#66BB6A" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal visible={showToDropdown} transparent={true} animationType="fade" onRequestClose={() => setShowToDropdown(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowToDropdown(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Unit</Text>
              <TouchableOpacity onPress={() => setShowToDropdown(false)}><FontAwesome name="times" size={24} color="#666" /></TouchableOpacity>
            </View>
            <ScrollView>
              {allUnits.map((unit) => (
                <TouchableOpacity key={unit.symbol} style={[styles.dropdownItem, toUnit.symbol === unit.symbol && styles.dropdownItemActive]} onPress={() => handleToUnitChange(unit)}>
                  <Text style={[styles.dropdownItemText, toUnit.symbol === unit.symbol && styles.dropdownItemTextActive]}>{unit.name} ({unit.symbol})</Text>
                  {toUnit.symbol === unit.symbol && <FontAwesome name="check" size={18} color="#66BB6A" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'rgba(255,255,255,0.80)',
    borderRadius:20,
    padding:24,
    shadowColor:'#000',
    shadowOffset:{width:0,height:4},
    shadowOpacity:0.15,
    shadowRadius:12,
    elevation:6,
    paddingBottom:40,
    paddingTop:40,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  containerTablet: {
    padding: 40,
    paddingBottom: 50,
    paddingTop: 50,
  },
  selectorRow:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:10
},
  selectorLabel:{
    fontSize:14,
    fontWeight:'600',
    color:'#558B5A',
    width:50,
    textTransform:'uppercase',
    letterSpacing:0.5
},
  unitSelector:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#F5F5F5',
    paddingVertical:12,
    paddingHorizontal:16,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#E0E0E0'
},
  unitSelectorText:{
    fontSize:15,
    fontWeight:'600',
    color:'#333'
},
  inputContainer:{
    flexDirection:'row',
    alignItems:'center',
    borderWidth:2,
    borderColor:'#E0E0E0',
    borderRadius:14,
    backgroundColor:'#FAFAFA',
    paddingHorizontal:16,
    paddingVertical:0
},
  inputContainerActive:{
    borderColor:'#66BB6A',
    backgroundColor:'#FFF',
    shadowColor:'#66BB6A',
    shadowOffset:{width:0,height:0},
    shadowOpacity:0.15,
    shadowRadius:8,
    elevation:3
},
  input:{
    flex:1,
    fontSize: isTablet ? 28 : 24,
    fontWeight:'600',
    color:'#333',
    paddingVertical:14
  },
  unitSymbol:{
    fontSize: isTablet ? 22 : 18,
    fontWeight:'600',
    color:'#666',
    marginLeft:8,
    minWidth:40,
    textAlign:'right'
  },
  unitSelectorText:{
    fontSize: isTablet ? 18 : 15,
    fontWeight:'600',
    color:'#333'
  },
  exchangeIconWrapper:{
    backgroundColor:'rgba(102,187,106,0.15)',
    width: isTablet ? 60 : 50,
    height: isTablet ? 60 : 50,
    borderRadius: isTablet ? 30 : 25,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:2,
    borderColor:'rgba(102,187,106,0.3)'
  },
  exchangeContainer:{
  alignItems:'center',
  marginVertical: isTablet ? 30 : 20,
  alignSelf: 'center',
  width: '100%',
},
  clearButton:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#FF5252',
    paddingVertical:14,
    paddingHorizontal:24,
    borderRadius:12,
    marginTop:10,
    gap:8
},
  clearButtonText:{
    color:'#FFF',
    fontSize:16,
    fontWeight:'600'
},
  modalOverlay:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center',
    alignItems:'center',
    padding:20
},
  modalContent:{
    backgroundColor:'#FFF',
    borderRadius:20,
    width:'100%',
    maxWidth:400,
    maxHeight:'60%',
    shadowColor:'#000',
    shadowOffset:{width:0,height:4},
    shadowOpacity:0.3,
    shadowRadius:10,
    elevation:8
},
  modalHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:20,
    borderBottomWidth:1,
    borderBottomColor:'#E0E0E0'
},
  modalTitle:{
    fontSize:20,
    fontWeight:'700',
    color:'#333'
},
  dropdownItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:16,
    paddingHorizontal:20,
    borderBottomWidth:1,
    borderBottomColor:'#F0F0F0'
},
  dropdownItemActive:{
    backgroundColor:'#F1F8F4'
},
  dropdownItemText:{
    fontSize:16,
    color:'#333',
    fontWeight:'500'
},
  dropdownItemTextActive:{
    color:'#558B5A',
    fontWeight:'700'
},
});

export default React.memo(UnitConverter);