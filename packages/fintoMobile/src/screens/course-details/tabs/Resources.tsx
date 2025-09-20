import {useNavigation} from '@react-navigation/native';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {imageUrl} from '@shared/src/config/imageUrl';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {pdfPermission} from '@src/components/DownloadPdf/DownloadPdf';
import PdfMolecule from '@src/components/molecules/PdfMolecule/PdfMolecule';
import {DeletePopup} from '@src/components/Popup/DeletePopup';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {Alert, FlatList, LayoutChangeEvent, View} from 'react-native';

interface ResourcesProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const Resources: React.FunctionComponent<ResourcesProps> = ({
  onLayout,
}) => {
  const navigation = useNavigation<any>();
  const {singleCourse} = useAppSelector(state => state.courses);
  const [modalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [selectedResourceFile, setSelectedResourceFile] =
    React.useState<any>(null);

  const renderItem = ({item}: {item: any}) => {
    return (
      <PdfMolecule
        item={item}
        onPress={() => {
          setSelectedResourceFile(item);
          toggleModal();
        }}
      />
    );
  };
  return (
    <View
      onLayout={onLayout}
      style={{
        flex: 1,
        flexGrow: 1,
        padding: mScale.base,
        paddingBottom: 0,
        zIndex: 1,
      }}>
      <View>
        <TextAtom text={'Resources'} preset="heading4" />
        <TextAtom
          text="Upload your completed project in pdf or docx format. After submitting, mentor will give feedback in 2-3 days"
          preset="medium"
          style={{marginVertical: mScale.md, color: '#D5D5D9'}}
        />
        <View style={{marginVertical: mScale.base}}>
          <FlatList
            data={
              singleCourse?.resources?.length ? singleCourse?.resources : []
            }
            renderItem={renderItem}
            contentContainerStyle={{
              rowGap: mScale.base,
              paddingBottom: moderateScale(150),
            }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
        </View>
        <DeletePopup
          isVisible={modalVisible}
          toggleModal={toggleModal}
          viewPdf={() => {
            let body = {
              upload_file:
                `${imageUrl}/uploads/resource_file_upload/${selectedResourceFile?.resource_file}` ||
                '',
              course_name: selectedResourceFile?.course?.name || '',
              user_name: '',
            };
            console.log(body);
            navigation.navigate(RouteKeys.VIEWPDFSCREEN, {data: body});
          }}
          downloadPdf={async () => {
            let mime = 'application/pdf';
            let extensionType =
              '' +
              selectedResourceFile?.resource_file?.toString().split('.').pop();
            let url = `${imageUrl}/uploads/resource_file_upload/${selectedResourceFile?.resource_file}`;
            let title = `${selectedResourceFile?.course?.name || ''}`;
            await pdfPermission({mime, url, title, extensionType});
            Alert.alert('Pdf have been downloaded successfully!');
          }}
          deletePdf={() => {}}
          isDeleteVisible={false}
        />
      </View>
    </View>
  );
};
