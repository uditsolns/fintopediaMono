import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import FrequentlyAskMolecule from '@src/components/molecules/FrequentlyAskMolecule/FrequentlyAskMolecule';
import SeparatorAtom from '@src/components/SeperatorAtom';
import React from 'react';
import {FlatList, Linking, Pressable, StyleSheet, View} from 'react-native';
import {NavType} from '@src/navigation/types';
import {useContactSupportHelper} from '@shared/src/components/structures/contact-support/contactSupport.helper';
import {contactSupportField} from '@shared/src/components/structures/contact-support/contactSupportModel';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {Toast} from 'react-native-toast-notifications';
import GradientBorderBox from '@src/components/Border/GradientBorderBox';
import BorderWithThickness from '@src/components/Border';

interface ContactusProps {}

export const Contactus: React.FC<ContactusProps> = ({}) => {
  const {contactSupportFormik, contactSupportInputProps} =
    useContactSupportHelper();
  const {handleSubmit, setFieldValue} = contactSupportFormik;
  const [show, setShow] = React.useState(false);
  const {create, loading} = useAppSelector(state => state.contact);

  React.useEffect(() => {
    if (create) {
      Toast.show('Contact details send successfully', {
        type: 'success',
      });
    }
  }, [create]);

  const renderItem = ({item}: {item: any}) => <FrequentlyAskMolecule />;

  const InfoCard = ({icon, text}: {icon?: JSX.Element; text?: string}) => (
    <View style={{marginTop: mScale.base}}>
      <GradientBorderBox>
        <View style={styles.infoCard}>
          {icon}
          <TextAtom text={text} preset="medium" style={styles.textMargin} />
        </View>
      </GradientBorderBox>
    </View>
  );

  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        padding: mScale.lg1,
        paddingTop: moderateScale(70),
      }}>
      <ScrollViewAtom>
        <View>
          <GradientBorderBox>
            <View style={styles.contactCard}>
              <View style={[commonStyle.flexStart, {alignItems: 'flex-start'}]}>
                <View style={styles.flex1}>
                  <TextAtom
                    text="Get in touch with us"
                    preset="heading3"
                    style={{fontWeight: '600'}}
                  />
                  <TextAtom
                    text="Reach out to us for inquiries, collaborations, or just to say hello. We're here to listen."
                    style={{
                      color: '#D5D5D9',
                      fontWeight: '400',
                      lineHeight: 20,
                      marginTop: mScale.sm,
                    }}
                    preset="medium"
                  />
                </View>
                <Pressable
                  onPress={() => {
                    setShow(!show);
                  }}>
                  {show ? (
                    <Images.SVG.CircleChevronDownIcon />
                  ) : (
                    <Images.SVG.CircleChevronUpIcon />
                  )}
                </Pressable>
              </View>
              {show ? (
                <View style={{paddingLeft: mScale.sm}}>
                  <View style={{marginBottom: mScale.base}}>
                    <InputAtom
                      {...contactSupportInputProps(
                        contactSupportField.first_name.name,
                      )}
                      label={contactSupportField.first_name.label}
                      placeholder={contactSupportField.first_name.placeHolder}
                      shape="square"
                    />
                  </View>
                  <View style={{marginBottom: mScale.base}}>
                    <InputAtom
                      shape="square"
                      {...contactSupportInputProps(
                        contactSupportField.last_name.name,
                      )}
                      label={contactSupportField.last_name.label}
                      placeholder={contactSupportField.last_name.placeHolder}
                    />
                  </View>
                  <View style={{marginBottom: mScale.base}}>
                    <InputAtom
                      shape="square"
                      {...contactSupportInputProps(
                        contactSupportField.email_id.name,
                      )}
                      label={contactSupportField.email_id.label}
                      placeholder={contactSupportField.email_id.placeHolder}
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={{marginBottom: mScale.base}}>
                    <InputAtom
                      shape="square"
                      {...contactSupportInputProps(
                        contactSupportField.phone_no.name,
                      )}
                      label={contactSupportField.phone_no.label}
                      placeholder={contactSupportField.phone_no.placeHolder}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{marginBottom: mScale.base}}>
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
                        setShow(false);
                      }}
                      loading={loading?.create}
                    />
                  </View>
                </View>
              ) : null}
            </View>
          </GradientBorderBox>

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
            <TextAtom
              text="Follow Us on Social Media"
              preset="heading3"
              style={{fontWeight: '600'}}
            />
            <View style={styles.socialMediaIcons}>
              <Pressable
                onPress={() => {
                  Linking.openURL(
                    'https://www.facebook.com/people/Fintopedia/61551172396495/',
                  );
                }}>
                <Images.SVG.Fb2 />
              </Pressable>
              <Pressable
                style={styles.iconMargin}
                onPress={() => {
                  Linking.openURL('https://x.com/fintopedia');
                }}>
                <Images.SVG.Twitter2 />
              </Pressable>
              <Pressable
                style={styles.iconMargin}
                onPress={() => {
                  Linking.openURL(
                    'https://www.linkedin.com/company/fintopedia/?originalSubdomain=in',
                  );
                }}>
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
            <GradientBorderBox>
              <View style={styles.faqContainer}>
                <FlatList
                  data={[...Array(5).keys()]}
                  renderItem={renderItem}
                  keyExtractor={item => item.toString()}
                  ItemSeparatorComponent={() => <BorderWithThickness mv={0} />}
                  contentContainerStyle={{rowGap: mScale.md}}
                />
              </View>
            </GradientBorderBox>
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  contactCard: {
    width: '100%',
    flexGrow: 1,
    paddingHorizontal: mScale.base,
    paddingVertical: mScale.lg3,
  },
  flex1: {flex: 1, paddingTop: 0, padding: mScale.md},
  infoCard: {
    ...commonStyle.flexStart,
    padding: mScale.base,
  },
  textMargin: {marginStart: mScale.base},
  socialMediaSection: {marginTop: mScale.xxl},
  socialMediaIcons: {...commonStyle.flexStart, marginVertical: mScale.lg2},
  iconMargin: {marginStart: mScale.md},
  faqSection: {marginTop: mScale.md, marginBottom: moderateScale(60)},
  faqTitle: {marginBottom: mScale.md},
  faqContainer: {
    paddingVertical: mScale.lg2,
    paddingHorizontal: mScale.base,
  },
});
