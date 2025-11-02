import React from 'react';
import { Text } from 'react-native';
import { colors } from '../../design/colors';
import { typography } from '../../design/typography';
import { scaleHeight } from '../../design/responsive';

export const HelperText: React.FC<{ text?: string; tone?: 'muted' | 'danger' | 'success' }> = ({ text, tone='muted' }) => {
  if (!text) return null;
  const color = tone === 'danger' ? colors.danger : tone === 'success' ? colors.success : colors.muted;
  return <Text style={[typography.helper, { color, marginTop: scaleHeight(8) }]}>{text}</Text>;
};
