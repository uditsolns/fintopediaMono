import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MyCourseRouteKeys} from '@src/navigation/RouteKeys';
import {SceneMap, TabView} from 'react-native-tab-view';
import Ongoing from './tabs/Ongoing';
import Completed from './tabs/Completed';
import SaveForLater from './tabs/SaveForLater';
import Downloaded from './tabs/Downloaded';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {moderateScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import {MyCourseTabMolecule} from '@src/components/molecules/MyCourseTabMolecule/MyCourseTabMolecule';
type RouteParams = {
  tab?: number;
};

interface MyCoursesProps {}

export const MyCourses: React.FC<MyCoursesProps> = () => {
  let route = useRoute<RouteProp<{params: RouteParams}>>();
  const [index, setIndex] = React.useState(route.params?.tab ?? 0);
  const [routes] = React.useState(MyCourseRouteKeys);
  React.useEffect(() => {
    if (route.params?.tab) {
      setIndex(route.params.tab);
    } else {
      setIndex(0);
    }
  }, [route.params?.tab]);

  const renderScene = SceneMap({
    ongoing: Ongoing,
    completed: Completed,
    saveForLater: SaveForLater,
    // downloaded: Downloaded,
  });

  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: moderateScale(60),
      }}>
      <TabView
        navigationState={{index, routes}}
        renderTabBar={props => <MyCourseTabMolecule {...props} />}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: WINDOW_WIDTH}}
        lazy={true}
      />
    </GradientTemplate>
  );
};
