import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Transaction, TransactionStatus } from '../types';
import { Button, Card, Loading } from '../components';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks';
import { formatCurrency, generateTransactionId } from '../utils';
import { Logger } from '../utils/Logger';
import { addTransaction } from '../store';
import { updateBalance } from '../store';
import { transferService } from "../services";
import { biometricService } from "../services/BiometricService";

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmTransfer'>;

export const ConfirmTransferScreen: React.FC<Props> = ({ navigation, route }) => {
  const { amount, recipient, note } = route.params;
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState('');
  const PIN_CODE = '123456'; // In a real app, this should be stored securely and cross checked with backend

  const handleAuthentication = async () => {
    try {
      setLoading(true);
      const biometricResult = await biometricService.authenticate(
        'Authenticate to confirm transfer'
      );

      if (biometricResult.success) {
        // Biometric authentication successful
        await processTransfer();
        return
      }

      if (biometricResult.error === 'BIOMETRIC_NOT_AVAILABLE') {
        // Fallback to PIN authentication
        setShowPinInput(true);
        setLoading(false);
        return
      }

      // Biometric authentication failed
      Alert.alert(
          'Authentication Failed',
          'Biometric authentication failed. Please try again or use PIN.',
          [
            { text: 'Try Again', onPress: () => handleAuthentication() },
            { text: 'Use PIN', onPress: () => setShowPinInput(true) }
          ]
      );
      setLoading(false);
    } catch (error) {
      Logger.error('Authentication error', error);
      setLoading(false);
      Alert.alert('Error', 'Authentication failed. Please try again.');
    }
  };

  const handlePinSubmit = async () => {
    if (pin === PIN_CODE) {
      await processTransfer();
    } else {
      Alert.alert('Error', 'Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  const processTransfer = async () => {
    try {
      setLoading(true);
      // Create transaction object
      const transaction: Transaction = {
        id: generateTransactionId(),
        amount: amount,
        recipient: recipient,
        date: new Date().toISOString(),
        note: note,
        status: TransactionStatus.PENDING,
      };

      // Simulate API call
      const result = await transferService.processTransfer(transaction);

      // Update transaction status based on API response
      if (result.success && result.data) {
        transaction.status = result.data.status;
      } else {
        transaction.status = TransactionStatus.FAILED;
      }

      // Update Redux state
      dispatch(addTransaction(transaction));
      // Only deduct balance if transfer was successful
      if (currentUser && transaction.status === TransactionStatus.COMPLETED) {
        dispatch(updateBalance(currentUser.balance - amount));
      }

      // Navigate to receipt screen
      navigation.replace('Receipt', { transaction });
    } catch (error) {
      Logger.error('Transfer error', error);
      Alert.alert(
        'Transfer Failed',
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Processing transfer..." />;
  }

  if (showPinInput) {
    return (
      <View style={styles.container}>
        <Card style={styles.detailsCard}>
          <Text style={styles.title}>Enter PIN</Text>
          <TextInput
            style={styles.pinInput}
            value={pin}
            onChangeText={setPin}
            placeholder="Enter your 6 digit PIN"
            keyboardType="numeric"
            secureTextEntry
            maxLength={6}
          />
          <View style={styles.buttonContainer}>
            <Button title="Submit PIN" onPress={handlePinSubmit} />
            <Button
                title="Cancel"
                onPress={() => navigation.goBack()}
                variant="outline"
            />
          </View>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.detailsCard}>
        <Text style={styles.title}>Confirm Transfer</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{formatCurrency(amount)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>To:</Text>
          <Text style={styles.value}>{recipient.name}</Text>
        </View>

        {note && (
          <View style={styles.row}>
            <Text style={styles.label}>Note:</Text>
            <Text style={styles.value}>{note}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Confirm Transfer" onPress={handleAuthentication} />
          <Button 
            title="Cancel" 
            onPress={() => navigation.goBack()} 
            variant="outline"
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  detailsCard: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  buttonContainer: {
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  cancelButton: {
    flex: 0.5,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: COLORS.success,
    marginHorizontal: SPACING.xs,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    marginVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    width: '100%',
  },
});
