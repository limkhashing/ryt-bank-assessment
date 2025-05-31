import React from 'react';
import { View, StyleSheet, Text, Animated, BackHandler } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Button, Card } from '../components';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { formatCurrency, formatDate } from '../utils';

type Props = NativeStackScreenProps<RootStackParamList, 'TransferStatus'>;

export const TransferStatusScreen: React.FC<Props> = ({ navigation, route }) => {
  const { transaction } = route.params;
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Start animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();

    // Handle hardware back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleDone();
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const handleDone = () => {
    // Reset navigation stack to Transfer screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Transfer' }],
    });
  };

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'completed':
        return COLORS.success;
      case 'failed':
        return COLORS.error;
      default:
        return COLORS.primary;
    }
  };

  const getStatusMessage = () => {
    switch (transaction.status) {
      case 'completed':
        return 'Transfer Successful!';
      case 'failed':
        return 'Transfer Failed';
      default:
        return 'Transfer Pending';
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
        <Card style={styles.statusCard}>
          <View style={[styles.statusIcon, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusEmoji}>
              {transaction.status === 'completed' ? '✓' : '×'}
            </Text>
          </View>

          <Text style={styles.statusTitle}>{getStatusMessage()}</Text>

          <View style={styles.divider} />

          <View style={styles.detailsContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Amount</Text>
              <Text style={styles.value}>{formatCurrency(transaction.amount)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>To</Text>
              <Text style={styles.value}>{transaction.recipient.name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{formatDate(transaction.date)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Transaction ID</Text>
              <Text style={styles.value}>{transaction.id}</Text>
            </View>

            {transaction.note && (
              <View style={styles.row}>
                <Text style={styles.label}>Note</Text>
                <Text style={styles.value}>{transaction.note}</Text>
              </View>
            )}
          </View>
        </Card>

        <Button
          title="Done"
          onPress={handleDone}
          style={styles.button}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
  },
  statusCard: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  statusIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statusEmoji: {
    fontSize: FONT_SIZES.xxl,
    color: COLORS.surface,
  },
  statusTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    width: '100%',
    marginVertical: SPACING.md,
  },
  detailsContainer: {
    width: '100%',
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
    flex: 1,
    textAlign: 'right',
    marginLeft: SPACING.md,
  },
  button: {
    marginTop: SPACING.xl,
  },
});
