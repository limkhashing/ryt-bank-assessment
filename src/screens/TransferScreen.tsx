import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Button, Card, Input } from '../components';
import { COLORS, SPACING } from '../constants';
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
    if (value <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
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
      <Card style={styles.balanceCard}>
        <Input
          label="Available Balance"
          value={currentUser ? formatCurrency(currentUser.balance) : 'RM0.00'}
          onChangeText={() => {}}
          style={styles.input}
        />
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
  balanceCard: {
    marginBottom: SPACING.xl,
  },
  input: {
    marginBottom: SPACING.md,
  },
  button: {
    marginTop: 'auto',
  },
});
