import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {Pressable, View} from 'react-native';

interface ReferFriendsProps {}

export const ReferFriends: React.FC<ReferFriendsProps> = ({}) => {
  return (
    <GradientTemplate style={{paddingBottom: 0,paddingTop:moderateScale(70)}}>
      <ScrollViewAtom>
        <View
          style={{
            flex: 1,
            marginTop: moderateScale(100),
          }}>
          <View style={{padding: mScale.base, marginBottom: mScale.md}}>
            <TextAtom
              text={'Invite Friends, Get 500 credits of Fintopedia'}
              preset="banner"
              style={{textAlign: 'center', fontWeight: '600'}}
            />
            <TextAtom
              text={
                'Share 500 credits of Skillshare with your friends, and earn a free month for each friend once they complete their first full payment.'
              }
              preset="medium"
              style={{
                textAlign: 'center',
                color: '#C8C8CC',
                fontWeight: '400',
                marginTop: mScale.base,
              }}
            />
          </View>
          <InputAtom
            shape="square"
            editable={false}
            placeholder="https//www.fintopedia.com/urvashirefer10"
            preset="primary"
          />

          <View>
            <ButtonAtom title={'Copy'} textPreset={'titleBold'} />
          </View>
          <View style={[commonStyle.flexCenter, {marginTop: mScale.lg2}]}>
            <Pressable>
              <Images.SVG.Fb2 />
            </Pressable>
            <Pressable style={{marginStart: mScale.md}}>
              <Images.SVG.Twitter2 />
            </Pressable>
            <Pressable style={{marginStart: mScale.md}}>
              <Images.SVG.LinkedIn2 />
            </Pressable>
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
