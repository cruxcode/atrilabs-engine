import React, { forwardRef } from "react";
import { Tree as AntdTree } from "antd";
import type { DataNode } from "antd/es/tree";

export type CollapsibleTypes = "header" | "icon" | "disabled";
export type ExpandIconPosition = "start" | "end";

export type Size = "large" | "middle" | "small";
export type Position = "left" | "right";

const Tree = forwardRef<
  HTMLDivElement,
  {
    styles: React.CSSProperties;
    className?: string;
    custom: {
      treeData?: DataNode[];
      checkable?: boolean;
      showLine?: boolean;
      multiple?: boolean;
      defaultExpandAll?: boolean;
      defaultExpandParent?: boolean;
      onCheck?: (
        checked:
          | {
              checked: (string | number)[];
              halfChecked: (string | number)[];
            }
          | (string | number)[]
      ) => void;
      onExpand?: (
        expandedKeys: (string | number)[],
        info: {
          expanded: boolean;
          nativeEvent: MouseEvent;
        }
      ) => void;
      onRightClick?: (info: { event: React.MouseEvent }) => void;
      onSelect?: (
        selectedKeys: (string | number)[],
        info: {
          event: "select";
          selected: boolean;
          nativeEvent: MouseEvent;
        }
      ) => void;
    };
  }
>((props, ref) => {
  return (
    <div ref={ref}>
      <AntdTree
        style={props.styles}
        className={props.className}
        checkable={props.custom.checkable}
        showLine={props.custom.showLine}
        multiple={props.custom.multiple}
        treeData={props.custom.treeData}
        defaultExpandAll={props.custom.defaultExpandAll}
        defaultExpandParent={props.custom.defaultExpandParent}
        onCheck={props.custom.onCheck}
        onExpand={props.custom.onExpand}
        onRightClick={props.custom.onRightClick}
        onSelect={props.custom.onSelect}
      />
    </div>
  );
});
export default Tree;
