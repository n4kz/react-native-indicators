import React, { PureComponent } from "react";
import { PacmanIndicatorProps } from "../../types";
export default class PacmanIndicator extends PureComponent<PacmanIndicatorProps> {
    static defaultProps: Partial<PacmanIndicatorProps>;
    constructor(props: PacmanIndicatorProps);
    private renderBlock;
    private renderComponent;
    render(): React.JSX.Element;
}
