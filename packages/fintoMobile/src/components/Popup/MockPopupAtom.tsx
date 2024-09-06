import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {LinearGradientMolecule} from '@shared/src/components/molecules/Gradient/LinearGradientMolecule';
import {colorPresets} from '@shared/src/theme/color';
import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import {LinkButton} from '../Button/LinkButton';
import {mScale} from '@shared/src/theme/metrics';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';

interface StockItem {
  name?: string;
  current_price?: number;
}

interface MockPopupAtomProps {
  item?: {
    stock?: StockItem;
    stock_current_price: number;
  } | null;
  visible?: boolean;
  onClose?: () => void;
  onBuyStock?: () => void;
  onSellStock?: () => void;
}

const MockPopupAtom: React.FC<MockPopupAtomProps> = ({
  item,
  visible,
  onClose,
  onBuyStock,
  onSellStock,
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
          <View style={styles.closeButton}>
            <Pressable onPress={onClose}>
              <Images.SVG.Cross />
            </Pressable>
          </View>
          <View style={[commonStyle.flexStart, {alignItems: 'flex-start'}]}>
            <View style={{flex: 1}}>
              <TextAtom
                text={item?.stock?.name}
                preset="heading4"
                style={styles.waitingText}
                numberOfLines={2}
              />
              <TextAtom
                text={`₹ ${item?.stock_current_price}`}
                preset="heading4"
                style={[styles.waitMessage, {color: colorPresets.GRAY}]}
                numberOfLines={4}
              />
            </View>
            <View>
              <LinkButton
                text='"View Chart"'
                preset="body"
                style={styles.waitingText}
              />
            </View>
          </View>
          <View style={[commonStyle.flexSpaceBetween, {width: '100%'}]}>
            <ButtonAtom
              title="Buy"
              textPreset="titleBold"
              onPress={onBuyStock}
              preset="fourthy"
            />
            <ButtonAtom
              title="Sell"
              textPreset="titleBold"
              onPress={onSellStock}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
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
  waitingText: {
    fontWeight: '600',
    marginTop: mScale.xxl,
    textAlign: 'left',
  },
  waitMessage: {
    fontWeight: '400',
    marginTop: mScale.md,
    textAlign: 'left',
  },
  retryButton: {
    width: '45%',
    marginTop: mScale.xxl,
  },
});

export default MockPopupAtom;
