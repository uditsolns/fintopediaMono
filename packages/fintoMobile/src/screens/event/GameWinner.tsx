import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
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
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface GameWinnerProps {}
export const GameWinner: React.FC<GameWinnerProps> = () => {
  return (
    <GradientTemplate style={{paddingBottom: 0}}>
      <HeaderLeftMolecule text={'Leaderboard'} />
      <ScrollViewAtom>
        <View style={styles.topThreeContainer}>
          <WinnerIcon
            profilePhoto={require('@shared/src/assets/img/gameWinnerLoading.png')}
            rank={2}
            name={'Sujeet Chauhan'}
            winnerAmount={`200,000`}
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
            name={'Vikas Shahu'}
            winnerAmount={`2000`}
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
            name={'Sujeet Rajput'}
            winnerAmount={`200`}
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
          {[...Array(50)].map((_, index) => (
            <WinnerListAtom
              profilePhoto={require('@shared/src/assets/img/gameWinnerLoading.png')}
              rank={index + 4}
              name={'Vikas Shahu'}
              winnerAmount={`2000`}
              key={index}
              style={styles.winnerListItem}
            />
          ))}
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
