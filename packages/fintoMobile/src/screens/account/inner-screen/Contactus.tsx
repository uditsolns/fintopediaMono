import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import FrequentlyAskMolecule from '@src/components/molecules/FrequentlyAskMolecule/FrequentlyAskMolecule';
import SeparatorAtom from '@src/components/SeperatorAtom';
import React from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {NavType} from '@src/navigation/types';
import {useContactSupportHelper} from '@shared/src/components/structures/contact-support/contactSupport.helper';
import {contactSupportField} from '@shared/src/components/structures/contact-support/contactSupportModel';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';

interface ContactusProps {}

export const Contactus: React.FC<ContactusProps> = ({}) => {
  const {contactSupportFormik, contactSupportInputProps} =
    useContactSupportHelper();
  const {handleSubmit, setFieldValue} = contactSupportFormik;
  const [show, setShow] = React.useState(false);

  const renderItem = ({item}: {item: any}) => <FrequentlyAskMolecule />;

  const InfoCard = ({icon, text}: {icon?: JSX.Element; text?: string}) => (
    <View style={styles.infoCard}>
      {icon}
      <TextAtom text={text} preset="medium" style={styles.textMargin} />
    </View>
  );

  return (
    <GradientTemplate style={{paddingBottom: 0, paddingTop: moderateScale(70)}}>
      <ScrollViewAtom>
        <View>
          <View style={styles.contactCard}>
            <View style={[commonStyle.flexStart]}>
              <View style={styles.flex1}>
                <TextAtom text="Get in touch with us" preset="heading3" />
                <TextAtom
                  text="Reach out to us for inquiries, collaborations, or just to say hello. We're here to listen."
                  style={{color: '#D5D5D9'}}
                  preset="medium"
                />
              </View>
              <Pressable
                onPress={() => {
                  setShow(!show);
                }}>
                {!show ? (
                  <Images.SVG.CircleChevronDownIcon />
                ) : (
                  <Images.SVG.CircleChevronUpIcon />
                )}
              </Pressable>
            </View>
            {show ? (
              <View style={{paddingLeft: mScale.sm}}>
                <View style={{marginBottom: mScale.lg}}>
                  <InputAtom
                    {...contactSupportInputProps(
                      contactSupportField.first_name.name,
                    )}
                    label={contactSupportField.first_name.label}
                    placeholder={contactSupportField.first_name.placeHolder}
                    shape="square"
                  />
                </View>
                <View style={{marginBottom: mScale.lg}}>
                  <InputAtom
                    shape="square"
                    {...contactSupportInputProps(
                      contactSupportField.last_name.name,
                    )}
                    label={contactSupportField.last_name.label}
                    placeholder={contactSupportField.last_name.placeHolder}
                  />
                </View>
                <View style={{marginBottom: mScale.lg}}>
                  <InputAtom
                    shape="square"
                    {...contactSupportInputProps(
                      contactSupportField.email.name,
                    )}
                    label={contactSupportField.email.label}
                    placeholder={contactSupportField.email.placeHolder}
                    autoCapitalize="none"
                  />
                </View>
                <View style={{marginBottom: mScale.lg}}>
                  <InputAtom
                    shape="square"
                    {...contactSupportInputProps(
                      contactSupportField.phone.name,
                    )}
                    label={contactSupportField.phone.label}
                    placeholder={contactSupportField.phone.placeHolder}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{marginBottom: mScale.lg}}>
                  <InputAtom
                    shape="square"
                    {...contactSupportInputProps(
                      contactSupportField.message.name,
                    )}
                    label={contactSupportField.message.label}
                    placeholder={contactSupportField.message.placeHolder}
                    style={{
                      minHeight: moderateScale(150),
                      textAlignVertical: 'top',
                    }}
                  />
                </View>
                <View>
                  <ButtonAtom
                    title="Submit"
                    onPress={() => {
                      handleSubmit();
                    }}
                    // loading={loading?.signup}
                  />
                </View>
              </View>
            ) : null}
          </View>

          <InfoCard
            icon={<Images.SVG.SupportEmailIcon />}
            text="support@flintopedia.com"
          />
          <InfoCard
            icon={<Images.SVG.DialNumberIcon />}
            text="+91 12345 67890"
          />
          <InfoCard
            icon={<Images.SVG.MapIcon />}
            text="Somewhere in the World"
          />
          <View style={styles.socialMediaSection}>
            <TextAtom text="Follow Us on Social Media" preset="heading3" />
            <View style={styles.socialMediaIcons}>
              <Pressable>
                <Images.SVG.Fb2 />
              </Pressable>
              <Pressable style={styles.iconMargin}>
                <Images.SVG.Twitter2 />
              </Pressable>
              <Pressable style={styles.iconMargin}>
                <Images.SVG.LinkedIn2 />
              </Pressable>
            </View>
          </View>
          <View style={styles.faqSection}>
            <TextAtom
              text="Frequently Asked Questions"
              preset="heading3"
              style={styles.faqTitle}
            />
            <View style={styles.faqContainer}>
              <FlatList
                data={[...Array(5).keys()]}
                renderItem={renderItem}
                keyExtractor={item => item.toString()}
                ItemSeparatorComponent={() => (
                  <View style={{width: WINDOW_WIDTH}}>
                    <SeparatorAtom
                      marginHorizontal={mScale.md}
                      bgColor={colorPresets.CTA}
                      height={0.5}
                    />
                  </View>
                )}
                contentContainerStyle={{rowGap: mScale.md}}
              />
            </View>
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  contactCard: {
    padding: mScale.md3,
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    borderRadius: 12,
    backgroundColor: '#0D0F1B',
    flexGrow: 1,
  },
  flex1: {flex: 1, paddingTop: 0, padding: mScale.md},
  infoCard: {
    ...commonStyle.flexStart,
    padding: mScale.md3,
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    borderRadius: 12,
    backgroundColor: '#0D0F1B',
    marginTop: mScale.base,
  },
  textMargin: {marginStart: mScale.base},
  socialMediaSection: {marginTop: mScale.xxl},
  socialMediaIcons: {...commonStyle.flexStart, marginVertical: mScale.base},
  iconMargin: {marginStart: mScale.md},
  faqSection: {marginTop: mScale.md},
  faqTitle: {marginBottom: mScale.md},
  faqContainer: {
    padding: mScale.md,
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    borderRadius: 12,
    backgroundColor: '#0D0F1B',
    marginBottom: mScale.xxl1,
  },
});
