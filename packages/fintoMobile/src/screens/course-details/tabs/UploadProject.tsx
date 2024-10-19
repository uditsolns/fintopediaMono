import {useRoute} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {createCourseUploadFile} from '@shared/src/provider/store/services/course-upload-file.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes'; 
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_HEIGHT} from '@shared/src/theme/metrics';
import {fontPresets} from '@shared/src/theme/typography';
import {CourseUploadFileResponse} from '@shared/src/utils/types/course-upload-file';
import {ImageType} from '@shared/src/utils/types/main';
import LoaderAtom from '@src/components/LoaderAtom';
import PdfMolecule from '@src/components/molecules/PdfMolecule/PdfMolecule';
import {DeletePopup} from '@src/components/Popup/DeletePopup';
import {PopupUpload} from '@src/components/Popup/PopupUpload';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import React from 'react';
import {Alert, FlatList, Text, View} from 'react-native';

interface UploadProjectProps {}
export const UploadProject: React.FunctionComponent<
  UploadProjectProps
> = () => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {singleCourse, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
  const {upload_file, loading: upload_file_loading} = useAppSelector(
    state => state.courseUploadFile,
  );
  let route = useRoute<any>();

  const {course, id} = route.params || {};
  const data = singleCourse ? singleCourse : course;
  const [modalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const [modalVisible2, setModalVisible2] = React.useState(false);
  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };
  const [selectedUploadFile, setSelectedUploadFile] =
    React.useState<CourseUploadFileResponse | null>(null);

  const renderItem = ({item}: {item: CourseUploadFileResponse}) => {
    return (
      <PdfMolecule
        item={item}
        onPress={() => {
          setSelectedUploadFile(item);
          toggleModal2();
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        padding: mScale.base,
        paddingBottom: 0,
        zIndex: 1,
      }}>
      {coursesLoading.singleCourse ||
      coursesLoading.courses ||
      upload_file_loading.create ||
      upload_file_loading?.upload_file ? ( 
        <LoaderAtom size="large" /> 
      ) : null}
      <View>
        <View>
          <TextAtom text={'Upload Project'} preset="heading4" />
          <TextAtom
            text="Upload your completed project in pdf or docx format. After submitting, mentor will give feedback in 2-3 days"
            preset="medium"
            style={{marginVertical: mScale.md, color: '#D5D5D9'}}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colorPresets.GRAY3,
            padding: mScale.xxl,
            borderRadius: 12,
            marginVertical: mScale.base,
          }}>
          <View style={[commonStyle.flexSpaceBetween]}>
            <Images.SVG.CloudUpload />
            <Text
              style={{
                ...fontPresets.titleBold,
                color: '#717171',
                marginStart: mScale.md,
              }}>
              Drag or drop your files to upload, or{' '}
              <Text style={{fontSize: 16}}>Browse</Text>{' '}
            </Text>
          </View>
          <TextAtom
            preset="medium"
            text={'Format: Pdf, Docx, Zip file'}
            style={{
              marginVertical: mScale.md,
              textAlign: 'center',
              color: '#717171',
            }}
          />

          {/* <ButtonIconRightAtom
            btnTitle={'Upload a file'}
            iconColor={colorPresets.BLACK}
            iconSize={mScale.lg}
            color={colorPresets.BLACK}
            iconName={'cloud-upload-outline'}
            preset={'mediumBold'}
            style={{marginTop: mScale.md}}
          /> */}
          <ButtonAtom
            title={'Upload a file'}
            preset="primary"
            onPress={toggleModal}
          />
          <TextAtom
            preset="body"
            text={'File under 20 MB'}
            style={{
              marginVertical: mScale.md,
              textAlign: 'center',
              color: '#717171',
            }}
          />
        </View>
        <View style={{marginVertical: mScale.base}}>
          <View style={{marginStart: -mScale.md2}}>
            <ViewAll title="Previously Uploaded Projects" visible={false} />
          </View>
          {upload_file?.length ? (
            <View style={{marginVertical: mScale.base, height: WINDOW_HEIGHT}}>
              <FlatList
                data={upload_file}
                renderItem={renderItem}
                contentContainerStyle={{
                  rowGap: mScale.base,
                  paddingBottom: moderateScale(WINDOW_HEIGHT * 0.6),
                  zIndex: 1,
                }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              />
            </View>
          ) : null}
        </View>
        <PopupUpload
          isVisible={modalVisible}
          toggleModal={toggleModal}
          pdfBoolean
          onImagePick={(data: ImageType[]) => {
            let res = data?.pop();
            if (res) {
              let formData = new FormData();
              formData.append('user_id', auth?.user?.is_active);
              formData.append('course_id', singleCourse?.id);
              formData.append('upload_file', res);
              console.log(res);
              dispatch(
                createCourseUploadFile({
                  formData,
                  onSuccess(data) {},
                  onError(error) {},
                }),
              );
            }
          }}
        />
        <DeletePopup
          isVisible={modalVisible2}
          toggleModal={toggleModal2}
          viewPdf={() => {
            console.log(
              '==========================view pdf',
              JSON.stringify(selectedUploadFile),
            );
          }}
          downloadPdf={() => {}}
          deletePdf={() => {}}
        />
      </View>
    </View>
  );
};
