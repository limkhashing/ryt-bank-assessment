import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Transaction, TransactionStatus } from '../types';
import { Button, Card, Loading } from '../components';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks';
import { formatCurrency, generateTransactionId } from '../utils';
import { biometricService } from '../services/BiometricService';
import { addTransaction } from '../store';
import { updateBalance } from '../store';
import { transferService } from "../services";

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmTransfer'>;

export const ConfirmTransferScreen: React.FC<Props> = ({ navigation, route }) => {
  const { amount, recipient, note } = route.params;
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  const handleConfirmTransfer = async () => {
    try {
      setLoading(true);

      // Biometric authentication
      // const biometricResult = await biometricService.authenticate(
      //   'Authenticate to confirm transfer'
      // );

      // if (!biometricResult.success) {
      //   Alert.alert('Authentication Failed', biometricResult.error || 'Please try again');
      //   return;
      // }

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
      console.error('Transfer error:', error);
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

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Balance After Transfer:</Text>
          <Text style={[
            styles.value,
            { color: COLORS.primary }
          ]}>
            {formatCurrency((currentUser?.balance || 0) - amount)}
          </Text>
        </View>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          variant="outline"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        />
        <Button
          title="Confirm Transfer"
          onPress={handleConfirmTransfer}
          style={styles.confirmButton}
        />
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  cancelButton: {
    flex: 0.5,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: COLORS.success,
    marginHorizontal: SPACING.xs,
  },
});
