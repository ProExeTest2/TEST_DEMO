import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login";
import SignUp from "../screen/SignUp";
import SplashScreen from "../screen/SplashScreen";
import Home from "../screen/Home";
import ReAuthenticate from "../screen/ReAuthentication";

const Stack = createNativeStackNavigator();

const UserLogin = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{
          title: "SignUp",
          headerStyle: {
            backgroundColor: "#307ecc",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#307ecc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ReAuthenticate"
          component={ReAuthenticate}
          options={{
            title: "ReAuthenticate",
            headerStyle: {
              backgroundColor: "#307ecc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        {/* <Stack.Screen name="" component={}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
