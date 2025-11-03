import React from 'react';
import { Text } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { scaleHeight } from '../../constants/responsive';

export const HelperText: React.FC<{ text?: string; tone?: 'muted' | 'danger' | 'success' }> = ({ text, tone = 'muted' }) => {
  if (!text) return null;
  const color = tone === 'danger' ? colors.danger : tone === 'success' ? colors.success : colors.muted;
  return <Text style={[typography.helper, { color, marginTop: scaleHeight(8) }]}>{text}</Text>;
};
