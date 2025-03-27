import {Platform, PermissionsAndroid, Alert} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';

export interface PdfProps {
  mime: string | null;
  url: string | null;
  title: string | null;
  description?: string | null;
  onSucessMsg?: string;
  onErrorMsg?: string;
  extensionType: string;
}

const pdfPermission = async ({
  mime,
  url,
  title,
  description = 'Pdf download have been successfully!',
  onSucessMsg,
  onErrorMsg,
  extensionType,
}: PdfProps): Promise<void> => {
  if (Platform.OS === 'ios' || Platform.Version >= '33') {
    await downloadPDF({
      mime,
      url,
      title,
      description,
      onSucessMsg,
      onErrorMsg,
      extensionType,
    });
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to download PDFs.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await downloadPDF({
          mime,
          url,
          title,
          description,
          onSucessMsg,
          onErrorMsg,
          extensionType,
        });
      } else {
        Alert.alert('Storage Permission Not Granted');
      }
    } catch (err) {
      console.error('Permission error:', err);
      throw err;
    }
  }
};

const downloadPDF = async ({
  mime,
  url,
  title,
  description,
  onSucessMsg,
  onErrorMsg,
  extensionType,
}: PdfProps): Promise<void> => {
  try {
    const dirs = ReactNativeBlobUtil.fs.dirs.DocumentDir;
    const config: any = {
      fileCache: true,
      appendExt: extensionType,
      path: `${dirs}/${title}.${extensionType}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime,
        description,
        title
      },
    };
    const res = await ReactNativeBlobUtil.config(config).fetch(
      'GET',
      url || '',
    );
    const filePath = res.path();

    if (Platform.OS === 'ios') {
      const options: any = {
        type: mime,
        url: filePath,
        saveToFiles: true,
      };

      try {
        await Share.open(options);
        console.log(onSucessMsg || 'PDF shared successfully');
      } catch (err) {
        console.error('Error sharing PDF:', err);
        throw err;
      }
    } else {
      const androidConfig = {fileCache: true};

      const res = await ReactNativeBlobUtil.config(androidConfig).fetch(
        'GET',
        url || '',
      );
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        {
          name: title,
          parentFolder: '',
          mimeType: mime,
        },
        'Download',
        res.path(),
      );

      console.log(onSucessMsg || 'PDF downloaded successfully');
    }
  } catch (error) {
    console.error('Download error:', error);
    if (onErrorMsg) {
      Alert.alert(onErrorMsg);
    }
    throw error;
  }
};

export {pdfPermission, downloadPDF};
