import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { View, Animated } from "react-native";

import Indicator from "../indicator";
import styles from "./styles";

class UIActivityIndicator extends PureComponent {
  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, count, progress }) {
    let { size, color: backgroundColor } = this.props;
    let angle = (index * 360) / count;

    let layerStyle = {
      transform: [
        {
          rotate: angle + "deg"
        }
      ]
    };

    let inputRange = Array.from(
      new Array(count + 1),
      (undefined, index) => index / count
    );

    let outputRange = Array.from(new Array(count), (undefined, index) =>
      Math.max(1.0 - index * (1 / (count - 1)), 0)
    );

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop());
    }

    outputRange.unshift(...outputRange.slice(-1));

    let barStyle = {
      width: size / 10,
      height: size / 4,
      borderRadius: size / 20,
      backgroundColor,
      opacity: progress.interpolate({ inputRange, outputRange })
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={barStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style, size: width, size: height, ...props } = this.props;

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

UIActivityIndicator.defaultProps = {
  color: "rgb(0, 0, 0)",
  count: 12,
  size: 40
};

UIActivityIndicator.propTypes = {
  ...Indicator.propTypes,

  color: PropTypes.string,
  size: PropTypes.number
};

export default UIActivityIndicator;
