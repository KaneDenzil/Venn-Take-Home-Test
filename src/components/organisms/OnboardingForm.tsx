import React, { useCallback } from 'react';
import { View, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema, OnboardingForm as OnboardingFormType } from '../../domain/onboarding/schema';
import { spacing } from '../../design/spacing';
import { TextField } from '../molecules/TextField';
import { Button } from '../atoms/Button';
import { useCorpNumberCheck } from '../../hooks/useCorpNumberCheck';
import { submitProfile } from '../../domain/onboarding/api';

export const OnboardingForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors, isValid, isSubmitting }, getValues, setError, trigger } =
    useForm<OnboardingFormType>({
      resolver: zodResolver(onboardingSchema),
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      defaultValues: { firstName: '', lastName: '', phone: '', corporationNumber: '' },
    });

  const { status: corpStatus, message: corpMessage, check } = useCorpNumberCheck();

  const onBlurCorp = useCallback(async () => {
    const value = getValues('corporationNumber');
    const ok = await check(value);
    if (!ok) {
      setError('corporationNumber', { message: corpMessage || 'Invalid Corporation Number' });
    } else {
      await trigger('corporationNumber');
    }
  }, [check, corpMessage, getValues, setError, trigger]);

  const onSubmit = handleSubmit(async (vals) => {
    const ok = await check(vals.corporationNumber);
    if (!ok) {
      setError('corporationNumber', { message: corpMessage || 'Invalid Corporation Number' });
      return;
    }
    try {
      await submitProfile(vals);
      Alert.alert('Success', 'Profile submitted successfully.');
    } catch (e: any) {
      Alert.alert('Submission failed', e?.message || 'Unknown error');
    }
  });

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: spacing.xl }}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="First Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder=""
                autoCapitalize="words"
                returnKeyType="next"
                error={errors.firstName?.message}
                testID="firstNameInput"
              />
            )}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Last Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder=""
                autoCapitalize="words"
                returnKeyType="next"
                error={errors.lastName?.message}
                testID="lastNameInput"
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Phone Number"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="phone-pad"
            placeholder="+14165551234"
            autoCapitalize="none"
            returnKeyType="next"
            error={errors.phone?.message}
            testID="phoneInput"
          />
        )}
      />

      <Controller
        control={control}
        name="corporationNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Corporation Number"
            value={value}
            onChangeText={onChange}
            onBlur={async () => { onBlur(); await onBlurCorp(); }}
            keyboardType="number-pad"
            placeholder=""
            autoCapitalize="none"
            returnKeyType="done"
            error={errors.corporationNumber?.message || (corpStatus === 'invalid' || corpStatus === 'error'
              ? (corpMessage || 'Invalid Corporation Number')
              : undefined)}
            helperText={corpStatus === 'checking' ? 'Validating…' : undefined}
            testID="corpInput"
          />
        )}
      />

      <Button
        title="Submit"
        onPress={onSubmit}
        disabled={!isValid || isSubmitting || corpStatus === 'checking'}
        loading={isSubmitting}
        testID="submitButton"
        fullWidth
      />
    </>
  );
};
