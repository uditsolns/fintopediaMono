import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import LoaderAtom from '@src/components/LoaderAtom';
import {NotificationsMolecule} from '@src/components/molecules/NotificationsMolecule/NotificationsMolecule';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {FlatList, TouchableOpacity, View, ViewStyle} from 'react-native';

interface NotificationInterface extends NavType<'Notification'> {}

export const Notification: React.FC<NotificationInterface> = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{width: moderateScale(100)}}>
          <TextAtom
            text={'Mark all as read'}
            style={{color: colorPresets.PRIMARY}}
            preset="medium"
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const renderItem = ({item}: {item: any}) => {
    return <NotificationsMolecule item={item} />;
  };
  return (
    <GradientTemplate style={{paddingBottom: 0, paddingTop: moderateScale(70),padding:mScale.lg1}}>
      {false ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <View style={{marginTop:mScale.xl}}>

      <FlatList
        data={[...Array(10)]}
        renderItem={renderItem}
        contentContainerStyle={{rowGap: mScale.lg, paddingBottom: mScale.xxl}}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </GradientTemplate>
  );
};
