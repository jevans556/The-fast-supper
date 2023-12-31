import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import react from 'react';
//tell React that we will implement a navigator
import { NavigationContainer } from "@react-navigation/native";
//create a stack navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/loginscreen";
import SignupScreen from "./components/signupscreen";
import HomeScreen from "./components/homescreen";
import ForgotScreen from "./components/forgotscreen";
import Settings from "./components/settings/settings";
import ChangePassword from "./components/settings/changepassword";
import VisitedScreen from "./components/visitedscreen";
import LikedScreen from "./components/likedscreen";
import ShowScreen from './components/showRes';
import ReviewScreen from './components/writeReview';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="Forgot" component={ForgotScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Visited" component={VisitedScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Liked" component={LikedScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Show" component={ShowScreen} options={{headerShown:false}} />
        <Stack.Screen name="Review" component={ReviewScreen} options={{headerShown:false}} />
      </Stack.Navigator>
  
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Anthony is sexy AF!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
