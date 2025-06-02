import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { BiometricAuthResult } from '../types';
import { Logger } from '../utils';

const rnBiometrics = new ReactNativeBiometrics();

export const BiometricService = {
  async isBiometricAvailable(): Promise<boolean> {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      return available && (biometryType === BiometryTypes.TouchID || biometryType === BiometryTypes.FaceID || biometryType === BiometryTypes.Biometrics);
    } catch (error) {
      Logger.error('Failed to check biometric availability', error);
      return false;
    }
  },

  async authenticate(): Promise<BiometricAuthResult> {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to confirm transfer',
        cancelButtonText: 'Cancel',
      });

      return { success };
    } catch (error) {
      Logger.error('Biometric authentication failed', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      };
    }
  },
};
