import { StatusBar } from "expo-status-bar";
import {React, useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";

function HomeScreen({navigation}) {
 const[colorArray, setColorArray] = useState([]);


 function renderItem({item}){
    return (
    <TouchableOpacity onPress={()=>navigation.navigate("Details", item)}>
      <BlockRGB red={item.red} green = {item.green} blue={item.blue}/>
    </TouchableOpacity>
    );
 }
 
 function addColor() {
  setColorArray([
    {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: `${colorArray.length}`,
    },
    ...colorArray,
  ]);
}
function resetColor(){
  setColorArray([]);
}

useEffect(()=>{
  navigation.setOptions({
    headerRight: ()=> <Button onPress={addColor} title="Add Color" />
  });
  navigation.setOptions({
    headerLeft: ()=> <Button onPress={resetColor} title="Reset" />
  });
})
 
 return (
   <View style={styles.container}>
     <TouchableOpacity
       style={{height:40, justifyContent:"center"}}
       onPress={addColor}
     >
       <Text style={{
         fontSize : 20,
         color: "red",
         fontWeight: "bold",
         }}>Add Color</Text>
     </TouchableOpacity>

     <FlatList
      data={colorArray}
      renderItem={renderItem}
      style={{width:"100%"}}
      numColumns={4}
     />

     <TouchableOpacity
       style={{height:40, justifyContent:"center"}}
       onPress={resetColor}
     >
       <Text style={{
         fontSize : 20,
         color: "red",
         fontWeight: "bold",
         }}>Reset</Text>
     </TouchableOpacity>
   </View>
 );
}

function DetailsScreen({route}){
  const {red, green, blue} = route.params;

  function calculateTotalColor(){
    const totalColor = red + green + blue;

    if(totalColor > 382){
      return "black";
    }else
      return "white";
  }

  return(
    <View
      style={[styles.container, {backgroundColor:`rgb(${red}, ${green}, ${blue})`}]} >
        <Text style={[styles.detailText, {color: calculateTotalColor()}]}>Red: {red}</Text>
        <Text style={[styles.detailText, {color: calculateTotalColor()}]}>Green: {green}</Text>
        <Text style={[styles.detailText, {color: calculateTotalColor()}]}>Blue: {blue}</Text>

    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="Details" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
 detailText:{
  fontSize: 30,
  marginBottom: 20,
 },
});

