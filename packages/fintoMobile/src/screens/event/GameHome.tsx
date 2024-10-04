import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {WINDOW_WIDTH} from '@shared/src/theme/metrics';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import {GameRouteKeys, RouteKeys} from '@src/navigation/RouteKeys';
import * as React from 'react';
import {Alert, BackHandler, View} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import LatestNews from './tabs/LatestNews';
import Trade from './tabs/Trade';
import Portfolio from './tabs/Portfolio';
import History from './tabs/History';
import PreviousRoundPrice from './tabs/PreviousRoundPrice';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import PortfolioAtom from '@src/components/Profile/PortfolioAtom';
import {TabMolecule} from '@src/components/molecules/TabMolecule/TabMolecule';
import {NavType} from '@src/navigation/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {storeCheckNavigateHome} from '@shared/src/provider/store/reducers/checknavigate.reducer';
import {getGamesById} from '@shared/src/provider/store/services/games.service';
import {getRoundLevelById} from '@shared/src/provider/store/services/roundlevelgames.service';
import {getGameUserByLoginIDGameID} from '@shared/src/provider/store/services/gameusers.service';
import {commonStyle} from '@shared/src/commonStyle';

type RouteParams = {
  tab?: number;
};

interface GameHomeProps extends NavType<'GameHome'> {}

export const GameHome: React.FC<GameHomeProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<{params: RouteParams}>>();
  const [index, setIndex] = React.useState<number>(route.params?.tab ?? 0);
  const [routes] = React.useState(GameRouteKeys);
  const {current_user} = useAppSelector(state => state.auth);
  const {singleGame} = useAppSelector(state => state.games);
  const {filterRoundLevelData, singleRoundLevel} = useAppSelector(
    state => state.roundLevel,
  );
  const {check_naviagte_home} = useAppSelector(state => state.checkNavigate);
  const [hasNavigated, setHasNavigated] = React.useState<boolean>(false);
  const currentTime = new Date().toLocaleTimeString();
  const endTime = `${filterRoundLevelData?.end_datetime}`;
  // const currentTime = '20:55:50';
  // const endTime = '21:20:50';

  const getTimeDifferenceInSeconds = (start: string, end: string): number => {
    const [startHours, startMinutes, startSeconds] = start
      .split(':')
      .map(Number);
    const [endHours, endMinutes, endSeconds] = end.split(':').map(Number);
    const timeStart = new Date();
    const timeEnd = new Date();
    timeStart.setHours(startHours, startMinutes, startSeconds, 0);
    timeEnd.setHours(endHours, endMinutes, endSeconds, 0);
    const differenceInSeconds =
      (timeEnd.getTime() - timeStart.getTime()) / 1000;

    return Math.max(differenceInSeconds, 0);
  };

  const [time, setTime] = React.useState<number>(
    getTimeDifferenceInSeconds(currentTime, endTime),
  );
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  // React.useEffect(() => {
  //   timerRef.current = setInterval(() => {
  //     setTime(prevTime => Math.max(prevTime - 1, 0));
  //   }, 1000);
  //   console.log('==', timerRef.current, time);
  //   return () => {
  //     if (timerRef.current) clearInterval(timerRef.current);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (time === 0 && !hasNavigated) {
  //     clearInterval(timerRef.current!);
  //     timerRef.current = null;
  //     navigation.navigate(RouteKeys.GAMEWAITINGSCREEN);
  //     setHasNavigated(true);
  //   }
  // }, [time,hasNavigated,navigation]);

  // React.useEffect(() => {
  //   timerRef.current = setInterval(() => {
  //     setTime(prevTime => {
  //       const newTime = Math.max(prevTime - 1, 0);
  //       if (newTime === 0 && !hasNavigated) {
  //         clearInterval(timerRef.current!);
  //         timerRef.current = null;
  //         navigation.navigate(RouteKeys.GAMEWAITINGSCREEN);
  //         setHasNavigated(true);
  //       }
  //       return newTime;
  //     });
  //   }, 1000);

  //   return () => {
  //     if (timerRef.current) clearInterval(timerRef.current);
  //   };
  // }, [hasNavigated, navigation]);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(storeCheckNavigateHome(false));
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
    }, [navigation]),
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const timerId = setInterval(() => {
  //       timerRef.current -= 1;
  //       if (timerRef.current < 0) {
  //         if (timerRef.current === -1) {
  //           navigation.navigate(RouteKeys.GAMEWAITINGSCREEN);
  //         }
  //         clearInterval(timerId);
  //       } else {
  //         setTime(timerRef.current);
  //       }
  //     }, 1000);
  //     return () => {
  //       clearInterval(timerId);
  //     };
  //   }, [navigation]),
  // );
  useFocusEffect(
    React.useCallback(() => {
      let user_id = Number(current_user?.id);
      let game_id = Number(singleGame?.id);
      dispatch(
        getGameUserByLoginIDGameID({
          user_id,
          game_id,
          onSuccess: data => {
            console.log('game user ', data);
          },
          onError:()=>{}
        }),
      );
    }, []),
  );

  React.useEffect(() => {
    if (route.params?.tab !== undefined) {
      setIndex(route.params.tab);
    } else {
      setIndex(0);
    }
  }, [route.params?.tab]);

  const renderScene = SceneMap({
    latestNews: LatestNews,
    trade: Trade,
    portfolio: Portfolio,
    history: History,
    previousRoundPrice: PreviousRoundPrice,
  });

  useFocusEffect(
    React.useCallback(() => {
      let interval = setInterval(() => {
        checkSingleGameFinish();
        getAllRoundLevelGamesData();
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }, []),
  );
  const checkSingleGameFinish = async () => {
    let id = Number(singleGame?.id);
    dispatch(
      getGamesById({
        id,
        onSuccess: data => {
          if (data?.is_active == 0) {
            if (check_naviagte_home == false) {
              navigation.replace(RouteKeys.GAMEWINNERLOADINGSCREEN);
            }
            dispatch(storeCheckNavigateHome(true));
          }
        },
      }),
    );
  };
  const getAllRoundLevelGamesData = async () => {
    let id = Number(filterRoundLevelData?.id);
    dispatch(
      getRoundLevelById({
        id,
        onSuccess: data => {
          if (data?.is_active == 0) {
            navigation.navigate(RouteKeys.GAMEWAITINGSCREEN);
          }
        },
      }),
    );
  };

  return (
    <GradientTemplate style={{paddingBottom: 0}}>
      <HeaderLeftMolecule />
      <View>
        <View style={[commonStyle.flexSpaceBetween]}>
          <TextAtom
            text={'Portfolio overview'}
            preset="heading3"
            style={{fontWeight: '600'}}
            numberOfLines={1}
          />
          <View>
            <TextAtom
              text={`Round : ${filterRoundLevelData?.round_level}`}
              preset="heading3"
              style={{fontWeight: '600'}}
              numberOfLines={1}
            />
          </View>
        </View>
        <PortfolioAtom
          timer={
            time < 0
              ? `00:00`
              : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
                  2,
                  '0',
                )}`
          }
          balance={'2,00000'}
          totalAmount={'5,65650'}
        />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderTabBar={props => <TabMolecule {...props} />}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: WINDOW_WIDTH}}
        lazy={true}
      />
    </GradientTemplate>
  );
};
