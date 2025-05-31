import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Recipient } from '../types';
import { Button, Card, Input, Loading } from '../components';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { useAppSelector } from '../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectRecipient'>;

const MOCK_RECIPIENTS: Recipient[] = [
  { id: '1', name: 'Kha Shing', phoneNumber: '+6016-593 5703', isRecent: true },
  { id: '2', name: 'Han Tham', phoneNumber: '+6012-345 6789', isRecent: true },
  { id: '3', name: 'Melvin Ooi', phoneNumber: '+6019-876-543' },
];

export const SelectRecipientScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipients] = useState<Recipient[]>(MOCK_RECIPIENTS);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [newRecipientName, setNewRecipientName] = useState('');

  const filteredRecipients = recipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectRecipient = useCallback((recipient: Recipient) => {
    setSelectedRecipient(recipient);
  }, []);

  const handleContinue = useCallback(() => {
    if (selectedRecipient) {
      navigation.navigate('ConfirmTransfer', {
        recipient: selectedRecipient,
        amount: 0, // This will be updated with the actual amount
        note: '',
      });
    }
  }, [navigation, selectedRecipient]);

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
          {item.phoneNumber || item.email}
        </Text>
      </View>
      {item.isRecent && (
        <Text style={styles.recentBadge}>Recent</Text>
      )}
    </TouchableOpacity>
  ), [selectedRecipient]);

  if (loading) {
    return <Loading message="Loading recipients..." />;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.searchCard}>
        <Input
          placeholder="Search recipients"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </Card>

      <Text style={styles.sectionTitle}>Recipients</Text>
      <FlatList
        data={filteredRecipients}
        renderItem={renderRecipientItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <Card style={styles.newRecipientCard}>
        <Input
          placeholder="Enter new recipient name"
          value={newRecipientName}
          onChangeText={setNewRecipientName}
        />
      </Card>

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
  newRecipientCard: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  button: {
    marginTop: 'auto',
  },
});
