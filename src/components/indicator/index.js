import React, { PureComponent, PropTypes } from 'react';
import { Animated, Easing } from 'react-native';

export default class Indicator extends PureComponent {
  static defaultProps = {
    animationDirection: 'forward',
    animationDuration: 1200,
    animationDelay: 200,
    fadeDuration: 200,
    count: 1,
  };

  static propTypes = {
    ...Animated.View.propTypes,

    animationDirection: PropTypes.oneOf(['forward', 'backward']),
    animationDuration: PropTypes.number,
    animationDelay: PropTypes.number,
    fadeDuration: PropTypes.number,

    renderComponent: PropTypes.func,
    count: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
    this.startAnimation = this.startAnimation.bind(this);

    this.state = {
      progress: new Animated.Value(0),
      opacity: new Animated.Value(0),
    };
  }

  startAnimation() {
    let { animationDuration, animationDelay, animationDirection } = this.props;
    let { progress } = this.state;

    if (!this.mounted) {
      return;
    }

    let forward = 'forward' === animationDirection;

    Animated
      .sequence([
        Animated.timing(progress, {
          duration: forward? animationDuration : 0,
          delay: forward? 0 : animationDelay,
          easing: Easing.inOut(Easing.ease),
          toValue: 1,
        }),
        Animated.timing(progress, {
          duration: forward? 0 : animationDuration,
          delay: forward? animationDelay : 0,
          easing: Easing.inOut(Easing.ease),
          toValue: 0,
        }),
      ])
      .start(this.startAnimation);
  }

  componentDidMount() {
    let { fadeDuration } = this.props;
    let { opacity } = this.state;

    this.mounted = true;

    Animated
      .timing(opacity, { toValue: 1, duration: fadeDuration })
      .start(this.startAnimation);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  renderComponent(undefined, index) {
    let { progress, opacity } = this.state;
    let { renderComponent, count } = this.props;

    if ('function' === typeof renderComponent) {
      return renderComponent({ index, count, opacity, progress });
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
