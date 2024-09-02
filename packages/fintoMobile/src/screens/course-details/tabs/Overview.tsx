import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { GradientTemplate } from '@shared/src/components/templates/GradientTemplate';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import SeparatorAtom from '@src/components/SeperatorAtom';
import React from 'react';
import { View } from 'react-native';
interface OverviewProps {}
export const Overview: React.FunctionComponent<OverviewProps> = () => {
  return (
    <GradientTemplate style={{paddingBottom:0,}} >
      <View>
        <View style={{marginBottom: mScale.base}}>
          <TextAtom text={'About this course'} preset="heading3" />
          <View style={{marginTop: mScale.xs}}>
            <TextAtom
              text={
                'The most complete course available on Product Management. 13+ hours of videos, activities, interviews, &  more'
              }
              preset="body"
              color={'#C8C8CC'}
            />
          </View>
        </View>
        <View
          style={[
            commonStyle.flexStart,
            {
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              flex: 1,
              marginBottom: mScale.base,
            },
          ]}>
          <TextAtom
            text={'Estimated Completion Time:'}
            preset="heading4"
            style={{marginEnd: mScale.base, width: moderateScale(176)}}
          />
          <TextAtom
            text={'13 hours'}
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
              flex: 1,
              marginBottom: mScale.base,
            },
          ]}>
          <TextAtom
            text={'Languages:'}
            preset="heading4"
            style={{marginEnd: mScale.base, width: moderateScale(176)}}
          />
          <TextAtom
            text={'English'}
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
              text={`Updated January 2024: Over 4,000 students who have taken this course have gotten jobs as Product Managers! Students now work at companies like Google, Zynga, Airbnb, Wal-Mart, Dell, Booking. com, Jet. com, Vodafone, HomeAway, Boeing, Freelancer. com, Wayfair, & more!

The most updated and complete Product Management course on Udemy! You'll learn the skills that make up the entire Product Management job and process: from ideation to market research, to UX wireframing to prototyping, technology, metrics, and finally to building the product with user stories, project management, scoping, and leadership. We even have interviews with real life PMs, Q&A sessions with students, and a comprehensive guide to preparing and interviewing for a Product Management job. read less`}
              preset="body"
              color={'#C8C8CC'}
            />
            
          </View>
        </View>
      </View>
    </GradientTemplate>
  );
};
