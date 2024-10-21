import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CollapsibleAtom} from '@src/components/CollasibleAtom';
import SeparatorAtom from '@src/components/SeperatorAtom';
import {CategoriesResponse} from '@shared/src/utils/types/categories';

interface FilterModalInterface {
  isFullPageModalVisible: boolean;
  onClose?: () => void;
  bodyPayload?: any;
  isRatingVisible?: boolean;
}

const ratingArr = [
  {id: 1, rating: 'Low to high'},
  {id: 2, rating: 'High to low'},
];

const priceArr = [
  {id: 1, price: '0 - 4000', price_level: 'Rs. 0 - Rs. 4000'},
  {id: 2, price: '4000 - 8000', price_level: 'Rs. 4000 - Rs. 8000'},
  {id: 3, price: '8000 - 12000', price_level: 'Rs. 8000 - Rs. 12000'},
  {id: 4, price: '12000+', price_level: 'Rs. 12000 and Above'},
];

interface RatingProps {
  id: number;
  rating: string;
}
interface PriceProps {
  id: number;
  price: string;
  price_level: string;
}
export const FilterModal: React.FC<FilterModalInterface> = ({
  isFullPageModalVisible,
  onClose,
  bodyPayload,
  isRatingVisible = false,
}) => {
  const {categories} = useAppSelector(state => state.categories);

  // State to track selected items
  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesResponse | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<PriceProps | null>(null);
  const [selectedRating, setSelectedRating] = useState<RatingProps | null>(
    null,
  );

  const handleCategorySelect = (item: CategoriesResponse) =>
    setSelectedCategory(item);
  const handlePriceSelect = (item: PriceProps) => setSelectedPrice(item);
  const handleRatingSelect = (item: RatingProps) => setSelectedRating(item);

  return (
    <Modal visible={isFullPageModalVisible} onDismiss={onClose}>
      <GradientTemplate
        style={{paddingHorizontal: mScale.base, paddingTop: moderateScale(40)}}>
        <PressableAtom
          hitSlop={mScale.md}
          onPress={onClose}
          style={{paddingBottom: mScale.base}}>
          <Images.SVG.ChevronLeft width={mScale.lg3} color={colorPresets.CTA} />
        </PressableAtom>
        <ScrollViewAtom nestedScrollEnabled={true}>
          {!isRatingVisible ? (
            <>
              <CollapsibleAtom collasibleTilte="Topics">
                {categories?.map((el, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleCategorySelect(el)}
                    style={[
                      commonStyle.flexStart,
                      {marginBottom: mScale.base},
                    ]}>
                    <View
                      style={[
                        styles.circleRadioButton,
                        selectedCategory?.id === el.id && styles.selectedButton,
                      ]}
                    />
                    <TextAtom text={el?.category_name || ''} preset="large" />
                  </TouchableOpacity>
                ))}
              </CollapsibleAtom>

              <SeparatorAtom
                marginHorizontal={0}
                style={{marginVertical: mScale.base}}
              />

              <CollapsibleAtom collasibleTilte="Price">
                {priceArr?.map((el, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePriceSelect(el)}
                    style={[
                      commonStyle.flexStart,
                      {marginBottom: mScale.base},
                    ]}>
                    <View
                      style={[
                        styles.circleRadioButton,
                        selectedPrice?.id === el.id && styles.selectedButton,
                      ]}
                    />
                    <TextAtom text={el?.price_level || ''} preset="large" />
                  </TouchableOpacity>
                ))}
              </CollapsibleAtom>

              <SeparatorAtom
                marginHorizontal={0}
                style={{marginVertical: mScale.base}}
              />
            </>
          ) : (
            <CollapsibleAtom collasibleTilte="Rating">
              {ratingArr?.map((el, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleRatingSelect(el)}
                  style={[commonStyle.flexStart, {marginBottom: mScale.base}]}>
                  <View
                    style={[
                      styles.circleRadioButton,
                      selectedRating?.id === el.id && styles.selectedButton,
                    ]}
                  />
                  <TextAtom text={el?.rating || ''} preset="large" />
                </TouchableOpacity>
              ))}
            </CollapsibleAtom>
          )}

          <View style={[commonStyle.flexEnd, {marginVertical: mScale.base}]}>
            <ButtonAtom title="Save" onPress={() => {}} />
          </View>
        </ScrollViewAtom>
      </GradientTemplate>
    </Modal>
  );
};

const styles = StyleSheet.create({
  circleRadioButton: {
    width: mScale.lg1,
    height: mScale.lg1,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colorPresets.CTA,
    marginEnd: mScale.base,
  },
  selectedButton: {
    backgroundColor: colorPresets.CTA,
  },
});
