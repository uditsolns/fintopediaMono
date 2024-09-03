import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import LoaderAtom from '@src/components/LoaderAtom';
import {NotificationsMolecule} from '@src/components/molecules/NotificationsMolecule/NotificationsMolecule';
import React from 'react';
import {FlatList, TouchableOpacity, View, ViewStyle} from 'react-native';

interface NotificationInterface {}

export const Notification: React.FC<NotificationInterface> = () => {
  const renderItem = ({item}) => {
    return <NotificationsMolecule item={item} />;
  };
  return (
    <GradientTemplate style={{paddingBottom: 0}}>
      {false ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <View style={[commonStyle.flexSpaceBetween]}>
        <HeaderLeftMolecule text={'Notifications'} />
        <TouchableOpacity>
          <TextAtom
            text={'Mark all as read'}
            style={{color:colorPresets.PRIMARY}}
            preset="medium"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={[...Array(10)]}
        renderItem={renderItem}
        contentContainerStyle={{rowGap: mScale.lg, paddingBottom: mScale.xxl}}
        showsVerticalScrollIndicator={false}
      />
    </GradientTemplate>
  );
};
