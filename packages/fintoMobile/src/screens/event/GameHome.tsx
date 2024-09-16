import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { WINDOW_WIDTH } from '@shared/src/theme/metrics';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import { GameRouteKeys, RouteKeys } from '@src/navigation/RouteKeys';
import * as React from 'react';
import { Alert, BackHandler, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import LatestNews from './tabs/LatestNews';
import Trade from './tabs/Trade';
import Portfolio from './tabs/Portfolio';
import History from './tabs/History';
import PreviousRoundPrice from './tabs/PreviousRoundPrice';
import { GradientTemplate } from '@shared/src/components/templates/GradientTemplate';
import PortfolioAtom from '@src/components/Profile/PortfolioAtom';
import { TabMolecule } from '@src/components/molecules/TabMolecule/TabMolecule';

type RouteParams = {
  tab?: number;
};

interface GameHomeProps {}

export const GameHome: React.FC<GameHomeProps> = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }>>();
  const [index, setIndex] = React.useState<number>(route.params?.tab ?? 0);
  const navigation = useNavigation();
  const [routes] = React.useState(GameRouteKeys);

  const currentTime = new Date().toLocaleTimeString();
  const endTime = '16:12:50';

  const time_start = new Date();
  const time_end = new Date();

  const value_start = currentTime.split(':').map(Number);
  const value_end = endTime.split(':').map(Number);

  time_start.setHours(value_start[0], value_start[1], value_start[2], 0);
  time_end.setHours(value_end[0], value_end[1], value_end[2], 0);

  const value = time_end.getTime() - time_start.getTime();

  const sec = value / 1000;
  const [time, setTime] = React.useState<number>(sec);
  const timerRef = React.useRef<number>(time);

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
            },
          },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );

  useFocusEffect(
    React.useCallback(() => {
      const timerId = setInterval(() => {
        timerRef.current -= 1;
        if (timerRef.current < 0) {
          if (timerRef.current === -1) {
            // navigation.navigate(RouteKeys.GAMEWAITINGSCREEN);
          }
          clearInterval(timerId);
        } else {
          setTime(timerRef.current);
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }, [navigation])
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

  return (
    <GradientTemplate style={{ paddingBottom: 0 }}>
      <HeaderLeftMolecule />
      <View>
        <TextAtom
          text={'Portfolio overview'}
          preset="heading3"
          style={{ fontWeight: '600' }}
          numberOfLines={1}
        />
        <PortfolioAtom
          timer={
            time < 0
              ? `00:00`
              : `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(
                  time - Math.floor(time / 60) * 60
                ).padStart(2, '0')}`
          }
          balance={'2,00000'}
          totalAmount={'5,65650'}
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={(props) => <TabMolecule {...props} />}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: WINDOW_WIDTH }}
        lazy={true}
      />
    </GradientTemplate>
  );
};
