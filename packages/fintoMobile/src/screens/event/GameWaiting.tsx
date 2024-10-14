import React from 'react';
import {Alert, BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import PopupAtom from '@src/components/Popup/PopupAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';

interface GameWaitingProps {}
export const GameWaiting: React.FC<GameWaitingProps> = () => {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate(RouteKeys.GAMEHOMESCREEN);
    }, 1000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit the game?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {},
          },
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  return (
    <GradientTemplate>
      <PopupAtom
        visible={popupVisible}
        title={'Hey! You’re in waiting..'}
        desc={'Please wait, next round will begin shortly or try again later'}
        btnVisible={true}
        closeIconBtnVisible={false}
      />
    </GradientTemplate>
  );
};
