import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {
  moderateScale,
  mScale,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@shared/src/theme/metrics';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import WinnerIcon from '@src/components/Winner/WinnerIcon';
import WinnerListAtom from '@src/components/Winner/WinnerListAtom';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface GameWinnerProps extends NavType<'GameWinner'> {}

export const GameWinner: React.FC<GameWinnerProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {gameUsers} = useAppSelector(state => state.gameUsers);
  const [firstWinner, secondWinner, thirdWinner] = gameUsers;


  const nameShorter = (name: string) => {
    if (name?.length > 10) {
      return name.slice(0, 15) + '...';
    }
    return name;
  };
 
  return (
    <GradientTemplate style={{paddingBottom: 0,paddingTop: moderateScale(75)}}>
      <ScrollViewAtom>
        <View style={styles.topThreeContainer}>
          <WinnerIcon
            profilePhoto={require('@shared/src/assets/img/gameWinnerLoading.png')}
            rank={2}
            name={
              secondWinner?.user
                ? nameShorter(
                    `${secondWinner?.user?.first_name} ${secondWinner?.user?.surname_name}`,
                  )
                : ''
            }
            winnerAmount={`${secondWinner?.amount || 0}`}
            style={styles.secondPlace}
            style2={{
              width: moderateScale(56),
              height: moderateScale(56),
              borderRadius: moderateScale(56 / 2),
            }}
          />
          <WinnerIcon
            profilePhoto={require('@shared/src/assets/img/gameWinnerLoading.png')}
            rank={1}
            name={
              firstWinner?.user
                ? nameShorter(
                    `${firstWinner?.user?.first_name} ${firstWinner?.user?.surname_name}`,
                  )
                : ''
            }
            winnerAmount={`${firstWinner?.amount || 0}`}
            style={styles.firstPlace}
            style2={{
              width: moderateScale(72),
              height: moderateScale(72),
              borderRadius: moderateScale(72 / 2),
            }}
          />
          <WinnerIcon
            profilePhoto={require('@shared/src/assets/img/gameWinnerLoading.png')}
            rank={3}
            name={
              thirdWinner?.user
                ? nameShorter(
                    `${thirdWinner?.user?.first_name} ${thirdWinner?.user?.surname_name}`,
                  )
                : ''
            }
            winnerAmount={`${thirdWinner?.amount || 0}`}
            style={styles.thirdPlace}
            style2={{
              width: moderateScale(56),
              height: moderateScale(56),
              borderRadius: moderateScale(56 / 2),
            }}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.winnerListContainer}>
          {gameUsers?.length > 3
            ? gameUsers
                ?.slice(3)
                .map((el, index) => (
                  <WinnerListAtom
                    profilePhoto={require('@shared/src/assets/img/gameWinnerLoading.png')}
                    rank={index + 1}
                    name={
                      el?.user
                        ? nameShorter(
                            `${el?.user?.first_name} ${el?.user?.surname_name}`,
                          )
                        : ''
                    }
                    winnerAmount={`${el?.amount}`}
                    key={index}
                    style={styles.winnerListItem}
                  />
                ))
            : null}
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  topThreeContainer: {
    position: 'relative',
    height: WINDOW_HEIGHT * 0.0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstPlace: {
    position: 'absolute',
    top: WINDOW_HEIGHT * 0.01,
    right: WINDOW_WIDTH * 0.33,
  },
  secondPlace: {
    position: 'absolute',
    top: WINDOW_HEIGHT * 0.1,
    left: 0,
  },
  thirdPlace: {
    position: 'absolute',
    top: WINDOW_HEIGHT * 0.1,
    right: 0,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colorPresets.GRAY,
    marginTop: WINDOW_HEIGHT * 0.3,
    marginBottom: mScale.md,
  },
  winnerListContainer: {
    marginTop: WINDOW_HEIGHT * 0.02,
  },
  winnerListItem: {
    marginBottom: WINDOW_HEIGHT * 0.01,
  },
});
