import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View, ListRenderItem} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EventMolecule from '@src/components/molecules/EventMolecule/EventMolecule';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {Images} from '@shared/src/assets';
import {mScale} from '@shared/src/theme/metrics';
import {commonStyle} from '@shared/src/commonStyle';
import LoaderAtom from '@src/components/LoaderAtom';
import PopupAtom from '@src/components/Popup/PopupAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {
  getGames,
  getGamesById,
} from '@shared/src/provider/store/services/games.service';
import {GamesInfo} from '@shared/src/utils/types/games';

interface EventsProps extends NavType<'Events'> {}

export const Events: React.FC<EventsProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {games, loading} = useAppSelector(state => state.games);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getGames());
    setRefreshLoading(false);
  };

  const playGame = async (item: any) => {
    const id = item?.id;
    const body = {
      game_id: id,
    };

    if (item?.is_active === 1) {
      // dispatch(gameStart({ body, token, navigation }));
      setPopupVisible(false);
      navigation.navigate(RouteKeys.GAMEWAITINGSCREEN);
    } else {
      setPopupVisible(true);
    }
  };

  const getGameByID = async (item: GamesInfo) => {
    dispatch(getGamesById(item));
  };

  const renderItem = ({item}: {item: GamesInfo}) => {
    return (
      <EventMolecule
        item={item}
        onPress={async () => {
          navigation.navigate(RouteKeys.GAMEWAITINGSCREEN);
          await getGameByID(item);
          playGame(item);
        }}
      />
    );
  };

  return (
    <GradientTemplate style={{paddingBottom: 0}}>
      <View style={{marginVertical: mScale.base}}>
        <Images.SVG.LogoWhite />
      </View>
      {loading.games || loading.singleGame ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null}
      <FlatList
        data={games?.length ? games?.filter(el => +el?.is_active === 1) : []}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          rowGap: mScale.base,
          paddingBottom: mScale.xxl2,
        }}
      />
      <PopupAtom
        visible={popupVisible}
        title="Hola !"
        desc="Game is not started yet."
        onClose={() => setPopupVisible(false)}
        onRetry={() => playGame('singleGames')}
        btnVisible={true}
      />
    </GradientTemplate>
  );
};
