
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Login',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: 'white',
        }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ 
          title: 'Sign Up',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: 'white',
        }} 
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{ 
          title: 'Reset Password',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: 'white',
        }} 
      />
    </Stack>
  );
}
