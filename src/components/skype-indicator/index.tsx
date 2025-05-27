import React, { PureComponent } from "react";
import { View, Animated, Easing } from "react-native";
import { SkypeIndicatorProps } from "../../types";
import Indicator from "../indicator";
import styles from "./styles";

export default class SkypeIndicator extends PureComponent<SkypeIndicatorProps> {
  static defaultProps: Partial<SkypeIndicatorProps> = {
    animationDuration: 1600,
    color: "rgb(0, 0, 0)",
    count: 5,
    size: 40,
    minScale: 0.2,
    maxScale: 1.0,
  };

  constructor(props: SkypeIndicatorProps) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
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
      size = 40,
      minScale = 0.2,
      maxScale = 1.0,
      color: backgroundColor = "rgb(0, 0, 0)",
      animationDuration = 1600,
    } = this.props;

    const frames = (60 * animationDuration) / 1000;
    const offset = index / (count - 1);
    const easing = Easing.bezier(0.5, offset, 0.5, 1.0);

    const inputRange = Array.from(
      new Array(frames),
      (item, index) => index / (frames - 1)
    );

    const outputRange = Array.from(
      new Array(frames),
      (item, index) => easing(index / (frames - 1)) * 360 + "deg"
    );

    const layerStyle = {
      transform: [
        {
          rotate: progress.interpolate({ inputRange, outputRange }),
        },
      ],
    };

    const ballStyle = {
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      backgroundColor,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [
              maxScale - (maxScale - minScale) * offset,
              minScale + (maxScale - minScale) * offset,
            ],
          }),
        },
      ],
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={ballStyle} />
      </Animated.View>
    );
  };

  render() {
    const { style, size: width = 40, size: height = 40, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height } as any}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
