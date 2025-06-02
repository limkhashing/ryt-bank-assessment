import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Provider} from 'react-redux';

import {COLORS} from '../components/constants';
import {
    ConfirmTransferScreen,
    ContactsScreen,
    ReceiptScreen,
    SelectRecipientScreen,
    TransferScreen,
} from '../features/transfer/components';
import {store} from '../features/transfer/store';
import {RootStackParamList} from '../features/transfer/types';

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
