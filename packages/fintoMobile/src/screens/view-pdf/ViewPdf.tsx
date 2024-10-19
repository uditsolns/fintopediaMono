import {useNavigation, useRoute} from '@react-navigation/native';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {moderateScale} from '@shared/src/theme/metrics';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {View} from 'react-native';
import Pdf from 'react-native-pdf';

interface ViewPdfProps extends NavType<'ViewPdf'> {}
export const ViewPdf: React.FunctionComponent<ViewPdfProps> = ({
  navigation,
}) => {
  const route = useRoute<any>();
  const [loading, setLoading] = React.useState(false);
  const {data} = route.params || {};

  const resources = {
    uri: data?.upload_file,
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.course_name,
    });
  }, []);
  return (
    <GradientTemplate
      style={{
        paddingHorizontal: 0,
        paddingBottom: 0,
        paddingTop: moderateScale(70),
      }}>
      <View style={{flex: 1}}>
        <Pdf
          trustAllCerts={false}
          source={resources}
          style={{flex: 1, width: '100%'}}
          singlePage={false}
          horizontal={false}
          onError={error => {
            console.error(error);
          }}
        />
      </View>
      
    </GradientTemplate>
  );
};
