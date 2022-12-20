import React, { useRef, useState } from "react";
import { Animated, Pressable, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(300)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    console.log("touched");
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: true,
      duration: 3000,
    }).start(toggleUp);
  };

  // console.log("up : ", up);
  // console.log("y : ", Y_POSITION);

  const opacityValue = Y_POSITION.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0, 1],
  });

  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  Y_POSITION.addListener(() => console.log(opacityValue));

  return (
    <Container>
      <Pressable
        onPress={moveUp}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <AnimatedBox
          style={{
            opacity: opacityValue,
            borderRadius: borderRadius,
            transform: [{ translateY: Y_POSITION }],
          }}
        />
      </Pressable>
    </Container>
  );
}
