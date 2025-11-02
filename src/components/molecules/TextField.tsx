import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { colors } from '../../design/colors';
import { spacing } from '../../design/spacing';
import { scaleHeight, scaleWidth } from '../../design/responsive';
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
