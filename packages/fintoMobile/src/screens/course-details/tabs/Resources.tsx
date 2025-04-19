import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {imageUrl} from '@shared/src/config/imageUrl';
import {createCourseCart} from '@shared/src/provider/store/services/CourseCart.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {isInCart} from '@src/components/Calculate';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';
import {pdfPermission} from '@src/components/DownloadPdf/DownloadPdf';
import PdfMolecule from '@src/components/molecules/PdfMolecule/PdfMolecule';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import {DeletePopup} from '@src/components/Popup/DeletePopup';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
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
  const {
    courses,
    singleCourse,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
  let route = useRoute<any>();

  const {course, id} = route.params || {};
  const data = singleCourse ? singleCourse : course;
  const [modalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [selectedResourceFile, setSelectedResourceFile] =
    React.useState<any>(null);

  const dispatch = useAppDispatch();
  const {
    setVideoPlayerBeforePurchaseUrl,
    setPlayVideoStartBeforePurchaseLoading,
  } = useVideoPlayerContext();
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  const {auth} = useAppSelector(state => state.auth);

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
    <ScrollViewAtom
      style={{
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
                      el?.category_id == data?.category_id && el.id != data?.id,
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
  );
};
