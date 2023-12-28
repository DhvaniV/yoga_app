import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from './Screens/WelcomeScreen';
import yogaList from './Screens/yogaList';
import {Provider} from 'react-redux';
import store from './redux/store';
import CategoryDetail from './Screens/CategoryDetail';
import LevelPoses from './Screens/LevelPoses';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} 
           options={{ headerShown: false }}/>
          <Stack.Screen name="yogaList" component={yogaList} 
           options={{ headerShown: false }}/>
          <Stack.Screen name = "CategoryDetail" component={CategoryDetail}
           options={{ headerShown: false }} />
             <Stack.Screen name = "LevelPoses" component={LevelPoses}
           options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
