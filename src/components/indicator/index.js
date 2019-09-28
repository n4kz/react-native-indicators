import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

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

    /*
     *  0 -> 1
     *    | startAnimation
     *    | resumeAnimation
     *
     *  1 -> -1
     *    | stopAnimation
     *
     * -1 -> 0
     *    | saveAnimation
     */
    this.animationState = 0;
    this.savedValue = 0;

    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    let { animating } = this.props;

    if (animating) {
      this.startAnimation();
    }
  }

  componentDidUpdate(prevProps) {
    let { animating } = this.props;

    if (animating && !prevProps.animating) {
      this.resumeAnimation();
    }

    if (!animating && prevProps.animating) {
      this.stopAnimation();
    }
  }

  startAnimation() {
    let { progress } = this.state;
    let { interaction, animationEasing, animationDuration } = this.props;

    if (0 !== this.animationState) {
      return;
    }

    let animation = Animated
      .timing(progress, {
        duration: animationDuration,
        easing: animationEasing,
        useNativeDriver: true,
        isInteraction: interaction,
        toValue: 1,
      });

    Animated
      .loop(animation)
      .start();

    this.animationState = 1;
  }

  stopAnimation() {
    let { progress } = this.state;

    if (1 !== this.animationState) {
      return;
    }

    let listener = progress
      .addListener(({ value }) => {
        progress.removeListener(listener);
        progress.stopAnimation(() => this.saveAnimation(value));
      });

    this.animationState = -1;
  }

  saveAnimation(value) {
    let { animating } = this.props;

    this.savedValue = value;
    this.animationState = 0;

    if (animating) {
      this.resumeAnimation();
    }
  }

  resumeAnimation() {
    let { progress } = this.state;
    let { interaction, animationDuration } = this.props;

    if (0 !== this.animationState) {
      return;
    }

    Animated
      .timing(progress, {
        useNativeDriver: true,
        isInteraction: interaction,
        duration: (1 - this.savedValue) * animationDuration,
        toValue: 1,
      })
      .start(({ finished }) => {
        if (finished) {
          progress.setValue(0);

          this.animationState = 0;
          this.startAnimation();
        }
      });

    this.savedValue = 0;
    this.animationState = 1;
  }

  renderComponent(item, index) {
    let { progress } = this.state;
    let { renderComponent, count } = this.props;

    if ('function' === typeof renderComponent) {
      return renderComponent({ index, count, progress });
    }

    return null;
  }

  render() {
    let { count, ...props } = this.props;

    return (
      <Animated.View {...props}>
        {Array.from(new Array(count), this.renderComponent, this)}
      </Animated.View>
    );
  }
}
