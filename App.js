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
  margin-bottom: 10px;
  position: absolute;
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 15px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const AnimatedCard = Animated.createAnimatedComponent(Card);

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;

  const position = useRef(new Animated.Value(1)).current;

  const rotation = position.interpolate({
    inputRange: [-100, 100],
    outputRange: ["-15deg", "15deg"],
    extrapolate: "clamp",
  });

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const secondScale = position.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: [1, 0.5, 1],
    extrapolate: "clamp",
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  const goLeft = Animated.spring(position, {
    toValue: -400,
    useNativeDriver: true,
    tension: 5,
  });

  const goRight = Animated.spring(position, {
    toValue: 400,
    useNativeDriver: true,
    tension: 5,
  });

  const closePress = () => {
    goLeft.start();
  };

  const checkPress = () => {
    goRight.start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn(),

      onPanResponderRelease: (_, { dx }) => {
        if (dx < -150) {
          console.log("dismiss to the left");
          goLeft.start();
        } else if (dx > 150) {
          console.log("dismis to the right");
          goRight.start();
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;

  return (
    <Container>
      <CardContainer>
        <Card style={{ transform: [{ scale: secondScale }] }}>
          <Ionicons size={98} name="beer" color="#192a56" />
        </Card>

        <Card
          {...panResponder.panHandlers}
          style={{
            transform: [
              { scale: scale },
              { translateX: position },
              { rotateZ: rotation },
            ],
          }}
        >
          <Ionicons size={98} name="pizza" color="#192a56" />
        </Card>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name="close-circle" color="white" size={58} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name="checkmark-circle" color="white" size={58} />
        </Btn>
      </BtnContainer>
    </Container>
  );
}
