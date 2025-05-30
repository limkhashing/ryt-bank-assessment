import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const validateAmount = (value: string) => {
    const numericAmount = parseFloat(value);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    if (currentUser && numericAmount > currentUser.balance) {
      setError('Insufficient funds');
      return false;
    }
    setError('');
    return true;
  };

  const handleContinue = () => {
    if (!validateAmount(amount)) return;
    navigation.navigate('SelectRecipient');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.balanceCard}>
        <Input
          label="Available Balance"
          value={currentUser ? formatCurrency(currentUser.balance) : '$0.00'}
          editable={false}
          style={styles.input}
        />
        <Input
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="$0.00"
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
        disabled={!amount || !!error}
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
