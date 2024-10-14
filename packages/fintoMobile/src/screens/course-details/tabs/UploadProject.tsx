import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_HEIGHT} from '@shared/src/theme/metrics';
import {fontPresets} from '@shared/src/theme/typography';
import PdfMolecule from '@src/components/molecules/PdfMolecule/PdfMolecule';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import React from 'react';
import {FlatList, Text, View} from 'react-native';

interface UploadProjectProps {}
export const UploadProject: React.FunctionComponent<
  UploadProjectProps
> = () => {
  const renderItem = ({item}: {item: any}) => {
    return <PdfMolecule item={item} />;
  };

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        padding: mScale.base,
        paddingBottom: 0,
        zIndex: 1,
        height: WINDOW_HEIGHT,
      }}>
      <View>
        <View>
          <TextAtom text={'Upload Project'} preset="heading4" />
          <TextAtom
            text="Upload your completed project in pdf or docx format. After submitting, mentor will give feedback in 2-3 days"
            preset="medium"
            style={{marginVertical: mScale.md, color: '#D5D5D9'}}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colorPresets.GRAY3,
            padding: mScale.xxl,
            borderRadius: 12,
            marginVertical: mScale.base,
          }}>
          <View style={[commonStyle.flexSpaceBetween]}>
            <Images.SVG.CloudUpload />
            <Text
              style={{
                ...fontPresets.titleBold,
                color: '#717171',
                marginStart: mScale.md,
              }}>
              Drag or drop your files to upload, or{' '}
              <Text style={{fontSize: 16}}>Browse</Text>{' '}
            </Text>
          </View>
          <TextAtom
            preset="medium"
            text={'Format: Pdf, Docx, Zip file'}
            style={{
              marginVertical: mScale.md,
              textAlign: 'center',
              color: '#717171',
            }}
          />

          {/* <ButtonIconRightAtom
            btnTitle={'Upload a file'}
            iconColor={colorPresets.BLACK}
            iconSize={mScale.lg}
            color={colorPresets.BLACK}
            iconName={'cloud-upload-outline'}
            preset={'mediumBold'}
            style={{marginTop: mScale.md}}
          /> */}
          <ButtonAtom title={'Upload a file'} preset="primary" />
          <TextAtom
            preset="body"
            text={'File under 20 MB'}
            style={{
              marginVertical: mScale.md,
              textAlign: 'center',
              color: '#717171',
            }}
          />
        </View>
        <View style={{marginVertical: mScale.base}}>
          <View style={{marginStart: -mScale.md2}}>
            <ViewAll title="Previously Uploaded Projects" visible={false} />
          </View>

          <FlatList
            data={[...Array(15)]}
            renderItem={renderItem}
            contentContainerStyle={{
              rowGap: mScale.base,
              paddingBottom: moderateScale(WINDOW_HEIGHT * 0.5),
            }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
        </View>
      </View>
    </View>
  );
};
