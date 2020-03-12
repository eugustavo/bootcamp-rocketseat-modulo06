import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import RepoStar from './pages/RepoStar';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      headerBackTitleVisible={false}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: 'Usuários',
        }}
      />

      <Stack.Screen
        name="User"
        component={User}
        options={({ route }) => ({ title: route.params.user.name })}
      />

      <Stack.Screen
        name="RepoStar"
        component={RepoStar}
        options={({ route }) => ({ title: route.params.repo.name })}
      />
    </Stack.Navigator>
  );
}
// ({ route }) => ({ title: route.params.user.name })
