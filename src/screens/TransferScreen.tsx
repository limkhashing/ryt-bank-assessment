import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Button, Card, Input } from '../components';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { useAppSelector } from '../hooks';
import { formatCurrency } from '../utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Transfer'>;

export const TransferScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser } = useAppSelector(state => state.user);
  const [amount, setAmount] = useState('');
  const [displayAmount, setDisplayAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = useCallback((text: string) => {
    // Remove all non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Convert to number with 2 decimal places
    const numberValue = parseInt(numericValue || '0', 10) / 100;
    
    // Validate amount
    if (numberValue > 999999.99) {
      setError('Amount cannot exceed RM999,999.99');
      return;
    }

    const formattedAmount = numberValue.toFixed(2);
    setAmount(formattedAmount);
    setDisplayAmount(formattedAmount === '0.00' ? '' : `RM${formattedAmount}`);
    validateAmount(numberValue);
  }, []);

  const validateAmount = (value: number) => {
    if (currentUser && value > currentUser.balance) {
      setError('Insufficient funds');
      return false;
    }
    setError('');
    return true;
  };

  const handleContinue = () => {
    const numericAmount = parseFloat(amount);
    if (!validateAmount(numericAmount)) return;
    navigation.navigate('SelectRecipient');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.userInfoCard}>
        <Text style={styles.userTitle}>From Account</Text>
        <Text style={styles.userName}>{currentUser?.name}</Text>
        <Text style={styles.userPhone}>{currentUser?.phoneNumber}</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceLabel}>Available Balance:</Text>
          <Text style={styles.balanceAmount}>
            {currentUser ? formatCurrency(currentUser.balance) : 'RM0.00'}
          </Text>
        </View>
      </Card>

      <Card style={styles.transferCard}>
        <Input
          label="Amount"
          value={displayAmount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
          placeholder="RM0.00"
          error={error}
          style={styles.input}
        />
        <Input
          label="Note (Optional)"
          value={note}
          onChangeText={setNote}
          placeholder="What's this transfer for?"
          style={styles.input}
        />
      </Card>
      
      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={!amount || parseFloat(amount) <= 0 || !!error}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  userInfoCard: {
    marginBottom: SPACING.md,
  },
  userTitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  userName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  userPhone: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  balanceLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  balanceAmount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.success,
  },
  transferCard: {
    marginBottom: SPACING.xl,
  },
  input: {
    marginBottom: SPACING.md,
  },
  button: {
    marginTop: 'auto',
  },
});
