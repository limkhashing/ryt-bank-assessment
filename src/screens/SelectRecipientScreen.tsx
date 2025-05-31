import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Recipient } from '../types';
import { Button, Card, Input } from '../components';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectRecipient'>;

const RECENT_RECIPIENTS: Recipient[] = [
  { id: '1', name: 'Luffy', phoneNumber: '+6016-593 5703', isRecent: true },
  { id: '2', name: 'Han Tham', phoneNumber: '+6012-345 6789', isRecent: true },
];

export const SelectRecipientScreen: React.FC<Props> = ({ navigation, route }) => {
  const { amount, note } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  
  const filteredRecipients = RECENT_RECIPIENTS.filter(recipient =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (recipient.phoneNumber && recipient.phoneNumber.includes(searchQuery))
  );

  const handleSelectRecipient = useCallback((recipient: Recipient) => {
    setSelectedRecipient(recipient);
  }, []);

  const handlePickContact = () => {
    navigation.navigate('Contacts', {
      amount,
      note,
    });
  };

  const handleContinue = useCallback(() => {
    if (selectedRecipient) {
      navigation.navigate('ConfirmTransfer', {
        recipient: selectedRecipient,
        amount,
        note,
      });
    }
  }, [navigation, selectedRecipient, amount, note]);

  const renderRecipientItem = useCallback(({ item }: { item: Recipient }) => (
    <TouchableOpacity
      onPress={() => handleSelectRecipient(item)}
      style={[
        styles.recipientItem,
        selectedRecipient?.id === item.id && styles.selectedRecipient,
      ]}
    >
      <View style={styles.recipientInfo}>
        <Text style={styles.recipientName}>{item.name}</Text>
        <Text style={styles.recipientDetail}>
          {item.phoneNumber}
        </Text>
      </View>
      <Text style={styles.recentBadge}>Recent</Text>
    </TouchableOpacity>
  ), [selectedRecipient]);

  return (
    <View style={styles.container}>
      <Card style={styles.searchCard}>
        <Input
          placeholder="Search recent recipients"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          autoCapitalize="words"
        />
      </Card>

      <View style={styles.contactButtonContainer}>
        <Button
          title="Select from Contacts"
          onPress={handlePickContact}
          variant="outline"
          style={styles.contactButton}
        />
      </View>

      <Text style={styles.sectionTitle}>Recent Recipients</Text>
      <FlatList
        data={filteredRecipients}
        renderItem={renderRecipientItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={!selectedRecipient}
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
  searchCard: {
    marginBottom: SPACING.md,
  },
  searchInput: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginVertical: SPACING.md,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: SPACING.lg,
  },
  recipientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedRecipient: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}10`,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  recipientDetail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  recentBadge: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyStateText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptyStateSubtext: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  button: {
    marginTop: 'auto',
  },
  contactButtonContainer: {
    marginBottom: SPACING.md,
  },
  contactButton: {
    marginVertical: SPACING.sm,
  },
});
