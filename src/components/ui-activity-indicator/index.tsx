import React, { PureComponent } from "react";
import { View, Animated } from "react-native";
import { UIActivityIndicatorProps } from "../../types";
import Indicator from "../indicator";
import styles from "./styles";

export default class UIActivityIndicator extends PureComponent<UIActivityIndicatorProps> {
  static defaultProps: Partial<UIActivityIndicatorProps> = {
    color: "rgb(0, 0, 0)",
    count: 12,
    size: 40,
  };

  constructor(props: UIActivityIndicatorProps) {
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
    const { size = 40, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;
    const angle = (index * 360) / count;

    const layerStyle = {
      transform: [
        {
          rotate: angle + "deg",
        },
      ],
    };

    const inputRange = Array.from(
      new Array(count + 1),
      (item, index) => index / count
    );

    const outputRange = Array.from(new Array(count), (item, index) =>
      Math.max(1.0 - index * (1 / (count - 1)), 0)
    );

    for (let j = 0; j < index; j++) {
      const lastItem = outputRange.pop();
      if (lastItem !== undefined) {
        outputRange.unshift(lastItem);
      }
    }

    outputRange.unshift(...outputRange.slice(-1));

    const barStyle = {
      width: size / 10,
      height: size / 4,
      borderRadius: size / 20,
      backgroundColor,
      opacity: progress.interpolate({ inputRange, outputRange }),
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={barStyle} />
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
