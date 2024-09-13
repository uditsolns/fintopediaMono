import {Images} from '@shared/src/assets';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {LinearGradientMolecule} from '@shared/src/components/molecules/Gradient/LinearGradientMolecule';
import {colorPresets} from '@shared/src/theme/color';
import {
  moderateScale,
  mScale,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@shared/src/theme/metrics';
import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';

interface PopupAtomProps {
  title?: string;
  desc?: string;
  visible?: boolean;
  onClose?: () => void;
  onRetry?: () => void;
  btnVisible?: boolean;
  closeIconBtnVisible?: boolean;
}

const PopupAtom: React.FC<PopupAtomProps> = ({
  title,
  desc,
  visible,
  onClose,
  onRetry,
  btnVisible = false,
  closeIconBtnVisible = true,
}) => {
  const [width, setWidth] = React.useState<number>(WINDOW_WIDTH * 0.92);
  const [height, setHeight] = React.useState<number>(WINDOW_HEIGHT * 0.4);
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={{
            alignSelf: 'center',
            width: WINDOW_WIDTH * 0.92,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 8,
            overflow: 'hidden',
          }}
          onLayout={event => {
            const {width, height} = event.nativeEvent.layout;
            setWidth(width);
            setHeight(height);
          }}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              zIndex: -1,
              alignSelf: 'center',
            }}>
            <LinearGradientMolecule
              width={width}
              height={height}
              radius={0}
              colors={['#7A7FA2', '#141622']}
            />
          </View>
          <View style={styles.content}>
            {closeIconBtnVisible && (
              <View style={styles.closeButton}>
                <Pressable onPress={onClose}>
                  <Images.SVG.Cross />
                </Pressable>
              </View>
            )}
            <Images.SVG.LogoWhite />
            <TextAtom
              text={title}
              preset="heading2"
              style={styles.waitingText}
              numberOfLines={3}
            />
            <TextAtom
              text={desc}
              preset="medium"
              style={[styles.waitMessage, {color: colorPresets.GRAY}]}
              numberOfLines={4}
            />
            {btnVisible ? (
              <View style={{marginTop:mScale.base,width:'100%'}}>
                <ButtonAtom title="Retry" onPress={onRetry} />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  popup: {
    width: '95%',
    borderRadius: 8,
    padding: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  logo: {
    width: moderateScale(128),
    height: moderateScale(41.77),
  },
  waitingText: {
    fontWeight: '600',
    marginTop: mScale.xxl2,
  },
  waitMessage: {
    fontWeight: '400',
    marginTop: mScale.md,
    textAlign: 'center',
  },
  retryButton: {
    width: '90%',
    marginTop: mScale.xxl,
  },
});

export default PopupAtom;
