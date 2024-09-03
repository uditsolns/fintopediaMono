import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {TextPresetType} from '@shared/src/components/atoms/Text/TextPresets';
import {LinearGradientMolecule} from '@shared/src/components/molecules/Gradient/LinearGradientMolecule';
import {colorPresets} from '@shared/src/theme/color';
import {
  moderateScale,
  mScale,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@shared/src/theme/metrics';
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Platform,
  ViewStyle,
  TextInput,
  Pressable,
} from 'react-native';

interface DropdownProps {
  dropdownTitle?: string;
  dropdownItemArr?: Array<any>; // Ideally, replace `any` with the specific type for dropdown items
  itemLabelField?: string;
  onSelect: (option: any) => void; // Replace `any` with specific type if needed
  defaultText?: string;
  placeholder?: string;
  textColor?: string;
  maxHeight?: number;
  dropdownBg?: string;
  dropdownTextColor?: string;
  dropdownTextSize?: TextPresetType;
}

const Dropdown: React.FC<DropdownProps> = ({
  dropdownTitle,
  dropdownItemArr = [],
  itemLabelField = 'label',
  onSelect,
  defaultText,
  placeholder,
  textColor,
  maxHeight = WINDOW_HEIGHT * 0.3,
  dropdownBg = colorPresets.CTA,
  dropdownTextColor = colorPresets.BLACK,
  dropdownTextSize = 'body',
  ...rest
}) => {
  const [width, setWidth] = React.useState(WINDOW_WIDTH - mScale.lg3);
  const [height, setHeight] = React.useState(mScale.xl);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    defaultText || placeholder,
  );

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option[itemLabelField]);
    onSelect(option);
    setDropdownVisible(false);
  };

  const renderOption = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleOptionSelect(item)}>
      <TextAtom
        text={item[itemLabelField]}
        preset={dropdownTextSize}
        style={{color:dropdownTextColor}}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {dropdownTitle && (
        <TextAtom
          text={dropdownTitle}
          preset="title"
          style={{marginVertical: mScale.md,color:colorPresets.CTA}}
        />
      )}
      <View
        onLayout={event => {
          const {width, height} = event.nativeEvent.layout;
          setWidth(width);
          setHeight(height);
        }}
        style={{
          borderRadius: 6,
        }}>
        <View style={{...StyleSheet.absoluteFillObject, zIndex: -1}}>
          <LinearGradientMolecule width={width} height={height} radius={6} />
        </View>
        <Pressable
          onPress={toggleDropdown}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 2,
            paddingVertical: 1,
            backgroundColor: colorPresets.TRANSPARENT,
          }}>
          <View
            style={[
              {
                flex: 1,
                height: moderateScale(50),
                backgroundColor: colorPresets.BG,
                borderRadius: 6,
                paddingHorizontal: mScale.base,
                justifyContent:'center'
              },
            ]}>
            <TextAtom
              text={selectedOption || placeholder}
              preset="medium"
              style={{color:textColor || colorPresets.CTA}}
            />
          </View>
          {/* <TextInput
            {...rest}
            placeholder={selectedOption || placeholder}
            value={selectedOption || placeholder}
            placeholderTextColor={textColor || colorPresets.CTA}
            style={[
              {
                flex: 1,
                height: moderateScale(50),
                backgroundColor: colorPresets.BG,
                borderRadius: 6,
                paddingHorizontal: mScale.base,
              },
            ]}
            editable={false}
            
          /> */}
          {true ? (
            <View
              style={{
                position: 'absolute',
                right: mScale.md3,
                top: mScale.md2,
              }}>
              <Images.SVG.ChevronDown width={22} />
            </View>
          ) : null}
        </Pressable>
      </View>
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={toggleDropdown}>
          <View
            style={[
              styles.dropdownContainer,
              {
                backgroundColor: dropdownBg,
                height: moderateScale(maxHeight),
              },
            ]}>
            <FlatList
              data={dropdownItemArr}
              renderItem={renderOption}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: mScale.md,
  },
  dropdown: {
    // padding: mScale.md3,
    height: Platform.OS !== 'android' ? undefined : 50,
    paddingHorizontal: 2,
    paddingVertical: 1,
    backgroundColor: colorPresets.TRANSPARENT,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdownContainer: {
    width: '100%',
    borderTopLeftRadius: mScale.md,
    borderTopRightRadius: mScale.md,
    paddingVertical: mScale.md,
    paddingHorizontal: mScale.lg,
    elevation: 5,
  },
  option: {
    paddingVertical: mScale.md,
  },
});

export default Dropdown;
