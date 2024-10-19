import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import { commonStyle } from '@shared/src/commonStyle';
import { Images } from '@shared/src/assets';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { CourseUploadFileResponse } from '@shared/src/utils/types/course-upload-file';
import { formatDateMonthTime } from '@src/components/Calculate';

export default function PdfMolecule({item, onPress}:{item?:CourseUploadFileResponse,onPress?:()=>void}) {
  return (
    <View style={[styles.container]}>
      <View style={styles.content}>
        <View style={[commonStyle.flexSpaceBetween]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Images.SVG.Certificate />
            </View>
            <Pressable
              style={{
                backgroundColor: '#76D651',
                alignSelf: 'flex-start',
                padding: mScale.xs,
                borderRadius: 7.5,
                marginStart: mScale.md,
              }}>
              <TextAtom text={'Checked'} preset="xSmallBold" />
            </Pressable>
          </View>
          <Pressable onPress={onPress}>
            <Images.SVG.DotHorizontal />
          </Pressable>
        </View>
        <TextAtom
          text={`${item?.upload_file || ''}` }
          preset="heading4"
          style={[styles.boldText, {marginTop: mScale.base}]}
          numberOfLines={2}
        />
        <TextAtom
          text={ item?.created_at
            ? formatDateMonthTime(item?.created_at)
            : ''}
          preset="medium"
          style={{fontWeight: '400', marginVertical: mScale.md,color:colorPresets.GRAY}}
          numberOfLines={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: mScale.lg2,
    overflow: 'hidden',
    backgroundColor: '#222431',
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    borderRadius: 12,
  },
  image: {
    width: moderateScale(115),
    height: moderateScale(133),
  },
  content: {flex: 1},
  boldText: {
    fontWeight: '500',
  },
});
