import React, { forwardRef, useMemo } from "react";
import { Timeline as AntdTimeline } from "antd";

export type CollapsibleTypes = "header" | "icon" | "disabled";
export type ExpandIconPosition = "start" | "end";

export type Size = "large" | "middle" | "small";
export type Position = "left" | "right";

const Timeline = forwardRef<
  HTMLDivElement,
  {
    styles: React.CSSProperties;
    className?: string;
    custom: {
      items: {
        children?: React.ReactNode;
        time?: React.ReactNode;
        color?: string;
        dot?: string;
        position?: Position;
      }[];
      pending?: React.ReactNode;
      pendingDot?: string;
      reverse?: boolean;
      mode?: "left" | "alternate" | "right";
    };
  }
>((props, ref) => {
  const timelineItems = useMemo(() => {
    return props.custom.items.map((item) => {
      if (typeof item.dot === "string") {
        return {
          ...item,
          dot: <img src={item.dot} alt={item.dot} />,
        };
      }
      return item;
    });
  }, [props.custom.items]);
  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      <AntdTimeline
        style={props.styles}
        className={props.className}
        mode={props.custom.mode}
        items={timelineItems}
        pending={props.custom.pending}
        pendingDot={
          props.custom.pendingDot !== undefined && (
            <img src={props.custom.pendingDot} alt={props.custom.pendingDot} />
          )
        }
        reverse={props.custom.reverse}
      ></AntdTimeline>
    </div>
  );
});
export default Timeline;
