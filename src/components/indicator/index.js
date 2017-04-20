import React, { PureComponent, PropTypes } from 'react';
import { Animated, Easing } from 'react-native';

export default class Indicator extends PureComponent {
  static defaultProps = {
    animationDuration: 1200,
    animationDelay: 200,
    count: 1,
  };

  static propTypes = {
    ...Animated.View.propTypes,

    animationDuration: PropTypes.number,
    animationDelay: PropTypes.number,

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
    let { animationDuration, animationDelay } = this.props;
    let { progress } = this.state;

    if (!this.mounted) {
      return;
    }

    Animated
      .sequence([
        Animated.timing(progress, {
          duration: animationDuration,
          toValue: 1,
          easing: Easing.inOut(Easing.ease),
          delay: animationDelay,
        }),
        Animated.timing(progress, {
          duration: 0,
          toValue: 0,
        }),
      ])
      .start(this.startAnimation);
  }

  componentDidMount() {
    let { opacity } = this.state;

    this.mounted = true;

    Animated
      .timing(opacity, { toValue: 1, duration: 200 })
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
