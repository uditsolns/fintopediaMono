import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {TextPresetType} from '@shared/src/components/atoms/Text/TextPresets';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {StyleSheet, View, ViewStyle, TextStyle} from 'react-native';
import ButtonIconAtom from './Button/ButtonIconAtom';
import {Images} from '@shared/src/assets';

interface ProgressBarProps {
  level?: 'beginner' | 'intermediate' | 'expert' | 'advanced' | string;
  hours?: number | string;
  mv?: number | undefined;
  textPreset?: TextPresetType;
  imageStyle?: ViewStyle;
  flex?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  level,
  hours,
  mv = mScale.base,
  textPreset = 'titleBold',
  imageStyle,
  flex = 1,
}) => {
  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        {
          alignSelf: 'flex-start',
          flex: flex,
          marginTop: mv,
          alignItems: 'flex-start',
        },
      ]}>
      <View
        style={[
          commonStyle.flexStart,
          {alignContent: 'center', alignSelf: 'flex-start'},
        ]}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.segment,
              (level === 'beginner' ||
                level === 'intermediate' ||
                level === 'expert' ||
                level === 'advanced') && {
                backgroundColor: colorPresets.PRIMARY,
              },
              {borderTopLeftRadius: 8, borderBottomLeftRadius: 8},
            ]}
          />
          <View
            style={[
              styles.segment,
              {
                backgroundColor:
                  level === 'intermediate' ||
                  level === 'expert' ||
                  level === 'advanced'
                    ? '#FFA11A'
                    : colorPresets.GRAY,
              },
            ]}
          />
          <View
            style={[
              styles.segment,
              {
                backgroundColor:
                  level === 'expert' || level === 'advanced'
                    ? 'red'
                    : colorPresets.GRAY,
              },
              {borderTopRightRadius: 8, borderBottomRightRadius: 8},
            ]}
          />
        </View>
        <TextAtom
          text={level}
          preset={textPreset}
          style={
            {textTransform: 'capitalize', marginLeft: mScale.xs} as TextStyle
          }
        />
      </View>
      <ButtonIconAtom
        btnTitle={`${hours} Hours`}
        preset={textPreset}
        color={colorPresets.CTA}
        style={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          marginStart: mScale.xs,
        }}
        ml={mScale.base}
        leftIcon={<Images.SVG.Clock />}
        textStyle={{paddingLeft:mScale.xs}}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    width: moderateScale(51),
    height: moderateScale(10),
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: '#555',
  },
});
