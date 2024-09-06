import {Images} from '@shared/src/assets';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {LinearGradientMolecule} from '@shared/src/components/molecules/Gradient/LinearGradientMolecule';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
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
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: -1,
            alignSelf: 'center',
          }}>
          <LinearGradientMolecule
            width={200}
            height={200}
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
          {btnVisible && <ButtonAtom title="Retry" onPress={onRetry} />}
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  popup: {
    width: '95%',
    borderRadius: 8,
    padding: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
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
