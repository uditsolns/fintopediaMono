import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MembershipTypeProps {}

export const MembershipType: React.FC<MembershipTypeProps> = ({}) => {
  return (
    <GradientTemplate style={{paddingBottom: 0, paddingTop: moderateScale(70)}}>
      <ScrollViewAtom>
        <View>
          <View>
            <TextAtom text={'Active Plan'} preset="heading4" />
            <View style={styles.activePlan}>
              <TextAtom
                text={'You don’t have any active membership plans'}
                preset="medium"
                style={{textAlign: 'center'}}
              />
            </View>
          </View>
          <View style={[styles.activePlanDetails]}>
            <View style={[commonStyle.flexSpaceBetween]}>
              <TextAtom text={'Active Plan'} preset="heading3" />
              <TextAtom text={'₹ 499/month'} preset="heading4" />
            </View>
            <TextAtom
              text={'Subscribed on 11 dec 2022'}
              preset="medium"
              style={{color: '#D5D5D9'}}
            />
            <View
              style={[
                commonStyle.flexSpaceBetween,
                {marginVertical: mScale.md},
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
            <ButtonAtom title={'Upgrade'} textPreset={'smallBold'} />
            <LinkButton
              text={'Cancel membership'}
              style={{marginVertical: mScale.base, alignSelf: 'center'}}
              preset="titleBold"
              linkColor={colorPresets.CTA}
            />
          </View>
          <View style={{marginVertical: mScale.base}}>
            <TextAtom text={'Membership plans available'} preset="heading3" />
            <View style={styles.activePlanDetails}>
              <ImageAtom
                sourceRequire={require('@shared/src/assets/img/membershipPlan.png')}
              />
              <View style={{marginVertical: mScale.md}}>
                <TextAtom text={'Personal Plan'} preset="heading3" />
              </View>
              <TextAtom
                text={`New opportunities await. Sign up for Personal Plan to get all this and more:`}
                preset="medium"
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
                    preset="medium"
                    style={{color: '#C8C8CC', marginStart: mScale.md}}
                  />
                </View>
                <View style={[commonStyle.flexStart]}>
                  <TextAtom
                    text={`\u2B24`}
                    preset="xSmall"
                    style={{color: '#C8C8CC'}}
                  />
                  <TextAtom
                    text={`Access to 11,000+ top courses`}
                    preset="medium"
                    style={{color: '#C8C8CC', marginStart: mScale.md}}
                  />
                </View>
                <View style={[commonStyle.flexStart]}>
                  <TextAtom
                    text={`\u2B24`}
                    preset="xSmall"
                    style={{color: '#C8C8CC'}}
                  />
                  <TextAtom
                    text={`Access to 11,000+ top courses`}
                    preset="medium"
                    style={{color: '#C8C8CC', marginStart: mScale.md}}
                  />
                </View>
              </View>
              <View
                style={[commonStyle.flexStart, {marginVertical: mScale.base}]}>
                <ButtonAtom title={'Upgrade'} textPreset={'titleBold'} />
                <TouchableOpacity
                  style={[
                    {marginHorizontal: mScale.base, alignSelf: 'center'},
                  ]}>
                  <TextAtom
                    text={'Learn about pricing'}
                    style={styles.underLine}
                    preset="title"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.activePlanDetails}>
              <ImageAtom
                sourceRequire={require('@shared/src/assets/img/membershipPlan.png')}
              />
              <View style={{marginVertical: mScale.md}}>
                <TextAtom text={'Team Plan'} preset="heading3" />
              </View>
              <TextAtom
                text={`New opportunities await. Sign up for Personal Plan to get all this and more:`}
                preset="medium"
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
                    preset="medium"
                    style={{color: '#C8C8CC', marginStart: mScale.md}}
                  />
                </View>
                <View style={[commonStyle.flexStart]}>
                  <TextAtom
                    text={`\u2B24`}
                    preset="xSmall"
                    style={{color: '#C8C8CC'}}
                  />
                  <TextAtom
                    text={`Access to 11,000+ top courses`}
                    preset="medium"
                    style={{color: '#C8C8CC', marginStart: mScale.md}}
                  />
                </View>
                <View style={[commonStyle.flexStart]}>
                  <TextAtom
                    text={`\u2B24`}
                    preset="xSmall"
                    style={{color: '#C8C8CC'}}
                  />
                  <TextAtom
                    text={`Access to 11,000+ top courses`}
                    preset="medium"
                    style={{color: '#C8C8CC', marginStart: mScale.md}}
                  />
                </View>
              </View>
              <View
                style={[commonStyle.flexStart, {marginVertical: mScale.base}]}>
                <ButtonAtom title={'Upgrade'} textPreset={'titleBold'} />
                <TouchableOpacity
                  style={[
                    {marginHorizontal: mScale.base, alignSelf: 'center'},
                  ]}>
                  <TextAtom
                    text={'Learn about pricing'}
                    style={styles.underLine}
                    preset="titleBold"
                  />
                </TouchableOpacity>
              </View>
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
    padding: mScale.md,
    marginTop: mScale.md,
    borderRadius: 4,
  },
  activePlanDetails: {
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    borderRadius: 12,
    padding: mScale.base,
    marginTop: mScale.base,
    backgroundColor: '#121622',
  },
  underLine: {
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
