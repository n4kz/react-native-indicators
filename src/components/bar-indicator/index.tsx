import React, { PureComponent } from "react";
import { View, Animated } from "react-native";
import { BarIndicatorProps } from "../../types";
import Indicator from "../indicator";
import styles from "./styles";

export default class BarIndicator extends PureComponent<BarIndicatorProps> {
  static defaultProps: Partial<BarIndicatorProps> = {
    count: 3,
    color: "rgb(0, 0, 0)",
    size: 40,
  };

  constructor(props: BarIndicatorProps) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
  }

  private outputRange(
    base: number,
    index: number,
    count: number,
    samples: number
  ): number[] {
    const range = Array.from(
      new Array(samples),
      (item, index) =>
        base * Math.abs(Math.cos((Math.PI * index) / (samples - 1)))
    );

    for (let j = 0; j < index * (samples / count); j++) {
      range.unshift(range.pop()!);
    }

    range.unshift(...range.slice(-1));

    return range;
  }

  private renderComponent = ({
    index,
    count,
    progress,
  }: {
    index: number;
    count: number;
    progress: Animated.Value;
  }): React.ReactElement => {
    const {
      color: backgroundColor = "rgb(0, 0, 0)",
      size = 40,
      animationDuration = 1200,
    } = this.props;

    const frames = (60 * animationDuration) / 1000;
    let samples = 0;

    do samples += count;
    while (samples < frames);

    const inputRange = Array.from(
      new Array(samples + 1),
      (item, index) => index / samples
    );

    const width = Math.floor(size / 5),
      height = Math.floor(size / 2),
      radius = Math.ceil(width / 2);

    const containerStyle = {
      height: size,
      width: width,
      marginHorizontal: radius,
    };

    const topStyle = {
      width,
      height,
      backgroundColor,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      transform: [
        {
          translateY: progress.interpolate({
            inputRange,
            outputRange: this.outputRange(
              +(height - radius) / 2,
              index,
              count,
              samples
            ),
          }),
        },
      ],
    };

    const bottomStyle = {
      width,
      height,
      backgroundColor,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      transform: [
        {
          translateY: progress.interpolate({
            inputRange,
            outputRange: this.outputRange(
              -(height - radius) / 2,
              index,
              count,
              samples
            ),
          }),
        },
      ],
    };

    return (
      <View style={containerStyle} key={index}>
        <Animated.View style={topStyle} />
        <Animated.View style={bottomStyle} />
      </View>
    );
  };

  render() {
    const { style, ...props } = this.props;

    return (
      <Indicator
        style={[styles.container, style] as any}
        renderComponent={this.renderComponent}
        {...props}
      />
    );
  }
}
