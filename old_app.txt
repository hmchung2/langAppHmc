import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  TouchableOpacity,
  PanResponder,
} from "react-native";
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
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  // console.log("up : ", up);
  // console.log("y : ", POSITION);

  const rotation = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99 , 71)", "rgb(71 , 166 , 255)"],
  });

  // POSITION.addListener(() => console.log(opacityValue));
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        POSITION.setOffset({
          x: POSITION.x._value,
          y: POSITION.y._value,
        });
      },
      onPanResponderMove: (_, { dx, dy }) => {
        POSITION.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderRelease: () => {
        POSITION.flattenOffset();
      },
    })
  ).current;

  return (
    <Container>
      <Pressable
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <AnimatedBox
          {...panResponder.panHandlers}
          style={{
            borderRadius: borderRadius,
            backgroundColor: bgColor,
            transform: [...POSITION.getTranslateTransform()],
          }}
        />
      </Pressable>
    </Container>
  );
}
