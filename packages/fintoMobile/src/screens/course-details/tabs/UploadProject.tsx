import {useNavigation, useRoute} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {imageUrl} from '@shared/src/config/imageUrl';
import {
  createCourseUploadFile,
  deleteCourseUploadFile,
} from '@shared/src/provider/store/services/course-upload-file.service';
import {createCourseCart} from '@shared/src/provider/store/services/CourseCart.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_HEIGHT} from '@shared/src/theme/metrics';
import {fontPresets} from '@shared/src/theme/typography';
import {CourseUploadFileResponse} from '@shared/src/utils/types/course-upload-file';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {ImageType} from '@shared/src/utils/types/main';
import {isInCart} from '@src/components/Calculate';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';
import {pdfPermission} from '@src/components/DownloadPdf/DownloadPdf';
import LoaderAtom from '@src/components/LoaderAtom';
import PdfMolecule from '@src/components/molecules/PdfMolecule/PdfMolecule';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import {DeletePopup} from '@src/components/Popup/DeletePopup';
import {PopupUpload} from '@src/components/Popup/PopupUpload';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {Alert, FlatList, LayoutChangeEvent, Text, View} from 'react-native';

interface UploadProjectProps {
  onLayout: (event: LayoutChangeEvent) => void;
}
export const UploadProject: React.FunctionComponent<UploadProjectProps> = ({
  onLayout,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const {auth} = useAppSelector(state => state.auth);
  const {
    courses,
    singleCourse,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
  const {upload_file, loading: upload_file_loading} = useAppSelector(
    state => state.courseUploadFile,
  );
  const {
    setVideoPlayerBeforePurchaseUrl,
    setPlayVideoStartBeforePurchaseLoading,
  } = useVideoPlayerContext();
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
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

  const innerCategoriesRenderItem = ({item}: {item: CoursesResponse}) => {
    return (
      <PopularCourseMolecule
        item={item}
        onView={() => {
          if (item?.course_video_embed) {
            setVideoPlayerBeforePurchaseUrl(item?.course_video_embed);
            setPlayVideoStartBeforePurchaseLoading(false);
          }
          navigation.navigate(RouteKeys.BEFOREENROLLINGCOURSEDETAILSSCREEN, {
            id: item?.id,
          });
        }}
        onPress={async () => {
          let params = {
            user_id: Number(auth?.user?.id),
            course_id: Number(item?.id),
            status: '1',
          };
          if (isInCart(courseCart, item?.id)) {
            navigation.navigate(RouteKeys.CARTSCREEN);
          } else {
            await dispatch(
              createCourseCart({
                params,
                onSuccess: data => {
                  navigation.navigate(RouteKeys.CARTSCREEN);
                },
                onError: err => {},
              }),
            ).unwrap();
          }
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
      {coursesLoading.singleCourse ||
      coursesLoading.courses ||
      upload_file_loading.create ||
      upload_file_loading?.upload_file ? (
        <LoaderAtom size="large" />
      ) : null}
      <ScrollViewAtom>
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
          {/* <TextAtom
            preset="body"
            text={'File under 20 MB'}
            style={{
              marginVertical: mScale.md,
              textAlign: 'center',
              color: '#717171',
            }}
          /> */}
        </View>
        <View style={{marginVertical: mScale.base}}>
          <View style={{marginStart: -mScale.md2}}>
            {upload_file?.filter(el => el?.course_id == singleCourse?.id)
              ?.length ? (
              <ViewAll title="Previously Uploaded Projects" visible={false} />
            ) : null}
          </View>
          {upload_file?.length ? (
            <View style={{marginVertical: mScale.base}}>
              <FlatList
                data={upload_file?.filter(
                  el => el?.course_id == singleCourse?.id,
                )}
                renderItem={renderItem}
                contentContainerStyle={{
                  rowGap: mScale.base,
                  // paddingBottom: moderateScale(WINDOW_HEIGHT * 0.6),
                  zIndex: 1,
                }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                keyExtractor={(item): any => item.id}
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
            let body = {
              upload_file:
                `${imageUrl}/uploads/course_files_pdf/${selectedUploadFile?.upload_file}` ||
                '',
              course_name: selectedUploadFile?.course?.name || '',
              user_name: selectedUploadFile?.user?.first_name || '',
            };
            navigation.navigate(RouteKeys.VIEWPDFSCREEN, {data: body});
          }}
          downloadPdf={async () => {
            let mime = 'application/pdf';
            let extensionType =
              '' + selectedUploadFile?.upload_file?.toString().split('.').pop();
            let url = `${imageUrl}/uploads/course_files_pdf/${selectedUploadFile?.upload_file}`;
            let title = `${selectedUploadFile?.course?.name}`;
            await pdfPermission({mime, url, title, extensionType});
            Alert.alert('Pdf have been downloaded successfully!');
          }}
          deletePdf={() => {
            let id = Number(selectedUploadFile?.id);
            dispatch(
              deleteCourseUploadFile({
                id,
                onSuccess(data) {
                  setSelectedUploadFile(null);
                  console.log('data upload delete');
                },
                onError(error) {},
              }),
            );
          }}
        />
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll
            title="Frequently Bought Together"
            visible={false}
            paddingHorizontal={0}
          />
          <View>
            <FlatList
              data={
                courses?.length
                  ? courses?.filter(
                      el =>
                        el?.category_id == data?.category_id &&
                        el.id != data?.id,
                    )
                  : []
              }
              renderItem={innerCategoriesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollViewAtom>
    </View>
  );
};
