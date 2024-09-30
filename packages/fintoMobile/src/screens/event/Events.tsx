import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import EventMolecule from '@src/components/molecules/EventMolecule/EventMolecule';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {Images} from '@shared/src/assets';
import {mScale} from '@shared/src/theme/metrics';
import {commonStyle} from '@shared/src/commonStyle';
import LoaderAtom from '@src/components/LoaderAtom';
import PopupAtom from '@src/components/Popup/PopupAtom';
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
import {createStartGame} from '@shared/src/provider/store/services/startgame.service';

interface EventsProps extends NavType<'Events'> {}

export const Events: React.FC<EventsProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {games, loading} = useAppSelector(state => state.games);
  const {
    create,
    loading: startGameLoading,
    err,
  } = useAppSelector(state => state.startGame);
  const [refreshLoading, setRefreshLoading] = React.useState(false);
  const [popupVisible, setPopupVisible] = React.useState(false);

  React.useEffect(() => {
    onRefresh();
  }, []);

  React.useEffect(() => {
    console.log("----------",err.createErr,startGameLoading.create);
  }, [create]);

  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getGames());
    setRefreshLoading(false);
  };

  const playGame = async (item: GamesInfo) => {
    const id = item?.id;
    const params = {
      game_id: id,
    };
    if (item?.is_active == '1') {
      dispatch(createStartGame(params));
      setPopupVisible(false);
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
      {loading.games || loading.singleGame || startGameLoading.create ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null}
      <FlatList
        data={games?.length ? games : []}
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
        onRetry={() => {}}
        btnVisible={true}
      />
    </GradientTemplate>
  );
};
