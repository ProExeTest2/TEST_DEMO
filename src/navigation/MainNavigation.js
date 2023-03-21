import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login";
import SplashScreen from "../screen/SplashScreen";
import Home from "../screen/Home";
import AddTodo from "../screen/AddTodo";
import Todo from "../screen/Todo";
import MyFiles from "../screen/MyFiles";
import UserData from "../screen/UserData";

const Stack = createNativeStackNavigator();

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
          name="Login"
          component={Login}
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
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="AddTodo" component={AddTodo} />
        <Stack.Screen name="MyFiles" component={MyFiles} />
        <Stack.Screen name="UserData" component={UserData} />
        {/* <Stack.Screen name="" component={}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
