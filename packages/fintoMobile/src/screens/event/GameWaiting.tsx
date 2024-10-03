import React from 'react';
import {Alert, BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import PopupAtom from '@src/components/Popup/PopupAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {getNews} from '@shared/src/provider/store/services/news.service';
import {getStockData} from '@shared/src/provider/store/services/stockdatas.service';
import {getRoundLevel} from '@shared/src/provider/store/services/roundlevelgames.service';
import {getGamesById} from '@shared/src/provider/store/services/games.service';

interface GameWaitingProps extends NavType<'GameWaiting'> {}
export const GameWaiting: React.FC<GameWaitingProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [popupVisible, setPopupVisible] = React.useState(true);
  const {singleGame, loading} = useAppSelector(state => state.games);
  const {roundLevel, loading: roundLevelLoading} = useAppSelector(
    state => state.roundLevel,
  );

  React.useEffect(() => {
    if (singleGame) {
      if (singleGame?.is_active == '0') {
        //navigate
      }
    }
  }, [singleGame]);
  React.useEffect(() => {
    if (roundLevel) {
      if (singleGame?.is_active == '0') {
      }
    }
  }, [roundLevel]);

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
            onPress: () => {
              navigation.goBack();
            },
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

  React.useEffect(() => {
    dispatch(getNews());
    dispatch(getStockData());
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (singleGame) {
        let interval = setInterval(() => {
          checkSingleGameFinish();
          getAllRoundLevelGamesData();
        }, 10000);
        return () => {
          clearInterval(interval);
        };
      }
    }, [singleGame]),
  );

  const checkSingleGameFinish = async () => {
    let body = {
      id: singleGame?.id,
    };
    dispatch(getGamesById(body));
  };
  const getAllRoundLevelGamesData = async () => {};

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
