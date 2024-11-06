import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
interface MultilineTextInputAtomProps {
  placeholderTitle: string;
  value?: string | null;
  onChangeText?: (text: string) => void;
  onCancel?: () => void;
  onSave?: () => void;
  ratingBoolean?: boolean;
  onRatingSelect?: (rating: number) => void;
  maxStars?: number | string;
  defaultRating?: number;
  currentRating?: number;
}

export const MultilineTextInputAtom: React.FC<MultilineTextInputAtomProps> = ({
  placeholderTitle,
  value,
  onChangeText,
  onCancel = () => {},
  onSave = () => {},
  ratingBoolean = false,
  onRatingSelect,
  maxStars = 5,
  defaultRating = 0,
  currentRating = 0,
  ...rest
}) => {
  const [rating, setRating] = React.useState(defaultRating);
  const handleRatingSelect = (starIndex: number) => {
    setRating(starIndex);
    if (onRatingSelect) {
      onRatingSelect(starIndex);
    }
  };
  return (
    <View>
      <InputAtom
        {...rest}
        shape="square"
        placeholder={placeholderTitle}
        style={{minHeight: moderateScale(250), textAlignVertical: 'top'}}
        multiline={true}
        value={`${value || ''}`}
        onChangeText={onChangeText}
      />
      <View
        style={[
          commonStyle.flexSpaceBetween,
          {position: 'relative', bottom: 45},
        ]}>
        {ratingBoolean ? (
          <View style={[commonStyle.flexStart]}>
            <TextAtom
              style={{paddingHorizontal: mScale.md}}
              text={'Select Rating'}
              preset="xSmallBold"
            />
            {[...Array(maxStars)].map((_, index) => {
              const starIndex = index + 1;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleRatingSelect(index + 1)}>
                  {starIndex <= rating ? (
                    <Images.SVG.Star1 />
                  ) : (
                    <Images.SVG.Star1 color={colorPresets.CTA} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View />
        )}
        <View style={[commonStyle.flexSpaceBetween]}>
          <TouchableOpacity
            style={{marginEnd: mScale.base}}
            onPress={() => {
              setRating(0);
              onCancel();
            }}>
            <TextAtom text={'Cancel'} preset="smallBold" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: moderateScale(56),
              height: moderateScale(36),
              backgroundColor: colorPresets.CTA,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomEndRadius: 6,
            }}
            onPress={onSave}>
            <TextAtom
              text={'Save'}
              preset="xSmallBold"
              style={{color: colorPresets.BLACK}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
