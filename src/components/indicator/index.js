import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import RN from 'react-native/package';

const [major, minor] = RN.version.split('.');

export default class Indicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    count: 1,
  };

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,

    renderComponent: PropTypes.func,
    count: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
    this.startAnimation = this.startAnimation.bind(this);

    this.state = {
      progress: new Animated.Value(0),
    };

    this.mounted = false;
  }

  startAnimation() {
    let { progress } = this.state;
    let {
      animationEasing,
      animationDuration,
    } = this.props;

    if (!this.mounted) {
      return;
    }

    let animation =
      Animated.timing(progress, {
        duration: animationDuration,
        easing: animationEasing,
        useNativeDriver: true,
        toValue: 1,
      });

    if (!major && minor >= 45) {
      Animated
        .loop(animation)
        .start();
    } else {
      progress.setValue(0);
      animation.start(this.startAnimation);
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.startAnimation();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  renderComponent(undefined, index) {
    let { progress } = this.state;
    let { renderComponent, count } = this.props;

    if ('function' === typeof renderComponent) {
      return renderComponent({ index, count, progress });
    } else {
      return null;
    }
  }

  render() {
    let { count, ...props } = this.props;

    return (
      <Animated.View {...props}>
        {Array.from(new Array(count), this.renderComponent)}
      </Animated.View>
    );
  }
}
