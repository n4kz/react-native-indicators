import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import { PulseIndicatorProps } from '../../types';
import Indicator from '../indicator';
import styles from './styles';

export default class PulseIndicator extends PureComponent<PulseIndicatorProps> {
  static defaultProps: Partial<PulseIndicatorProps> = {
    animationEasing: Easing.out(Easing.ease),
    color: 'rgb(0, 0, 0)',
    size: 40,
  };

  constructor(props: PulseIndicatorProps) {
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
    const { size = 40, color = 'rgb(0, 0, 0)' } = this.props;

    const pulseStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: color,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 0.67, 1],
            outputRange: index ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1.0],
          }),
        },
      ],
      opacity: progress.interpolate({
        inputRange: [0, 0.67, 1],
        outputRange: index ? [1.0, 1.0, 1.0] : [0.5, 0.5, 0.0],
      }),
    };

    return (
      <Animated.View style={styles.layer} key={index}>
        <Animated.View style={pulseStyle} />
      </Animated.View>
    );
  };

  render(): React.ReactElement {
    const { style, size = 40, ...props } = this.props;
    const width = size;
    const height = size;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
          count={2}
        />
      </View>
    );
  }
}
