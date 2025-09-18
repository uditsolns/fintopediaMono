import React from 'react';
import {Alert, BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
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
import {storeCheckNavigate} from '@shared/src/provider/store/reducers/checknavigate.reducer';
import {getStocks} from '@shared/src/provider/store/services/stocks.service';
import {storeFilterRoundLevelData} from '@shared/src/provider/store/reducers/roundlevelgames.reducer';
import { RoundLevelResponse } from '@shared/src/utils/types/roundLevel';

interface GameWaitingProps extends NavType<'GameWaiting'> {}

export const GameWaiting: React.FC<GameWaitingProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [popupVisible, setPopupVisible] = React.useState(true);
  const {singleGame} = useAppSelector(state => state.games);
  const {check_navigate} = useAppSelector(state => state.checkNavigate);
  useFocusEffect(
    React.useCallback(() => {
      setPopupVisible(true);
      dispatch(storeCheckNavigate(false));
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
              setPopupVisible(false);
              navigation.navigate(RouteKeys.HOMESCREEN);
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
    dispatch(getStocks());
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
    let id = Number(singleGame?.id);
    dispatch(
      getGamesById({
        id,
        onSuccess: data => {
          if (data?.is_active == 0) {
            if (check_navigate == false) {
              navigation.replace(RouteKeys.GAMEWINNERLOADINGSCREEN);
            }
            dispatch(storeCheckNavigate(true));
          }
        },
        onError: () => {},
      }),
    );
  };
  const getAllRoundLevelGamesData = async () => {
    dispatch(
      getRoundLevel({
        onSuccess: data => {
          roundLevelFunction(data);
        },
      }),
    );
  };
  const roundLevelFunction = async (roundLevel: RoundLevelResponse[]) => {
    
    const filterRound = roundLevel?.filter(e1 => {
      return e1?.game_id == singleGame?.id;
    });
    let obj = filterRound?.find(o => o.is_active == 1);
    if (obj == undefined) {
      setPopupVisible(true);
    } else {
      for (let i = 0; i < filterRound.length; i++) {
        if (filterRound[i].is_active == 1) {
          await pushFilterData(filterRound[i]);
          setPopupVisible(false);
          navigation.navigate(RouteKeys.GAMEHOMESCREEN);
          break;
        }
      }
    }
  };
  const pushFilterData = async (filterRound: RoundLevelResponse) => {
    dispatch(storeFilterRoundLevelData(filterRound));
  };
  
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
