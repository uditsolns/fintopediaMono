import {useNavigation} from '@react-navigation/native';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import CarouselAtom from '@src/components/Carousel/CarouselAtom';
import GetStarted from '@src/components/GetStarted';
import Header from '@src/components/Header/Header';
import CategoriesMolecule from '@src/components/molecules/CategoriesMolecule/CategoriesMolecule';
import ContinueLearningMolecule from '@src/components/molecules/ContinueLearningMolecule/ContinueLearningMolecule';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import * as React from 'react';
import {FlatList, ImageBackground, View} from 'react-native';
let CategoriesArr = [
  {
    id: 1,
    name: 'Investment strategy',
  },
  {
    id: 2,
    name: 'Finance',
  },
  {
    id: 3,
    name: 'Mutual funds',
  },
  {
    id: 4,
    name: 'Stock trading',
  },
  {
    id: 5,
    name: 'Investment',
  },
  {
    id: 6,
    name: 'Money Market',
  },
];

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const navigation = useNavigation();
  const [categoriesSelected, setCategoriesSelected] = React.useState<number>(0);

  const continueRenderItem = ({item}) => {
    return (
      <ContinueLearningMolecule
        item={item}
        onPress={() => {
          // navigation.navigate(RouteKeys.AFTERENROLLINGCOURSEDETAILS)
        }}
      />
    );
  };
  const categoriesRenderItem = ({item}) => {
    const handlePress = id => {
      setCategoriesSelected(id);
    };
    return (
      <CategoriesMolecule
        item={item}
        categoriesSelectedId={categoriesSelected}
        onPress={() => {
          handlePress(item?.id);
        }}
      />
    );
  };
  const innerCategoriesRenderItem = ({item}) => {
    return (
      <PopularCourseMolecule
        item={item}
        onPress={() => {
          // navigation.navigate(RouteKeys.BEFOREENROLLINGCOURSEDETAILS)
        }}
      />
    );
  };

  return (
    <GradientTemplate style={{paddingHorizontal: 0,paddingBottom:0}}>
      <Header text={'Good Morning'} visible={false} />
      <ScrollViewAtom
        nestedScrollEnabled={true}
        style={{paddingBottom: moderateScale(100)}}>
        <View>
          <CarouselAtom />
        </View>
        <View>
          <ViewAll title="Continue Learning" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={[...Array(5)]}
              renderItem={continueRenderItem}
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
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="All Categories" />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={CategoriesArr}
              renderItem={categoriesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={{paddingLeft: mScale.base, marginTop: mScale.base}}>
            <FlatList
              data={[...Array(5)]}
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
        <View style={[{marginVertical: mScale.xl, flex: 1}]}>
          <ImageBackground
            source={require('@shared/src/assets/img/quizBg.png')}
            style={{flex: 1, padding: mScale.xxl}}>
            <TextAtom
              text={'Navigate your financial journey, take the finance quiz'}
              preset="heading3"
              style={{textAlign: 'center', marginBottom: mScale.md}}
            />
            <TextAtom
              text={
                'Join 6000+ in discovering your financial strengths through our interactive quiz.'
              }
              preset="medium"
              style={{textAlign: 'center', marginBottom: mScale.lg}}
            />
            {/* <SmallButtonAtom
              btnTitle={'Attempt quiz'}
              preset={'titleBold'}
              style={{width: moderateScale(169), alignSelf: 'center'}}
            /> */}
          </ImageBackground>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Popular Courses" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={[...Array(5)]}
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
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            paddingHorizontal: mScale.base,
            width: '100%',
          }}>
          <GetStarted
            onPress={() => {
              // navigation.navigate(RouteKeys.DONTKNOWWHERETOSTART);
            }}
          />
        </View>
    </GradientTemplate>
  );
};
