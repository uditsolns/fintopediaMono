import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import {moderateScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';

interface DeletePopupProps {
  isVisible: boolean;
  isDeleteVisible?: boolean;
  toggleModal: () => void;
  viewPdf: () => void;
  downloadPdf: () => void;
  deletePdf: () => void;
}

export const DeletePopup: React.FC<DeletePopupProps> = ({
  isVisible,
  isDeleteVisible = true,
  toggleModal,
  viewPdf,
  downloadPdf,
  deletePdf,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={toggleModal}>
      <Pressable style={styles.modal} onPress={toggleModal}>
        <View style={styles.popupContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              viewPdf();
              toggleModal();
            }}>
            <ImageAtom
              sourceRequire={require('@shared/src/assets/img/viewPdf.png')}
              resizeMode="contain"
              imageStyle={{width: moderateScale(25)}}
            />
            <TextAtom
              text={'View'}
              preset="title"
              style={{color: colorPresets.BLACK, paddingStart: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              downloadPdf();
              toggleModal();
            }}>
            <ImageAtom
              sourceRequire={require('@shared/src/assets/img/downloadPdf.png')}
              resizeMode="contain"
              imageStyle={{width: moderateScale(25)}}
            />
            <TextAtom
              text={'Download'}
              preset="title"
              style={{color: colorPresets.BLACK, paddingStart: 10}}
            />
          </TouchableOpacity>
          {isDeleteVisible && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                deletePdf();
                toggleModal();
              }}>
              <ImageAtom
                sourceRequire={require('@shared/src/assets/img/deletePdf.png')}
                resizeMode="contain"
                imageStyle={{width: moderateScale(25)}}
              />
              <TextAtom
                text={'Delete'}
                preset="title"
                style={{color: colorPresets.BLACK, paddingStart: 10}}
              />
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: WINDOW_WIDTH,
  },
});
