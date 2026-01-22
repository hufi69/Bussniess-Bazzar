import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FlashMessage from "react-native-flash-message";
import { AppNavigator } from './src/navigation';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AppNavigator />
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
