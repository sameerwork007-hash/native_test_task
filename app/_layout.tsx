import { Stack } from 'expo-router';

/**
 * Root layout component for Expo Router.
 * Configures the navigation stack for the app.
 */
export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#007AFF',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: '600',
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: 'Create Memory',
                }}
            />
            <Stack.Screen
                name="success"
                options={{
                    title: 'Success',
                    headerBackVisible: false,
                }}
            />
        </Stack>
    );
}
