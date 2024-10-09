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
import {createStartGame} from '@shared/src/provider/store/services/startgame.service';
import {Toast} from 'react-native-toast-notifications';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {GamesResponse} from '@shared/src/utils/types/games';
import {clearGameUsers} from '@shared/src/provider/store/reducers/gameusers.reducer';

interface EventsProps extends NavType<'Events'> {}

export const Events: React.FC<EventsProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {games, loading} = useAppSelector(state => state.games);
  const {loading: startGameLoading} = useAppSelector(state => state.startGame);
  const [refreshLoading, setRefreshLoading] = React.useState(false);
  const [popupVisible, setPopupVisible] = React.useState(false);

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getGames());
    setRefreshLoading(false);
  };

  const playGame = async (item: GamesResponse) => {
    const id = item?.id;
    const startGameInfo = {
      game_id: id,
    };
    if (item?.is_active == 1) {
      dispatch(
        createStartGame({
          startGameInfo,
          onSuccess: res => {
            if (res.error) {
              Toast.show(res.error, {
                type: 'danger',
              });
              return;
            }
            navigation.navigate(RouteKeys.GAMEWAITINGSCREEN);
          },
          onError: err => {
            Toast.show('Something went wrong,please try again.', {
              type: 'danger',
            });
          },
        }),
      );
      setPopupVisible(false);
    } else {
      setPopupVisible(true);
    }
  };

  const getGameByID = async (item: GamesResponse) => {
    let id = Number(item?.id);
    dispatch(
      getGamesById({
        id,
        onSuccess: data => {},
        onError: () => {},
      }),
    );
  };

  const renderItem = ({item}: {item: GamesResponse}) => {
    return (
      <EventMolecule
        item={item}
        onPress={async () => {
          dispatch(clearGameUsers());
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
        data={
          games?.length ? games?.filter((el): any => el?.is_active == 1) : []
        }
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
