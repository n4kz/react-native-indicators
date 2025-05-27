import React, { PureComponent } from "react";
import { View, Animated, Easing } from "react-native";
import { WaveIndicatorProps } from "../../types";
import Indicator from "../indicator";
import styles from "./styles";

const floatEpsilon = Math.pow(2, -23);

export default class WaveIndicator extends PureComponent<WaveIndicatorProps> {
  static defaultProps: Partial<WaveIndicatorProps> = {
    animationEasing: Easing.out(Easing.ease),
    animationDuration: 1600,
    waveFactor: 0.54,
    waveMode: "fill",
    color: "rgb(0, 0, 0)",
    count: 4,
    size: 40,
  };

  constructor(props: WaveIndicatorProps) {
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
      color = "rgb(0, 0, 0)",
      waveFactor = 0.54,
      waveMode = "fill",
    } = this.props;

    const fill = "fill" === waveMode;
    const factor = Math.max(1 - Math.pow(waveFactor, index), floatEpsilon);

    const waveStyle: any = {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: fill ? 0 : Math.floor(size / 20),
      [fill ? "backgroundColor" : "borderColor"]: color,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [factor, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
        },
      ],
      opacity: progress.interpolate({
        inputRange: [0, factor, 1],
        outputRange: [0, 1, 0],
      }),
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={waveStyle} />
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
