import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

export default class Indicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDirection: 'forward',
    animationDuration: 1200,
    count: 1,
  };

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDirection: PropTypes.oneOf(['forward', 'backward', 'reversible']),
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
      animationDirection,
    } = this.props;

    if (!this.mounted) {
      return;
    }

    let fwd = animationDirection === 'forward';
    let bwd = animationDirection === 'backward';

    Animated
      .sequence([
        Animated.timing(progress, {
          duration: (fwd || bwd)? 0 : animationDuration,
          easing: animationEasing,
          useNativeDriver: true,
          toValue: fwd? 0 : 1,
        }),
        Animated.timing(progress, {
          duration: animationDuration,
          easing: animationEasing,
          useNativeDriver: true,
          toValue: fwd? 1 : 0,
        }),
      ])
      .start(this.startAnimation);
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
