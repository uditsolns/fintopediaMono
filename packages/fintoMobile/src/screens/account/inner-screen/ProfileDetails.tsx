import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {mScale} from '@shared/src/theme/metrics';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import LoaderAtom from '@src/components/LoaderAtom';
import ProfileIcon from '@src/components/Profile/ProfileIcon';
import React from 'react';
import {Text, View} from 'react-native';
const avatarUrl =
  'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg';
interface ProfileDetailsProps {}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({}) => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNo, setPhoneNo] = React.useState('');
  const [headline, setHeadline] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [linkedin, setLinkedin] = React.useState('');
  const [websiteUrl, setWebsiteUrl] = React.useState('');

  return (
    <GradientTemplate style={{paddingBottom: 0}}>
      {false ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <View style={[commonStyle.flexSpaceBetween]}>
        <HeaderLeftMolecule text={'Profile details'} />
        <ButtonAtom title={'Save'} textPreset={'titleBold'} />
      </View>
      <ScrollViewAtom>
        <View>
          <ProfileIcon avatarUrl={avatarUrl} />
          <View style={{marginVertical: mScale.lg}}>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Name"
                placeholder="Enter your name"
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Surname"
                placeholder="Enter your surname"
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Email"
                placeholder="Enter your email id"
                autoCapitalize="none"
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Phone number"
                placeholder="Enter your phone number"
                keyboardType="numeric"
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Headline"
                placeholder="Enter your headline"
                autoCapitalize="none"
                multiline={true}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Bio"
                placeholder="Enter your bio"
                autoCapitalize="none"
                multiline={true}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Linkedin"
                placeholder="Enter your linkedin url"
                autoCapitalize="none"
                multiline={true}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Website URL"
                placeholder="Enter your website url"
                autoCapitalize="none"
                multiline={true}
              />
            </View>
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
