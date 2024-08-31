import {useNavigation} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {CollapsibleAtom} from '@src/components/CollasibleAtom';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import SeparatorAtom from '@src/components/SeperatorAtom';
import { RouteKeys } from '@src/navigation/RouteKeys';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
interface FilterByCourseInterface {}
export const FilterByCourse: React.FC<FilterByCourseInterface> = () => {
  const navigation = useNavigation();
  return (
    <GradientTemplate>
      <HeaderLeftMolecule />
      <ScrollViewAtom nestedScrollEnabled={true}>
        <CollapsibleAtom collasibleTilte={'Topics'}>
          {[...Array(5)].map((el, index) => {
            return (
              <View
                style={[commonStyle.flexStart, {marginBottom: mScale.base}]}
                key={index}>
                <View
                  style={{
                    width: mScale.lg1,
                    height: mScale.lg1,
                    borderRadius: 3,
                    borderWidth: 2,
                    borderColor: colorPresets.CTA,
                    marginEnd: mScale.base,
                  }}
                />
                <TextAtom
                  text={'Investment Strategy '}
                  preset="large"
                  color={colorPresets.CTA}
                />
                <TextAtom
                  text={'(1,203)'}
                  preset="large"
                  color={colorPresets.GRAY}
                />
              </View>
            );
          })}
        </CollapsibleAtom>
        <SeparatorAtom
          marginHorizontal={0}
          style={{marginVertical: mScale.base}}
        />
        <CollapsibleAtom collasibleTilte={'Languages'}></CollapsibleAtom>
        <SeparatorAtom
          marginHorizontal={0}
          style={{marginVertical: mScale.base}}
        />
        <CollapsibleAtom collasibleTilte={'Level'}></CollapsibleAtom>
        <SeparatorAtom
          marginHorizontal={0}
          style={{marginVertical: mScale.base}}
        />
        <CollapsibleAtom collasibleTilte={'Rating'}></CollapsibleAtom>
        <SeparatorAtom
          marginHorizontal={0}
          style={{marginVertical: mScale.base}}
        />
        <CollapsibleAtom collasibleTilte={'Price'}></CollapsibleAtom>
        <View style={[commonStyle.flexEnd, {marginVertical: mScale.base}]}>
          {/* <SmallButtonAtom
            btnTitle={'Save'}
            preset={'smallBold'}
            style={{
              width: moderateScale(126),
              height: moderateScale(40),
              paddingVertical: 0,
              paddingHorizontal: 0,
            }}
            onPress={()=>{
              navigation.navigate(RouteKeys.COURSECATEGORY)
            }}
          /> */}
          <TouchableOpacity  onPress={()=>{
              navigation.navigate(RouteKeys.COURSECATEGORYSCREEN)
            }}>
            <TextAtom text='Save' />
          </TouchableOpacity>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
