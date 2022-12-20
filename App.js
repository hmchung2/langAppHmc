import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(0)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    console.log("touched");
    Animated.timing(Y_POSITION, {
      toValue: up ? 100 : -100,
      useNativeDriver: true,
    }).start(toggleUp);
  };

  Y_POSITION.addListener(() => console.log(Y_POSITION));
  console.log("up : ", up);
  console.log("y : ", Y_POSITION);

  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox
          style={{
            transform: [{ translateY: Y_POSITION }],
          }}
        />
      </TouchableOpacity>
    </Container>
  );
}
