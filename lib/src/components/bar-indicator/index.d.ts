import React, { PureComponent } from "react";
import { BarIndicatorProps } from "../../types";
export default class BarIndicator extends PureComponent<BarIndicatorProps> {
    static defaultProps: Partial<BarIndicatorProps>;
    constructor(props: BarIndicatorProps);
    private outputRange;
    private renderComponent;
    render(): React.JSX.Element;
}
