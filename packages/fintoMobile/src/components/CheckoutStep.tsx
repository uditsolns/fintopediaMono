import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {View} from 'react-native';

interface CheckoutStepProps {
  activeStep: number;
}

export const CheckoutStep: React.FunctionComponent<CheckoutStepProps> = ({
  activeStep,
}) => {
  const getStepStyle = (step: number) => {
    if (step < activeStep) {
      return {
        container: {
          backgroundColor: 'rgba(118, 214, 81, 0.3)',
          padding: mScale.md,
          borderRadius: 7,
        },
        text: {
          color: colorPresets.SECONDARY,
        },
        circleBackground: {
          backgroundColor: colorPresets.SECONDARY,
        },
        circleText: {
          color: colorPresets.CTA,
        },
      };
    } else if (step === activeStep) {
      // Active step
      return {
        container: {
          backgroundColor: '#545664',
          padding: mScale.md,
          borderRadius: 7,
        },
        text: {
          color: '#F4F5F5',
        },
        circleBackground: {
          backgroundColor: colorPresets.PRIMARY,
        },
        circleText: {
          color: '#fff',
        },
      };
    } else {
      // Inactive step
      return {
        container: {
          backgroundColor: 'transparent',
          padding: mScale.md,
          borderRadius: 7,
          borderWidth: 0.7,
          borderColor: colorPresets.GRAY3,
        },
        text: {
          color: '#F4F5F5',
        },
        circleBackground: {
          backgroundColor: 'rgba(255,255,255,0.1)',
        },
        circleText: {
          color: '#F4F5F5',
        },
      };
    }
  };

  return (
    <ScrollViewAtom horizontal={true} style={{height: 50, paddingEnd: 50}}>
      <View style={[commonStyle.flexStart, {paddingLeft: mScale.base}]}>
        {[1, 2, 3].map(step => {
          const styles = getStepStyle(step);
          return (
            <React.Fragment key={step}>
              <View style={[commonStyle.flexStart, styles.container]}>
                <View
                  style={{
                    width: mScale.base,
                    height: mScale.base,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...styles.circleBackground,
                  }}>
                  {step < activeStep ? (
                    // <IconButtonAtom2 iconName="checkmark" size={10} color={styles.circleText.color} />
                    <Images.SVG.RightTickIcon />
                  ) : (
                    <TextAtom
                      text={String(step)}
                      preset="xSmall"
                      color={styles.circleText.color}
                    />
                  )}
                </View>
                <TextAtom
                  text={
                    step === 1
                      ? 'Order details'
                      : step === 2
                      ? 'Billing'
                      : 'Payment'
                  }
                  preset="title"
                  color={styles.text.color}
                  style={{marginStart: mScale.md}}
                />
              </View>
              {step < 3 && (
                <View
                  style={{
                    width: 20,
                    height: 1,
                    backgroundColor: '#CBCBCF',
                    marginHorizontal: mScale.md,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </ScrollViewAtom>
  );
};
