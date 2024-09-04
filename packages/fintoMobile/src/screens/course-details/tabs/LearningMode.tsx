import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import SeparatorAtom from '@src/components/SeperatorAtom';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
let dailyReminderArr = [
  {
    id: 1,
    text: 'Daily',
  },
  {
    id: 2,
    text: 'Weekly',
  },
  {
    id: 3,
    text: 'Monthly',
  },
];

interface LearningModeProps {}
export const LearningMode: React.FunctionComponent<LearningModeProps> = () => {
  let [selectedReminder, setSelectedReminder] = React.useState<number>(1);
  const [visible, setVisible] = React.useState<boolean>(false);
  return (
    <GradientTemplate style={{paddingBottom: 0}}>
      <View style={{marginVertical: mScale.md}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colorPresets.GRAY3,
            borderRadius: 7,
            padding: mScale.lg2,
            backgroundColor: '#222431',
          }}>
          <TextAtom text={'Schedule Daily Timer'} preset="heading4" />
          <TextAtom
            style={{color: '#D5D5D9'}}
            text={
              'Set up push notifications or calendar events to stay on track for your learning goals.'
            }
            preset="medium"
          />
          <ButtonAtom
            title={'Add a learning reminder'}
            preset="primary"
            onPress={() => {
              setVisible(true);
            }}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: colorPresets.GRAY3,
            borderRadius: 7,
            padding: mScale.lg2,
            backgroundColor: '#222431',
            marginVertical: mScale.base,
          }}>
          <TextAtom text={'Mobile Notification'} preset="heading4" />
          <TextAtom
            text={'Receive learning reminders on your mobile device.'}
            preset="medium"
            style={{color: '#D5D5D9'}}
          />
          <InputAtom
            shape="square"
            placeholder={'Your phone number'}
            keyboardType="numeric"
          />
          <ButtonAtom title={'Send'} preset="primary" />
          <TextAtom
            style={{color: '#9D9D9D'}}
            preset="xSmall"
            text={`By providing your phone number, you agree to receive a one-time automated text message with a link to get app. Standard messaging rates may apply.`}
          />
        </View>
      </View>
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.overlay}>
          {/* <Svg height="100%" width="100%" style={styles.popup}>
            <Defs>
              <LinearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="rgba(45, 48, 61, 1)" />
                <Stop offset="1" stopColor="rgba(33, 35, 48, 1)" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)" />
          </Svg> */}

          <View style={styles.content}>
            <View style={[commonStyle.flexSpaceBetween, {width: '100%'}]}>
              <TextAtom text={'Schedule Daily Timer'} preset="heading2" />
              <Pressable
                onPress={() => {
                  setVisible(false);
                }}>
                <Images.SVG.Cross />
              </Pressable>
            </View>
            <SeparatorAtom
              marginHorizontal={0}
              bgColor={colorPresets.CTA}
              style={{marginVertical: mScale.base}}
            />
            <View style={{marginVertical: mScale.base}}>
              <TextAtom text={'Frequency'} preset="titleBold" />
              <View
                style={[
                  commonStyle.flexStart,
                  {alignSelf: 'flex-start', marginVertical: mScale.md},
                ]}>
                {dailyReminderArr?.map((el, index) => (
                  <TouchableOpacity
                    key={el.id}
                    style={{
                      padding: mScale.md,
                      backgroundColor:
                        selectedReminder == el?.id
                          ? colorPresets.BLACK
                          : 'rgba(255,255,255,0.1)',
                      borderRadius: 20,
                      marginEnd: mScale.md,
                    }}
                    onPress={() => {
                      setSelectedReminder(index + 1);
                    }}>
                    <TextAtom
                      text={el?.text}
                      preset="xSmallBold"
                      style={{
                        color:
                          selectedReminder == el?.id
                            ? colorPresets.CTA
                            : colorPresets.GRAY,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={{marginBottom: mScale.base}}>
              <TextAtom text={'Time'} preset="smallBold" />
              <TouchableOpacity
                style={[
                  commonStyle.flexSpaceBetween,
                  {
                    borderWidth: 1,
                    borderColor: colorPresets.GRAY3,
                    borderRadius: 6,
                    backgroundColor: 'rgba(34, 36, 49, 1)',
                    padding: mScale.md,
                    marginVertical: mScale.md,
                  },
                ]}>
                <TextAtom text={'12.00 pm '} />
                <Images.SVG.Selector />
              </TouchableOpacity>
            </View>
            <View>
              <TextAtom text={'Link your Calendar'} preset="smallBold" />
              {/* <ButtonImageLeftAtom
              sourceRequire={require('../../../assets/images/googleIcon.png')}
              btnTitle={'Continue with Google'}
              btnColor={'transparent'}
              color={colorPresets.WHITE}
              preset={'smallBold'}
              style={{
                borderWidth: 1,
                borderColor: colorPresets.BORDERCOLOR,
                paddingVertical: mScale.md2,
                marginVertical: mScale.md,
              }}
            /> */}
            </View>
            <View
              style={[
                commonStyle.flexEnd,
                {alignItems: 'center', marginVertical: mScale.base},
              ]}>
              {/* <SmallButtonAtom
              btnTitle={'Cancel'}
              btnColor={'transparent'}
              preset={'captionBold'}
              color={colorPresets.WHITE}
            /> */}
              {/* <SmallButtonAtom
              btnTitle={'Save'}
              preset={'captionBold'}
              style={{
                width: moderateScale(119),
                height: moderateScale(36),
                marginStart: mScale.base,
              }}
            /> */}
            </View>
          </View>
        </View>
      </Modal>
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  popup: {
    width: '95%',
    borderRadius: 8,
    padding: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    width: '100%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});
