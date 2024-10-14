import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {mScale} from '@shared/src/theme/metrics';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  Pressable,
} from 'react-native';

const FrequentlyAskMolecule: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };

  return (
    <TouchableOpacity onPress={toggleExpanded} style={styles.container}>
      <View style={[commonStyle.flexStart, styles.header]}>
        <View style={{flex: 1, paddingTop: 0, paddingHorizontal: mScale.md}}>
          <TextAtom
            text={'Why opt for an online options trading course?'}
            preset="heading4"
          />
          {expanded && (
            <TextAtom
              text={
                "Reach out to us for inquiries, collaborations, or just to say hello. We're here to listen."
              }
              style={{color: '#D5D5D9'}}
              preset="medium"
            />
          )}
        </View>
        <Pressable onPress={toggleExpanded}>
          {expanded ? (
            <Images.SVG.CircleChevronUpIcon />
          ) : (
            <Images.SVG.CircleChevronDownIcon />
          )}
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: mScale.md,
  } as ViewStyle,
  header: {
    alignItems: 'flex-start',
  } as ViewStyle,
});

export default FrequentlyAskMolecule;
