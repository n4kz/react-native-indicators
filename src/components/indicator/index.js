import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import RN from 'react-native/package';

const [major, minor] = RN.version.split('.').map((item) => Number(item));
const hasLoopSupport = !major && minor >= 45;

export default class Indicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,

    animating: true,
    interaction: true,

    count: 1,
  };

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);

    this.state = {
      progress: new Animated.Value(0),
    };

    this.mounted = false;
  }

  startAnimation({ finished } = {}) {
    let { progress } = this.state;
    let {
      interaction,
      animationEasing,
      animationDuration,
    } = this.props;

    if (!this.mounted || false === finished) {
      return;
    }

    let animation =
      Animated.timing(progress, {
        duration: animationDuration,
        easing: animationEasing,
        useNativeDriver: true,
        isInteraction: interaction,
        toValue: 1,
      });

    if (hasLoopSupport) {
      Animated
        .loop(animation)
        .start();
    } else {
      progress.setValue(0);
      animation.start(this.startAnimation);
    }

    this.setState({ animation });
  }

  stopAnimation() {
    let { animation } = this.state;

    if (null == animation) {
      return;
    }

    animation.stop();

    this.setState({ animation: null });
  }

  componentDidMount() {
    let { animating } = this.props;

    this.mounted = true;

    if (animating) {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(props) {
    let { animating } = this.props;

    if (animating ^ props.animating) {
      if (animating) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    }
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
