import React, { PureComponent } from "react";
import { Animated, Easing } from "react-native";
import { DotIndicatorProps } from "../../types";
import Indicator from "../indicator";
import styles from "./styles";

export default class DotIndicator extends PureComponent<DotIndicatorProps> {
  static defaultProps: Partial<DotIndicatorProps> = {
    animationEasing: Easing.inOut(Easing.ease),
    color: "rgb(0, 0, 0)",
    count: 4,
    size: 16,
  };

  constructor(props: DotIndicatorProps) {
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
    const { size = 16, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;

    const style = {
      width: size,
      height: size,
      margin: size / 2,
      borderRadius: size / 2,
      backgroundColor,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [
              0.0,
              (index + 0.5) / (count + 1),
              (index + 1.0) / (count + 1),
              (index + 1.5) / (count + 1),
              1.0,
            ],
            outputRange: [1.0, 1.36, 1.56, 1.06, 1.0],
          }),
        },
      ],
    };

    return <Animated.View style={style} key={index} />;
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
