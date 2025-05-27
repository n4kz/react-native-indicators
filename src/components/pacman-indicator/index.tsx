import React, { PureComponent } from "react";
import { View, Animated, I18nManager } from "react-native";
import { PacmanIndicatorProps } from "../../types";
import Indicator from "../indicator";
import styles from "./styles";

export default class PacmanIndicator extends PureComponent<PacmanIndicatorProps> {
  static defaultProps: Partial<PacmanIndicatorProps> = {
    animationDuration: 600,
    color: "rgb(0, 0, 0)",
    size: 48,
  };

  constructor(props: PacmanIndicatorProps) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
  }

  private renderBlock = ({
    index,
    count,
    progress,
  }: {
    index: number;
    count: number;
    progress: Animated.Value;
  }): React.ReactElement => {
    const { size = 48, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;

    const transform: any[] = [
      {
        translateX: progress.interpolate({
          inputRange: [0.5, 1],
          outputRange: [0, size / (I18nManager.isRTL ? 4 : -4)],
          extrapolate: "clamp",
        }),
      },
    ];

    const style: any = {
      position: "absolute" as const,
      top: size / 2 - size / 16,
      left: size / 2 + size / 16 + ((index - 2) * size) / 4,
      width: size / 8,
      height: size / 8,
      borderRadius: size / 16,
      backgroundColor,
      transform,
    };

    if (index === count - 1) {
      transform.push({
        scale: progress.interpolate({
          inputRange: [0, 0.5],
          outputRange: [0, 1],
          extrapolate: "clamp",
        }),
      });

      style.opacity = progress.interpolate({
        inputRange: [0, 0.25],
        outputRange: [0, 1],
        extrapolate: "clamp",
      });
    }

    return <Animated.View style={style} key={index} />;
  };

  private renderComponent = ({
    index,
    count,
    progress,
  }: {
    index: number;
    count: number;
    progress: Animated.Value;
  }): React.ReactElement => {
    const { size = 48, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;

    if (index > 1) {
      return this.renderBlock({ index, count, progress });
    }

    const hf = size / 2;
    const qr = size / 4;

    const pacmanStyle: any = {
      position: "absolute" as const,
      top: qr,
      left: 0,
      width: hf,
      height: hf,
      transform: [
        {
          rotate: progress.interpolate({
            inputRange: [0, 0.67, 1],
            outputRange:
              index ^ (I18nManager.isRTL ? 1 : 0)
                ? ["0deg", "45deg", "0deg"]
                : ["0deg", "-45deg", "0deg"],
            extrapolate: "clamp",
          }),
        },
      ],
    };

    const containerStyle: any = {
      overflow: "hidden" as const,
      width: hf,
      height: qr,
      backgroundColor,
      ...(index
        ? {
            top: qr,
            borderBottomLeftRadius: qr,
            borderBottomRightRadius: qr,
          }
        : {
            borderTopLeftRadius: qr,
            borderTopRightRadius: qr,
          }),
    };

    return (
      <Animated.View style={pacmanStyle} key={index}>
        <Animated.View style={containerStyle} />
      </Animated.View>
    );
  };

  render() {
    const { style, size = 48, ...props } = this.props;

    const indicatorStyle = {
      width: size * 1.25,
      height: size,
    };

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={indicatorStyle as any}
          renderComponent={this.renderComponent}
          {...props}
          count={5}
        />
      </View>
    );
  }
}
