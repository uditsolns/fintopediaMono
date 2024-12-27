import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {WINDOW_WIDTH} from '@shared/src/theme/metrics';
import {GameRouteKeys, RouteKeys} from '@src/navigation/RouteKeys';
import * as React from 'react';
import {SceneMap, TabView} from 'react-native-tab-view';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {TabMolecule} from '@src/components/molecules/TabMolecule/TabMolecule';
import MockTradeLatestNews from './tabs/MockTradeLatestNews';
import MockTradeTrade from './tabs/MockTradeTrade';
import MockTradePortfolio from './tabs/MockTradePortfolio';
import MockTradeHistory from './tabs/MockTradeHistory';
import MockTradePreviousRoundPrice from './tabs/MockTradePreviousRoundPrice';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';

type RouteParams = {
  tab?: number;
};

interface MockTradeProps {}

export const MockTrade: React.FC<MockTradeProps> = () => {
  const route = useRoute<RouteProp<{params: RouteParams}>>();
  const [index, setIndex] = React.useState<number>(route.params?.tab ?? 0);
  const navigation = useNavigation();
  const [routes] = React.useState(GameRouteKeys);

  React.useEffect(() => {
    if (route.params?.tab !== undefined) {
      setIndex(route.params.tab);
    } else {
      setIndex(0);
    }
  }, [route.params?.tab]);

  const renderScene = SceneMap({
    latestNews: MockTradeLatestNews,
    trade: MockTradeTrade,
    portfolio: MockTradePortfolio,
    history: MockTradeHistory,
    previousRoundPrice: MockTradePreviousRoundPrice,
  });

  return (
    <GradientTemplate style={{paddingBottom: 0}}>
      {/* <TabView
        navigationState={{index, routes}}
        renderTabBar={props => <TabMolecule {...props} />}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: WINDOW_WIDTH}}
        lazy={true}
      /> */}
      <TextAtom text='Comming Soon' style={{textAlign:'center',paddingTop:50,fontSize:30}} />
    </GradientTemplate>
  );
};
