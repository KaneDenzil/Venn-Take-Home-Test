import React from 'react';
import type { TextInputProps } from 'react-native';
import { View, TextInput } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { scaleHeight, scaleWidth } from '../../constants/responsive';
import { HelperText } from '../atoms/HelperText';
import { Label } from '../atoms/Label';

type Props = TextInputProps & {
  label: string;
  error?: string;
  helperText?: string;
  testID?: string;
};

export const TextField: React.FC<Props> = ({ label, error, helperText, style, testID, ...inputProps }) => {
  const borderColor = error ? colors.danger : colors.border;
  return (
    <View style={{ marginBottom: spacing.xl }}>
      <Label accessibilityLabel={`${label} label`} style={{ marginBottom: scaleHeight(8), color: colors.text }}>{label}</Label>
      <TextInput
        testID={testID}
        placeholderTextColor={colors.muted}
        style={[{
          backgroundColor: colors.surface,
          color: colors.text,
          paddingHorizontal: spacing.lg,
          height: scaleHeight(52),
          borderRadius: scaleWidth(14),
          borderWidth: 1,
          borderColor
        }, style]}
        {...inputProps}
      />
      <HelperText text={error || helperText} tone={error ? 'danger' : 'muted'} />
    </View>
  );
};
