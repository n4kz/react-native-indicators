import React, { useEffect, useState } from 'react'
import { Animated, View } from 'react-native';

const LinearIndicator = ({trackWidth=500,animationDuration=1100,height=16,color='rgb(76,208,56)',borderWidth=1,borderColor='rgb(76,208,56)',indicatorColor="rgb(17, 139, 11)",width=450,indicatorWidth=50,indicatorHeight=16}) => {
  const leftValue=useState(new Animated.Value(0))[0]
  
  useEffect(() => {Animated.loop(
    Animated.timing(leftValue, {
      toValue: trackWidth,
      duration: animationDuration,
      useNativeDriver: true,
    })).start()
  }, []);
  
  return (
    <View style={{ width: width,
      height: height,
      backgroundColor: color,
      borderWidth: borderWidth,
      borderColor:borderColor,
      opacity:0.7
    }}>
    <Animated.View
      style={[{
        width: indicatorWidth,
        height: indicatorHeight,
        transform: [{ translateX: leftValue }],
        borderRadius: 2,
        backgroundColor: indicatorColor,
        
    }]}>
      </Animated.View>
      </View>
  )
}

export default LinearIndicator