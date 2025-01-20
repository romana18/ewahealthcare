import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Error reading token:', error);
        setIsAuthenticated(false);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Show a blank screen while checking authentication
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="index" options={{ headerShown: false }} />
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
