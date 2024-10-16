import React, {useEffect, FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {moderateScale, WINDOW_HEIGHT} from '@shared/src/theme/metrics';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';

interface UploadImageProps {
  isVisible: boolean;
  toggleModal: () => void;
  onImagePick: (
    files: Array<{uri: string; name: string; type: string}>,
  ) => void;
  multiple?: boolean;
  pdfBoolean?: boolean;
}

export const PopupUpload: FC<UploadImageProps> = ({
  isVisible,
  toggleModal,
  onImagePick,
  multiple = false,
  pdfBoolean = false,
}) => {
  useEffect(() => {
    requestAllPermissions();
  }, []);

  const requestAllPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        const galleryPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Gallery Permission',
            message: 'App needs access to your photo gallery.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (
          cameraPermission !== PermissionsAndroid.RESULTS.GRANTED ||
          galleryPermission !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          //   Alert.alert(
          //     'Permissions Denied',
          //     'You need to grant all permissions to proceed.',
          //   );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      console.log('iOS handles permissions automatically');
    }
  };

  // Open Camera
  const openCamera = async () => {
    try {
      const image: ImageOrVideo = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      });
      const res = formatImageResponse(image);
      onImagePick([res]);
      toggleModal();
    } catch (error) {
      console.log(error);
      toggleModal();
    }
  };

  // Open Gallery
  const openGallery = async () => {
    try {
      const images: ImageOrVideo | ImageOrVideo[] =
        await ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          multiple,
        });

      const formattedImages = Array.isArray(images)
        ? images.map(formatImageResponse)
        : [formatImageResponse(images)];

      onImagePick(formattedImages);
      toggleModal();
    } catch (error) {
      console.log(error);
      toggleModal();
    }
  };

  // Upload PDF
  const uploadPDF = async () => {
    try {
      const res: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      const resBody = {
        uri: res[0]?.uri || '',
        name: res[0]?.name || 'unknown.pdf',
        type: res[0]?.type || 'application/pdf',
      };
      onImagePick([resBody]);
      toggleModal();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log(err);
      }
      toggleModal();
    }
  };

  const formatImageResponse = (image: ImageOrVideo) => ({
    uri: image.path,
    name: image.path.split('/').pop() || 'unknown',
    type: image.mime,
  });

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={toggleModal}>
      <Pressable style={styles.modal} onPress={toggleModal}>
        <View style={styles.popupContainer}>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <ImageAtom
              sourceRequire={require('@shared/src/assets/img/camera.png')}
              imageStyle={{width: moderateScale(60), height: moderateScale(60)}}
            />
            <TextAtom
              text={'Camera'}
              preset="bodyBold"
              style={{color: colorPresets.BLACK}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openGallery}>
            <ImageAtom
              sourceRequire={require('@shared/src/assets/img/gallery.png')}
              imageStyle={{width: moderateScale(60), height: moderateScale(60)}}
            />
            <TextAtom
              text={'Gallery'}
              preset="bodyBold"
              style={{color: colorPresets.BLACK}}
            />
          </TouchableOpacity>
          {pdfBoolean && (
            <TouchableOpacity style={styles.button} onPress={uploadPDF}>
              <ImageAtom
                sourceRequire={require('@shared/src/assets/img/document.png')}
                imageStyle={{
                  width: moderateScale(60),
                  height: moderateScale(60),
                }}
              />
              <TextAtom
                text={'Pdf upload'}
                preset="bodyBold"
                style={{color: colorPresets.BLACK}}
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: WINDOW_HEIGHT * 0.25,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    marginTop: 5,
  },
});
