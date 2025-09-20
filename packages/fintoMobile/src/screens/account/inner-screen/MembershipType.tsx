import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import GradientBorderBox from '@src/components/Border/GradientBorderBox';
import {LinkButton} from '@src/components/Button/LinkButton';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MembershipTypeProps {}

export const MembershipType: React.FC<MembershipTypeProps> = ({}) => {
  const [upgrade, setUpgrade] = React.useState(false);
  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        padding: mScale.lg1,
        paddingTop: moderateScale(70),
      }}>
      <ScrollViewAtom>
        <View style={{paddingTop: moderateScale(35)}}>
          <View>
            <TextAtom text={'Active Plan'} preset="heading4" />
            {upgrade ? (
              <View style={styles.activePlan}>
                <TextAtom
                  text={'You don’t have any active membership plans'}
                  preset="medium"
                  style={{textAlign: 'center', fontWeight: '500'}}
                />
              </View>
            ) : (
              <View style={{marginTop: mScale.base}}>
                <GradientBorderBox
                  linearColor={['#121622', '#121622']}
                  borderRadium={12}>
                  <View
                    style={[styles.activePlanDetails, {padding: mScale.lg2}]}>
                    <View style={[commonStyle.flexSpaceBetween]}>
                      <TextAtom
                        text={'Team plan'}
                        preset="heading3"
                        style={{fontWeight: '600'}}
                      />
                      <TextAtom
                        text={'₹ 499/month'}
                        preset="heading4"
                        style={{fontWeight: '500'}}
                      />
                    </View>
                    <TextAtom
                      text={'Subscribed on 11 dec 2022'}
                      preset="medium"
                      style={{
                        color: '#D5D5D9',
                        fontWeight: '400',
                        marginTop: mScale.xs,
                      }}
                    />
                    <View
                      style={[
                        commonStyle.flexSpaceBetween,
                        {marginTop: mScale.lg2},
                      ]}>
                      <TextAtom
                        text={'Next Billing Cycle'}
                        preset="medium"
                        style={{color: '#D5D5D9'}}
                      />
                      <TextAtom
                        text={'11th Jan 2023'}
                        preset="medium"
                        style={{color: '#D5D5D9'}}
                      />
                    </View>
                    <View style={{marginTop: mScale.xl}}>
                      <ButtonAtom title={'Upgrade'} textPreset={'smallBold'} />
                    </View>
                    <View style={{marginVertical: mScale.md2}}>
                      <LinkButton
                        text={'Cancel membership'}
                        style={{alignSelf: 'center', padding: mScale.md2}}
                        preset="titleBold"
                        linkColor={colorPresets.CTA}
                      />
                    </View>
                  </View>
                </GradientBorderBox>
              </View>
            )}
          </View>
          <View style={{marginVertical: mScale.xxl}}>
            <TextAtom text={'Membership plans available'} preset="heading3" />
            <View style={{marginTop: mScale.lg1}}>
              <GradientBorderBox
                linearColor={['#121622', '#121622']}
                borderRadium={12}>
                <View
                  style={[
                    styles.activePlanDetails,
                    {
                      paddingHorizontal: mScale.lg,
                      paddingVertical: moderateScale(23),
                    },
                  ]}>
                  <ImageAtom
                    sourceRequire={require('@shared/src/assets/img/membershipPlan.png')}
                    imageStyle={{
                      width: moderateScale(300),
                      height: moderateScale(165),
                    }}
                  />
                  <View
                    style={{marginTop: mScale.base, marginBottom: mScale.sm}}>
                    <TextAtom
                      text={'Personal Plan'}
                      preset="heading3"
                      style={{fontWeight: '600'}}
                    />
                  </View>
                  <TextAtom
                    text={`New opportunities await. Sign up for Personal Plan to get all this and more:`}
                    preset="small"
                    style={{color: '#C8C8CC'}}
                  />
                  <View
                    style={{
                      paddingStart: mScale.md,
                    }}>
                    <View style={[commonStyle.flexStart]}>
                      <TextAtom
                        text={`\u2B24`}
                        preset="xSmall"
                        style={{color: '#C8C8CC'}}
                      />
                      <TextAtom
                        text={`Access to 11,000+ top courses`}
                        preset="small"
                        style={{color: '#C8C8CC', marginStart: mScale.md}}
                      />
                    </View>
                    <View style={[commonStyle.flexStart]}>
                      <TextAtom
                        text={`\u2B24`}
                        preset="small"
                        style={{color: '#C8C8CC'}}
                      />
                      <TextAtom
                        text={`Access to 11,000+ top courses`}
                        preset="small"
                        style={{color: '#C8C8CC', marginStart: mScale.md}}
                      />
                    </View>
                    <View style={[commonStyle.flexStart]}>
                      <TextAtom
                        text={`\u2B24`}
                        preset="small"
                        style={{color: '#C8C8CC'}}
                      />
                      <TextAtom
                        text={`Access to 11,000+ top courses`}
                        preset="small"
                        style={{color: '#C8C8CC', marginStart: mScale.md}}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      commonStyle.flexStart,
                      {marginVertical: mScale.base},
                    ]}>
                    <View style={{width: moderateScale(130)}}>
                      <ButtonAtom
                        title={'Subscribe'}
                        textPreset={'titleBold'}
                      />
                    </View>
                    <TouchableOpacity
                      style={[
                        {marginHorizontal: mScale.lg1, alignSelf: 'center'},
                      ]}>
                      <TextAtom
                        text={'Learn about pricing'}
                        style={styles.underLine}
                        preset="title"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </GradientBorderBox>
            </View>
            <View style={{marginTop: mScale.lg1}}>
              <GradientBorderBox
                linearColor={['#121622', '#121622']}
                borderRadium={12}>
                <View
                  style={[
                    styles.activePlanDetails,
                    {
                      paddingHorizontal: mScale.lg,
                      paddingVertical: moderateScale(23),
                    },
                  ]}>
                  <ImageAtom
                    sourceRequire={require('@shared/src/assets/img/membershipPlan.png')}
                    imageStyle={{
                      width: moderateScale(335),
                      height: moderateScale(165),
                    }}
                  />
                  <View
                    style={{marginTop: mScale.base, marginBottom: mScale.sm}}>
                    <TextAtom
                      text={'Personal Plan'}
                      preset="heading3"
                      style={{fontWeight: '600'}}
                    />
                  </View>
                  <TextAtom
                    text={`New opportunities await. Sign up for Personal Plan to get all this and more:`}
                    preset="small"
                    style={{color: '#C8C8CC'}}
                  />
                  <View
                    style={{
                      paddingStart: mScale.md,
                    }}>
                    <View style={[commonStyle.flexStart]}>
                      <TextAtom
                        text={`\u2B24`}
                        preset="xSmall"
                        style={{color: '#C8C8CC'}}
                      />
                      <TextAtom
                        text={`Access to 11,000+ top courses`}
                        preset="small"
                        style={{color: '#C8C8CC', marginStart: mScale.md}}
                      />
                    </View>
                    <View style={[commonStyle.flexStart]}>
                      <TextAtom
                        text={`\u2B24`}
                        preset="small"
                        style={{color: '#C8C8CC'}}
                      />
                      <TextAtom
                        text={`Access to 11,000+ top courses`}
                        preset="small"
                        style={{color: '#C8C8CC', marginStart: mScale.md}}
                      />
                    </View>
                    <View style={[commonStyle.flexStart]}>
                      <TextAtom
                        text={`\u2B24`}
                        preset="small"
                        style={{color: '#C8C8CC'}}
                      />
                      <TextAtom
                        text={`Access to 11,000+ top courses`}
                        preset="small"
                        style={{color: '#C8C8CC', marginStart: mScale.md}}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      commonStyle.flexStart,
                      {marginVertical: mScale.base},
                    ]}>
                    <View style={{width: moderateScale(130)}}>
                      <ButtonAtom
                        title={'Subscribe'}
                        textPreset={'titleBold'}
                      />
                    </View>
                    <TouchableOpacity
                      style={[
                        {marginHorizontal: mScale.lg1, alignSelf: 'center'},
                      ]}>
                      <TextAtom
                        text={'Learn about pricing'}
                        style={styles.underLine}
                        preset="title"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </GradientBorderBox>
            </View>
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  activePlan: {
    borderWidth: 1,
    borderColor: colorPresets.CTA,
    borderStyle: 'dashed',
    paddingHorizontal: mScale.md2,
    paddingVertical: mScale.sm,
    marginTop: mScale.base,
    borderRadius: 4,
  },
  activePlanDetails: {
    // borderWidth: 1,
    // borderColor: colorPresets.GRAY3,
    borderRadius: 12,
    padding: mScale.base,
    backgroundColor: '#121622',
    overflow: 'hidden',
  },
  underLine: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontWeight: '500',
  },
});
