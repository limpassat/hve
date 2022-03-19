import React, { Component, createRef } from "react";
import styled, { CSSProperties } from "styled-components";
import { observer } from "mobx-react";
import { computed, makeObservable } from "mobx";


const PopupWrapper = styled.div<Pick<PopupProps, "width" | "height" | "anchors"> & { vertical: number, horizontal: number }>`
  position: absolute;
  width: ${p => p.width ? typeof p.width === "string" ? p.width : `${p.width}px` : "auto"};
  height: ${p => p.height ? typeof p.height === "string" ? p.height : `${p.height}px` : "auto"};
  top: ${p => p.anchors.includes("top") ? p.vertical + "px" : null};
  bottom: ${p => p.anchors.includes("bottom") ? p.vertical + "px" : null};
  left: ${p => p.anchors.includes("left") ? p.horizontal + "px" : null};
  right: ${p => p.anchors.includes("right") ? p.horizontal + "px" : null};
  
  z-index: 1;
`;

type VAnchor = "top" | "bottom";

type HAnchor = "right" | "left";

type PopupProps = {
  opened: boolean;
  onClose: () => void;
  getTarget: () => any;
  anchors: [VAnchor, HAnchor];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  verticalPredicate?: (defaultCalculates: number, targetRect: DOMRect) => number;
  horizontalPredicate?: (defaultCalculates: number, targetRect: DOMRect) => number;
  closeAfterSelfClick?: boolean;
  closeCondition?: (eventPath: HTMLElement[]) => boolean;
};

@observer
export class Popup extends Component<PopupProps> {

  private wrapperRef = createRef<HTMLDivElement>();

  constructor(props, context) {
    super(props, context);
    makeObservable(this, {
      vertical: computed,
      horizontal: computed,
    });
    document.addEventListener("click", this.onDocumentClick.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onDocumentClick.bind(this));
  }

  private onDocumentClick(e) {
    const {opened, closeAfterSelfClick, onClose, closeCondition} = this.props;
    const target = this.target;
    if (target) {
      const content = this.wrapperRef.current;
      const targetInPath = !!e.path.find(el => el === target);
      const contentInPath = !!e.path.find(el => el === content);
      if (targetInPath && opened) {
        return;
      }
      if (typeof closeCondition === "function" && !closeCondition(e.path)) {
        return;
      }
      if ((!contentInPath || closeAfterSelfClick) && opened) {
        onClose();
      }
    }
  }

  get target(): HTMLElement {
    return this.props.getTarget && this.props.getTarget();
  }

  get horizontal(): number {
    if (!this.target) {
      return 0;
    }
    const {anchors, horizontalPredicate} = this.props;
    const rect: DOMRect = this.target.getBoundingClientRect();
    let result: number;
    if (anchors.includes("left")) {
      result = rect.left;
    }
    else if (anchors.includes("right")) {
      result = innerWidth - rect.right;
    }
    if (typeof horizontalPredicate === "function") {
      result = horizontalPredicate(result, rect);
    }
    return result;
  }

  get vertical(): number {
    if (!this.target) {
      return 0;
    }
    const {anchors, verticalPredicate} = this.props;
    const rect: DOMRect = this.target.getBoundingClientRect();
    let result: number;
    if (anchors.includes("top")) {
      result = rect.top;
    }
    else if (anchors.includes("bottom")) {
      result = innerHeight - rect.bottom;
    }
    if (typeof verticalPredicate === "function") {
      result = verticalPredicate(result, rect);
    }
    return result;
  }

  render() {
    if (!this.props.opened) {
      return null;
    }
    if (!this.target) {
      return null;
    }
    return (
      <PopupWrapper width={this.props.width}
                    height={this.props.height}
                    anchors={this.props.anchors}
                    vertical={this.vertical}
                    horizontal={this.horizontal}
                    ref={this.wrapperRef}
      >
        {this.props.children}
      </PopupWrapper>
    );
  }
}