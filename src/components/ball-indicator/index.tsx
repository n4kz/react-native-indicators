import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';
import { BallIndicatorProps } from '../../types';
import Indicator from '../indicator';
import styles from './styles';

export default class BallIndicator extends PureComponent<BallIndicatorProps> {
  static defaultProps: Partial<BallIndicatorProps> = {
    color: 'rgb(0, 0, 0)',
    count: 8,
    size: 40,
  };

  constructor(props: BallIndicatorProps) {
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
    const { size = 40, color: backgroundColor = 'rgb(0, 0, 0)' } = this.props;
    const angle = (index * 360) / count;

    const layerStyle = {
      transform: [
        {
          rotate: angle + 'deg',
        },
      ],
    };

    const inputRange = Array.from(
      new Array(count + 1),
      (item, index) => index / count,
    );

    const outputRange = Array.from(
      new Array(count),
      (item, index) => 1.2 - (0.5 * index) / (count - 1),
    );

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop()!);
    }

    outputRange.unshift(...outputRange.slice(-1));

    const ballStyle = {
      margin: size / 20,
      backgroundColor,
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      transform: [
        {
          scale: progress.interpolate({ inputRange, outputRange }),
        },
      ],
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} key={index}>
        <Animated.View style={ballStyle} />
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
        />
      </View>
    );
  }
}
