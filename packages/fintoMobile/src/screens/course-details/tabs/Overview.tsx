import {useRoute} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import SeparatorAtom from '@src/components/SeperatorAtom';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import React from 'react';
import {FlatList, LayoutChangeEvent, ScrollView, View} from 'react-native';

interface OverviewProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const Overview: React.FunctionComponent<OverviewProps> = ({
  onLayout,
}) => {
  const {
    courses,
    singleCourse,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
  let route = useRoute<any>();
  const {course, id} = route.params || {};
  const data = singleCourse ? singleCourse : course;

  const innerCategoriesRenderItem = ({item}: {item: CoursesResponse}) => {
    return <PopularCourseMolecule item={item} />;
  };

  return (
    <View style={{flex: 1, padding: mScale.base}}>
      <ScrollViewAtom>
        <View style={{marginBottom: mScale.base}}>
          <TextAtom text={'About this course'} preset="heading3" />
          <View style={{marginTop: mScale.xs}}>
            <TextAtom
              text={singleCourse?.description || ''}
              preset="body"
              style={{color: '#C8C8CC'}}
            />
          </View>
        </View>
        <View
          style={[
            commonStyle.flexStart,
            {
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              flexGrow: 1,
              marginBottom: mScale.base,
            },
          ]}>
          <TextAtom
            text={'Estimated Completion Time:'}
            preset="heading4"
            style={{marginEnd: mScale.base, width: moderateScale(176)}}
          />
          <TextAtom
            text={singleCourse?.duration_time || ''}
            preset="body"
            style={{width: moderateScale(160)}}
          />
        </View>
        <View
          style={[
            commonStyle.flexStart,
            {
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              flexGrow: 1,
              marginBottom: mScale.base,
            },
          ]}>
          <TextAtom
            text={'Languages:'}
            preset="heading4"
            style={{marginEnd: mScale.base, width: moderateScale(176)}}
          />
          <TextAtom
            text={singleCourse?.course_language || ''}
            preset="body"
            style={{width: moderateScale(160)}}
          />
        </View>
        <View
          style={[
            commonStyle.flexStart,
            {
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              flexGrow: 1,
              marginBottom: mScale.base,
            },
          ]}>
          <TextAtom
            text={'On Completion Perks:'}
            preset="heading4"
            style={{marginEnd: mScale.base, width: moderateScale(176)}}
          />
          <TextAtom
            text={'Fintopedia Verified Certificate'}
            preset="body"
            style={{width: moderateScale(160)}}
          />
        </View>
        <SeparatorAtom
          marginHorizontal={0}
          style={{marginVertical: mScale.base}}
        />
        <View style={{marginBottom: mScale.base}}>
          <TextAtom text={'About this course'} preset="heading3" />
          <View style={{marginTop: mScale.xs}}>
            <TextAtom
              text={`${singleCourse?.description}`}
              preset="body"
              style={{color: '#C8C8CC'}}
            />
          </View>
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
