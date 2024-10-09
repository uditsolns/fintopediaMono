import {useFocusEffect} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {getGamesById} from '@shared/src/provider/store/services/games.service';
import {getGameUsers} from '@shared/src/provider/store/services/gameusers.service';
import {createStopGame} from '@shared/src/provider/store/services/stopgame.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import ImageAtom from '@src/components/Image/ImageAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {View, StyleSheet, ViewStyle, BackHandler, Alert} from 'react-native';

interface GameWinnerLoadingProps extends NavType<'GameWinnerLoading'> {}

export const GameWinnerLoading: React.FC<GameWinnerLoadingProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {singleGame} = useAppSelector(state => state.games);

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
    checkSingleGameFinish();
  }, []);

  const checkSingleGameFinish = async () => {
    let id = Number(singleGame?.id);
    await dispatch(
      getGamesById({
        id,
        onSuccess: async data => {
          if (data?.is_active == 0) {
            await stopGames();
          }
        },
        onError: err => {
          console.log('Error in checkSingleGameFinish getGamesById:', err);
        },
      }),
    );
  };

  const stopGames = async () => {
    const startGameInfo = {
      game_id: singleGame?.id,
    };
    await dispatch(
      createStopGame({
        startGameInfo,
        onSuccess: async res => {
          await getUsergames();
        },
        onError: err => {
          console.log('Error in stopGames createStopGame:', err);
        },
      }),
    );
  };

  const getUsergames = async () => {
    let id = Number(singleGame?.id);
    await dispatch(
      getGamesById({
        id,
        onSuccess: async data => {
          if (data?.is_active == 0) {
            if (data?.to_publish_result == 1) {
              dispatch(
                getGameUsers({
                  onSuccess: gameUsersData => {
                    navigation.navigate(RouteKeys.GAMEWINNERSCREEN);
                  },
                }),
              );
            }
            if (data?.to_publish_result == 0) {
              await getUsergames();
            }
          }
        },
        onError: err => {
          console.log('Error in getUsergames getGamesById:', err);
        },
      }),
    );
  };

  return (
    <GradientTemplate>
      <View style={[commonStyle.container, styles.centeredContainer]}>
        <ImageAtom
          sourceRequire={require('@shared/src/assets/img/gameWinnerLoading.png')}
        />
        <View style={styles.paddingLarge}>
          <TextAtom
            text="Games are ended, Result will be declared soon!"
            preset="heading1"
            style={styles.centeredText}
          />
          <View style={styles.paddingHorizontal}>
            <TextAtom
              text="Please check back in sometime for results."
              preset="body"
              style={[styles.centeredMediumText, {color: colorPresets.GRAY}]}
            />
          </View>
        </View>
      </View>
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  paddingLarge: {
    padding: mScale.lg2,
  },
  centeredText: {
    textAlign: 'center',
  },
  paddingHorizontal: {
    paddingHorizontal: mScale.base,
    paddingTop: mScale.md,
  },
  centeredMediumText: {
    textAlign: 'center',
    fontWeight: '400',
  },
});
