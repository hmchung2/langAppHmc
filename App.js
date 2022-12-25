import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  TouchableOpacity,
  PanResponder,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

const AnimatedCard = Animated.createAnimatedComponent(Card);

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn(),

      onPanResponderRelease: () => {
        Animated.parallel([
          onPressOut,
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;

  const position = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  return (
    <Container>
      <Card
        {...panResponder.panHandlers}
        style={{ transform: [{ scale: scale }, { translateX: position }] }}
      >
        <Ionicons size={98} name="pizza" color="#192a56" />
      </Card>
    </Container>
  );
}
