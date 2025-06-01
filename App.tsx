import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { RootStackParamList } from './src/types';
import {
  TransferScreen,
  SelectRecipientScreen,
  ContactsScreen,
  ConfirmTransferScreen,
  ReceiptScreen,
} from './src/screens';
import { COLORS } from './src/constants';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Transfer"
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.surface,
            },
            headerShadowVisible: false,
            headerTintColor: COLORS.primary,
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen
            name="Transfer"
            component={TransferScreen}
            options={{ title: 'Send Money' }}
          />
          <Stack.Screen
            name="SelectRecipient"
            component={SelectRecipientScreen}
            options={{ title: 'Select Recipient' }}
          />
          <Stack.Screen
            name="Contacts"
            component={ContactsScreen}
            options={{ title: 'Select Contact' }}
          />
          <Stack.Screen
            name="ConfirmTransfer"
            component={ConfirmTransferScreen}
            options={{ title: 'Confirm Transfer' }}
          />
          <Stack.Screen
            name="Receipt"
            component={ReceiptScreen}
            options={{
              title: 'Receipt',
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}
