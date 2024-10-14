import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventMolecule from '@src/components/molecules/EventMolecule/EventMolecule';
import { GradientTemplate } from '@shared/src/components/templates/GradientTemplate';
import { Images } from '@shared/src/assets';
import { mScale } from '@shared/src/theme/metrics';
import { commonStyle } from '@shared/src/commonStyle';
import LoaderAtom from '@src/components/LoaderAtom';
import PopupAtom from '@src/components/Popup/PopupAtom';
import { RouteKeys } from '@src/navigation/RouteKeys';

interface EventsProps {}

export const Events: React.FC<EventsProps> = ({}) => {
  const navigation = useNavigation()
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshLoading(true);
    // dispatch(getGames({ token, navigation }));
    setRefreshLoading(false);
  };

  const playGame = async (item:any) => {
    const id = item?.id;
    const body = {
      game_id: id,
    };
  
    if (item?.is_active === 1) {
      // dispatch(gameStart({ body, token, navigation }));
      setPopupVisible(false);
      // navigation.navigate(RouteKeys.GAMEWAITING);
    } else {
      setPopupVisible(true);
    }
  };

  const getGameByID = async (id: number) => {
    // dispatch(getGameById({ id, token, navigation }));
  };

  const renderItem = ({ item }:{ item:any }) => {
    return (
      <EventMolecule
        item={item}
        onPress={async () => {
          navigation.navigate(RouteKeys.GAMEWAITINGSCREEN);
          await getGameByID(item?.id);
          playGame(item);
        }}
      />
    );
  };

  return (
    <GradientTemplate style={{paddingBottom: 0}}>
      <View style={{ marginVertical: mScale.base }}>
        <Images.SVG.LogoWhite />
      </View>
      {false ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null }
      <FlatList
        data={[...Array(5)]}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ rowGap: mScale.base,paddingBottom:mScale.xxl2 }}
      />
      <PopupAtom
        visible={false}
        title="Hola !"
        desc="Game is not started yet."
        onClose={() => setPopupVisible(false)}
        onRetry={() => playGame('singleGames')}
        btnVisible={true}
      />
    </GradientTemplate>
  );
};

