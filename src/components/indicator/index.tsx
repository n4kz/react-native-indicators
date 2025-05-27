import React, { PureComponent } from "react";
import { Animated, Easing, StyleProp, ViewStyle } from "react-native";
import { IndicatorProps } from "../../types";

interface IndicatorState {
  progress: Animated.Value;
  hideAnimation: Animated.Value;
}

export default class Indicator extends PureComponent<
  IndicatorProps,
  IndicatorState
> {
  static defaultProps: Partial<IndicatorProps> = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    hideAnimationDuration: 200,
    animating: true,
    interaction: true,
    hidesWhenStopped: true,
    count: 1,
  };

  private animationState: number = 0;

  private savedValue: number = 0;

  constructor(props: IndicatorProps) {
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

    const { animating } = this.props;

    this.state = {
      progress: new Animated.Value(0),
      hideAnimation: new Animated.Value(animating ? 1 : 0),
    };
  }

  componentDidMount(): void {
    const { animating } = this.props;

    if (animating) {
      this.startAnimation();
    }
  }

  componentDidUpdate(prevProps: IndicatorProps): void {
    const { animating } = this.props;

    if (animating && !prevProps.animating) {
      this.resumeAnimation();
    }

    if (!animating && prevProps.animating) {
      this.stopAnimation();
    }

    if (animating !== prevProps.animating) {
      const { hideAnimation } = this.state;
      const { hideAnimationDuration: duration } = this.props;

      Animated.timing(hideAnimation, {
        toValue: animating ? 1 : 0,
        duration: duration || 200,
        useNativeDriver: false,
      }).start();
    }
  }

  private startAnimation = (): void => {
    const { progress } = this.state;
    const { interaction, animationEasing, animationDuration } = this.props;

    if (0 !== this.animationState) {
      return;
    }

    const animation = Animated.timing(progress, {
      duration: animationDuration || 1200,
      easing: animationEasing || Easing.linear,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    });

    Animated.loop(animation).start();

    this.animationState = 1;
  };

  private stopAnimation = (): void => {
    const { progress } = this.state;

    if (1 !== this.animationState) {
      return;
    }

    const listener = progress.addListener(({ value }) => {
      progress.removeListener(listener);
      progress.stopAnimation(() => this.saveAnimation(value));
    });

    this.animationState = -1;
  };

  private saveAnimation = (value: number): void => {
    const { animating } = this.props;

    this.savedValue = value;
    this.animationState = 0;

    if (animating) {
      this.resumeAnimation();
    }
  };

  private resumeAnimation = (): void => {
    const { progress } = this.state;
    const { interaction, animationDuration } = this.props;

    if (0 !== this.animationState) {
      return;
    }

    Animated.timing(progress, {
      useNativeDriver: true,
      isInteraction: interaction,
      duration: (1 - this.savedValue) * (animationDuration || 1200),
      toValue: 1,
    }).start(({ finished }) => {
      if (finished) {
        progress.setValue(0);

        this.animationState = 0;
        this.startAnimation();
      }
    });

    this.savedValue = 0;
    this.animationState = 1;
  };

  private renderComponent = (
    _item: unknown,
    index: number
  ): React.ReactElement | null => {
    const { progress } = this.state;
    const { renderComponent, count } = this.props;

    if (typeof renderComponent === "function") {
      return renderComponent({ index, count: count || 1, progress });
    }

    return null;
  };

  render(): React.ReactElement {
    const { hideAnimation } = this.state;
    const { count, hidesWhenStopped, ...props } = this.props;

    let style: StyleProp<ViewStyle> = props.style;
    if (hidesWhenStopped) {
      style = [
        ...(Array.isArray(props.style) ? props.style : [props.style]),
        { opacity: hideAnimation },
      ];
    }

    return (
      <Animated.View {...props} style={style}>
        {Array.from(new Array(count || 1), this.renderComponent)}
      </Animated.View>
    );
  }
}
