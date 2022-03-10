import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { ANDROID, IOS, VKCOM } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { HasRootRef } from "../../types";
import styles from "./Div.module.css";

const platformClasses: Record<string, string> = {
  [ANDROID]: styles["Div--android"],
  [IOS]: styles["Div--ios"],
  [VKCOM]: styles["Div--vkcom"],
};

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    HasRootRef<HTMLDivElement> {}

export const Div: React.FunctionComponent<DivProps> = ({
  children,
  getRootRef,
  className,
  ...restProps
}: DivProps) => {
  const platform = usePlatform();
  return (
    <div
      {...restProps}
      ref={getRootRef}
      className={classNamesString(
        styles.Div,
        platformClasses[platform],
        className
      )}
    >
      {children}
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Div;
