import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import LoaderAtom from '@src/components/LoaderAtom';
import ProfileIcon from '@src/components/Profile/ProfileIcon';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {View} from 'react-native';
import {useUserHelper} from '@shared/src/components/structures/user/user.helper';
import {userField} from '@shared/src/components/structures/user/userModel';
import {PopupUpload} from '@src/components/Popup/PopupUpload';
import {imageUrl} from '@shared/src/config/imageUrl';
import {ImageType} from '@shared/src/utils/types/main';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {colorPresets} from '@shared/src/theme/color';

const avatarUrl =
  'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg';

interface ProfileDetailsProps extends NavType<'ProfileDetails'> {}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {current_user} = useAppSelector(state => state.auth);
  const {loading, update} = useAppSelector(state => state.users);
  const {userFormik, userInputProps} = useUserHelper();
  const {handleSubmit, setFieldValue} = userFormik;

  const [modalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const [photo, setPhoto] = React.useState<ImageType | null | undefined>(null);

  React.useEffect(() => {
    setFieldValue(userField.id.name, current_user?.id || '');
    setFieldValue(userField.first_name.name, current_user?.first_name || '');
    setFieldValue(
      userField.surname_name.name,
      current_user?.surname_name || '',
    );
    setFieldValue(userField.email.name, current_user?.email || '');
    setFieldValue(userField.phone.name, current_user?.phone || '');
    setFieldValue(userField.bio.name, current_user?.bio || '');
    setFieldValue(userField.headline.name, current_user?.headline || '');
    setFieldValue(userField.linkedin.name, current_user?.linkedin || '');
    setFieldValue(userField.website_url.name, current_user?.website_url || '');
  }, [current_user]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <ButtonAtom
            title={'Save'}
            textPreset={'titleBold'}
            onPress={() => {
              handleSubmit();
            }}
            style={{
              backgroundColor: colorPresets.CTA,
              width: moderateScale(84),
              borderRadius: 4,
              paddingVertical: mScale.md,
              paddingHorizontal: mScale.lg1,
              marginRight:mScale.sm
            }}
          />
        );
      },
    });
  }, []);

  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingTop: moderateScale(75),
        padding: moderateScale(28),
      }}>
      {loading.update ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <ScrollViewAtom>
        <View style={{paddingTop: mScale.xl}}>
          <ProfileIcon
            avatarUrl={
              photo
                ? photo?.uri
                : current_user?.photo
                ? `${imageUrl}/uploads/user_photo/${current_user?.photo}`
                : avatarUrl
            }
            onPress={() => setModalVisible(true)}
          />
          <View style={{paddingTop: moderateScale(32)}}>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                {...userInputProps(userField.first_name.name)}
                label={userField.first_name.label}
                placeholder={userField.first_name.placeHolder}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                {...userInputProps(userField.surname_name.name)}
                label={userField.surname_name.label}
                placeholder={userField.surname_name.placeHolder}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                {...userInputProps(userField.email.name)}
                label={userField.email.label}
                placeholder={userField.email.placeHolder}
                autoCapitalize="none"
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                {...userInputProps(userField.phone.name)}
                label={userField.phone.label}
                placeholder={userField.phone.placeHolder}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                {...userInputProps(userField.headline.name)}
                label={userField.headline.label}
                placeholder={userField.headline.placeHolder}
                autoCapitalize="none"
                multiline={true}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                {...userInputProps(userField.bio.name)}
                label={userField.bio.label}
                placeholder={userField.bio.placeHolder}
                autoCapitalize="none"
                multiline={true}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                {...userInputProps(userField.linkedin.name)}
                label={userField.linkedin.label}
                placeholder={userField.linkedin.placeHolder}
                autoCapitalize="none"
                multiline={true}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                {...userInputProps(userField.website_url.name)}
                label={userField.website_url.label}
                placeholder={userField.website_url.placeHolder}
                autoCapitalize="none"
                multiline={true}
              />
            </View>
          </View>
        </View>
      </ScrollViewAtom>
      <PopupUpload
        isVisible={modalVisible}
        toggleModal={toggleModal}
        onImagePick={(data: ImageType[]) => {
          let res = data?.pop();
          setFieldValue(userField.photo.name, res || '');
          setPhoto(res);
        }}
      />
    </GradientTemplate>
  );
};
