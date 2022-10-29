import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function BlockRGB(props) {
 return (
   <View
     style={{
       backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
       padding: 50,
       width: Dimensions.get("window").width/4,
     }}
   ></View>
 );
}
