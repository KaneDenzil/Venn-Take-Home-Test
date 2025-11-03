import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

type Props = { title: string; children: React.ReactNode };

export const FormTemplate: React.FC<Props> = ({ title, children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <ScrollView contentContainerStyle={{ padding: spacing.xl }} keyboardShouldPersistTaps="handled">
        <View style={{ width: '100%', alignSelf: 'center' }}>
          <Text style={[typography.h1, { color: colors.text, textAlign: 'center', marginBottom: spacing.xl }]}>
            {title}
          </Text>
          <View>
            {children}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
