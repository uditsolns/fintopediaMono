import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import Header from '@src/components/Header/Header';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import ProgressBar from '@src/components/ProgressBar';
import RatingReview from '@src/components/RatingReview';
import React from 'react';
import {FlatList, Pressable, View} from 'react-native';
import {data} from './tabs/CourseContent';
import {BeforeEnrollingCourseAtom} from '@src/components/BeforeEnrollingCourseAtom';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import LearningMolecule from '@src/components/molecules/LearningMolecule/LearningMolecule';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';

interface BeforeEnrollingCourseDetailsProps {}
export const BeforeEnrollingCourseDetails: React.FunctionComponent<
  BeforeEnrollingCourseDetailsProps
> = () => {
  const renderItem = ({item}: {item: any}) => {
    return <LearningMolecule item={item} itemWidth={'full-width'} />;
  };

  const innerCategoriesRenderItem = ({item}: {item: any}) => {
    return <PopularCourseMolecule item={item} />;
  };

  return (
    <GradientTemplate style={{paddingBottom: 0, paddingHorizontal: 0}}>
      <Header cartVisible={false} />
      <ScrollViewAtom>
        <View style={{paddingHorizontal: mScale.base}}>
          <View
            style={{
              alignSelf: 'center',
              position: 'relative',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <View
              style={{
                position: 'absolute',
                top: 20,
                right: 15,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                zIndex: 1,
              }}>
              <Images.SVG.ShareIcon />
            </View>
            <ImageAtom
              sourceRequire={require('@shared/src/assets/img/courseplaceholder2.png')}
              imageStyle={{
                width: WINDOW_WIDTH * 0.91,
                height: moderateScale(235),
              }}
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
              }}>
              <Images.SVG.Play1 />
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal: mScale.base}}>
          <TextAtom
            text={'Stock Market Trading & Investing: 8 Courses In 1 Bundle!'}
            preset="heading3"
            style={{marginVertical: mScale.base}}
          />
          <TextAtom
            text={
              'These concepts seem scary but are actually very easy to understand if they are taught in a practical manner'
            }
            preset="medium"
            style={{color: '#D5D5D9'}}
          />

          <View>
            <ProgressBar level="intermediate" hours={'20'} mv={mScale.sm} />
            <RatingReview rating={4.6} review={1000} />
          </View>
          <ButtonAtom title={'Course starts from  ₹ 2,999'} preset="fourthy" />
          <TextAtom
            text={'This course includes'}
            preset="heading3"
            style={{marginVertical: mScale.md}}
          />
          {[...Array(5)].map((el, index) => {
            return (
              <View
                key={index}
                style={[
                  commonStyle.flexStart,
                  {
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    marginVertical: mScale.md,
                    flex: 1,
                  },
                ]}>
                <View style={{marginEnd: mScale.md, marginTop: mScale.xxs}}>
                  <Images.SVG.CheckBoxIcon2 />
                </View>

                <TextAtom
                  preset="body"
                  style={{color: '#F3F4F7'}}
                  text={
                    'Practical learning through real-life examples.Wide range of options trading strategies'
                  }
                />
              </View>
            );
          })}
        </View>
        <View style={{padding: mScale.base, backgroundColor: '#0D0F1C'}}>
          <TextAtom
            text={'This course includes'}
            preset="heading3"
            style={{marginVertical: mScale.md}}
          />
          <View
            style={[
              commonStyle.flexSpaceBetween,
              {flexWrap: 'wrap', rowGap: 20},
            ]}>
            <Pressable
              style={{
                backgroundColor: '#222431',
                padding: mScale.base,
                borderWidth: 1,
                borderColor: colorPresets.GRAY3,
                borderRadius: 9,
                width: moderateScale(150),
                marginEnd: mScale.md,
              }}>
              <ImageAtom
                sourceRequire={require('@shared/src/assets/img/article.png')}
                imageStyle={{width: 24, height: 24}}
              />
              <View style={{marginVertical: mScale.md}}>
                <TextAtom text={'11 Articles'} preset="titleBold" />
                <TextAtom
                  preset="small"
                  text={
                    'I bought a course on option trading by Jyoti Budhia jisme maine Option Trading ke regarding basic concept.'
                  }
                  numberOfLines={2}
                />
              </View>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#222431',
                padding: mScale.base,
                borderWidth: 1,
                borderColor: colorPresets.GRAY3,
                borderRadius: 9,
                width: moderateScale(150),
                marginEnd: mScale.md,
              }}>
              <ImageAtom
                sourceRequire={require('@shared/src/assets/img/article.png')}
                imageStyle={{width: 24, height: 24}}
              />
              <View style={{marginVertical: mScale.md}}>
                <TextAtom text={'11 Articles'} preset="titleBold" />
                <TextAtom
                  preset="small"
                  text={
                    'I bought a course on option trading by Jyoti Budhia jisme maine Option Trading ke regarding basic concept.'
                  }
                  numberOfLines={2}
                />
              </View>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#222431',
                padding: mScale.base,
                borderWidth: 1,
                borderColor: colorPresets.GRAY3,
                borderRadius: 9,
                width: moderateScale(150),
                marginEnd: mScale.md,
              }}>
              <ImageAtom
                sourceRequire={require('@shared/src/assets/img/article.png')}
                imageStyle={{width: 24, height: 24}}
              />
              <View style={{marginVertical: mScale.md}}>
                <TextAtom text={'11 Articles'} preset="titleBold" />
                <TextAtom
                  preset="small"
                  text={
                    'I bought a course on option trading by Jyoti Budhia jisme maine Option Trading ke regarding basic concept.'
                  }
                  numberOfLines={2}
                />
              </View>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#222431',
                padding: mScale.base,
                borderWidth: 1,
                borderColor: colorPresets.GRAY3,
                borderRadius: 9,
                width: moderateScale(150),
                marginEnd: mScale.md,
              }}>
              <ImageAtom
                sourceRequire={require('@shared/src/assets/img/article.png')}
                imageStyle={{width: 24, height: 24}}
              />
              <View style={{marginVertical: mScale.md}}>
                <TextAtom text={'11 Articles'} preset="titleBold" />
                <TextAtom
                  preset="small"
                  text={
                    'I bought a course on option trading by Jyoti Budhia jisme maine Option Trading ke regarding basic concept.'
                  }
                  numberOfLines={2}
                />
              </View>
            </Pressable>
          </View>
        </View>
        <View style={{paddingHorizontal: mScale.base, flex: 1}}>
          <TextAtom
            text={'Your Course Overview'}
            preset="heading3"
            style={{marginTop: mScale.md}}
          />
          <TextAtom
            preset="body"
            text={'3 sections • 24 topics • 4 hrs 38 mins content'}
            style={{color: '#E8EBED'}}
          />
          <View>
            <FlatList
              data={data}
              renderItem={({item}) => (
                <BeforeEnrollingCourseAtom
                  section={item.section}
                  lessons={item.lessons}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              removeClippedSubviews={true}
            />
          </View>
        </View>
        <View
          style={{
            marginHorizontal: mScale.base,
            flex: 1,
            backgroundColor: '#2D303D',
            padding: mScale.base,
            borderRadius: 10,
          }}>
          <TextAtom text={'About The Course'} preset="heading4" />
          <TextAtom
            preset="medium"
            text={
              'Welcome to our comprehensive Stock Market Course, designed to empower you with the knowledge and skills needed. '
            }
          />
          <TextAtom
            text={`What You'll Learn`}
            preset="titleBold"
            style={{marginVertical: mScale.base}}
          />
          <View style={{marginStart: mScale.xs}}>
            <TextAtom
              style={{marginBottom: mScale.md}}
              preset="medium"
              text={`\u2B24 Introduction to Stock Markets: Grasp the basic terminologies, structure, and functions of the stock market. Financial Instruments: Deep dive into different types of financial instruments and their roles in the market.`}
            />
            <TextAtom
              preset="medium"
              text={`\u2B24 Introduction to Stock Markets: Grasp the basic terminologies, structure, and functions of the stock market. Financial Instruments: Deep dive into different types of financial instruments and their roles in the market.`}
            />
          </View>
        </View>
        <View style={{padding: mScale.base}}>
          <View style={{paddingHorizontal: mScale.base}}>
            <TextAtom
              preset="heading3"
              text={'See what others are achieving through learning'}
              style={{textAlign: 'center'}}
            />
          </View>
        </View>
        <View style={{paddingLeft: mScale.base}}>
          <FlatList
            data={[...Array(5)]}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
            contentContainerStyle={{
              columnGap: mScale.base,
              paddingBottom: mScale.lg,
            }}
            horizontal={true}
          />
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Frequently Bought Together" visible={false} />
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
    </GradientTemplate>
  );
};
