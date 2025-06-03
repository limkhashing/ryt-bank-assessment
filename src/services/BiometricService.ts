import * as LocalAuthentication from 'expo-local-authentication';

export interface BiometricAuthResult {
  success: boolean;
  error?: string;
}

class BiometricService {
  async isBiometricAvailable(): Promise<boolean> {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      return hasHardware && isEnrolled;
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return false;
    }
  }

  async authenticate(promptMessage: string): Promise<BiometricAuthResult> {
    try {
      const isBiometricAvailable = await this.isBiometricAvailable();

      if (!isBiometricAvailable) {
        // If biometrics not available, we'll handle PIN authentication in the UI
        return {
          success: false,
          error: 'BIOMETRIC_NOT_AVAILABLE'
        };
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel: 'Use PIN',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false, // This allows fallback to device passcode
      });

      return {
        success: result.success,
        error: result.success ? undefined : 'BIOMETRIC_FAILED'
      };
    } catch (error) {
      console.error('Authentication error:', error);
      return {
        success: false,
        error: 'AUTHENTICATION_ERROR'
      };
    }
  }
}

export const biometricService = new BiometricService();