import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Contacts from 'expo-contacts';
import { RootStackParamList, Recipient } from '../types';
import { Button, Card, Input, Loading } from '../components';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { Logger } from '../utils/Logger';

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

export const ContactsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { amount, note } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Recipient[]>([]);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestContactsPermission();
  }, []);

  const requestContactsPermission = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === 'granted') {
        await loadContacts();
      } else {
        Alert.alert(
          'Permission Required',
          'Please grant contacts permission to select a recipient from your contacts.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to access contacts. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadContacts = async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        sort: Contacts.SortTypes.FirstName,
      });

      const formattedContacts: Recipient[] = data
        .filter(contact => contact.name && contact.phoneNumbers?.[0]?.number && contact.id)
        .map(contact => ({
          id: contact.id!,
          name: contact.name,
          phoneNumber: contact.phoneNumbers![0].number,
        }));

      setContacts(formattedContacts);
    } catch (error) {
      Logger.error('Error loading contacts', error);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.phoneNumber && contact.phoneNumber.includes(searchQuery))
  );

  const handleSelectContact = useCallback((contact: Recipient) => {
    navigation.navigate('ConfirmTransfer', {
      recipient: contact,
      amount,
      note,
    });
  }, [navigation, amount, note]);

  const renderContactItem = useCallback(({ item }: { item: Recipient }) => (
    <TouchableOpacity
      onPress={() => handleSelectContact(item)}
      style={styles.contactItem}
    >
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactPhone}>{item.phoneNumber}</Text>
    </TouchableOpacity>
  ), [handleSelectContact]);

  if (loading) {
    return <Loading message="Loading contacts..." />;
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Contacts Permission Required</Text>
          <Text style={styles.emptyStateSubtext}>
            We need access to your contacts to help you select a recipient
          </Text>
          <Button
            title="Grant Permission"
            onPress={requestContactsPermission}
            style={styles.permissionButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.searchCard}>
        <Input
          placeholder="Search contacts"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </Card>

      {filteredContacts.length > 0 ? (
        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No Contacts Found</Text>
          <Text style={styles.emptyStateSubtext}>
            Try searching with a different term
          </Text>
        </View>
      )}
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
  permissionButton: {
    marginTop: SPACING.lg,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: SPACING.lg,
  },
  contactItem: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  contactPhone: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
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
});
