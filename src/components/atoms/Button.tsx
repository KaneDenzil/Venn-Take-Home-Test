import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { scaleHeight, scaleWidth, scaleFont } from '../../constants/responsive';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  testID?: string;
};

export const Button: React.FC<Props> = ({
  title, onPress, disabled, loading, variant='primary', fullWidth=true, testID,
}) => {
  const baseStyle = {
    height: scaleHeight(56),
    paddingHorizontal: spacing.xl,
    borderRadius: scaleWidth(18),
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: variant === 'secondary' ? 1 : 0,
    borderColor: colors.border,
    backgroundColor: variant === 'primary' ? colors.primary : colors.surface,
    opacity: disabled ? 0.6 : 1,
    flexDirection: 'row' as const,
    width: fullWidth ? ('100%' as const) : undefined,
  };

  const textStyle = {
    color: variant === 'primary' ? '#fff' : colors.text,
    fontWeight: '700' as const,
    fontSize: scaleFont(18),
  };

  return (
    <Pressable accessibilityRole="button" testID={testID} onPress={onPress} disabled={disabled || loading} style={baseStyle}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : colors.text} />
      ) : (
        <>
          <Text style={textStyle}>{title}</Text>
          <View style={{ width: scaleWidth(8) }} />
          <Ionicons name="arrow-forward" size={scaleWidth(20)} color={variant === 'primary' ? '#fff' : colors.text} />
        </>
      )}
    </Pressable>
  );
};
