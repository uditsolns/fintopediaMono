import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import { InputAtom } from '@shared/src/components/atoms/Input/InputAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {MultilineTextInputAtom} from '@src/components/Input/MultilineTextInputAtom';
import React from 'react';
import {Pressable, View} from 'react-native';
interface NotesProps {}
export const Notes: React.FunctionComponent<NotesProps> = () => {
  return (
    <View style={{flex: 1, padding: mScale.base}}>
      <View>
        <MultilineTextInputAtom placeholderTitle='Add a note at 0.15' />
        <View style={{marginVertical:mScale.base}}>
          <View style={[commonStyle.flexSpaceBetween]}>
            <TextAtom text={'05:16'} preset="heading4" />
            <View style={[commonStyle.flexSpaceBetween]}>
              <Pressable style={{marginEnd: mScale.md}}>
                <Images.SVG.Pencil />
              </Pressable>
              <Pressable>
                <Images.SVG.Trash />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: colorPresets.GRAY3,
              borderRadius: 9,
              marginVertical: mScale.base,
              padding: mScale.base,
              backgroundColor: '#222431',
            }}>
            <TextAtom
              text={
                'Market analysis is a crucial process that involves evaluating various aspects of a market to make informed business decisions.'
              }
              preset="body"
            />
          </View>
        </View>
      </View>
    </View>
  );
};
