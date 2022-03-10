import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import type { HasRootRef } from "../../types";
import styles from "./ButtonGroup.module.css";

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    HasRootRef<HTMLDivElement> {
  /**
   * Задает расположение элементов внутри группы, вертикальное или горизонтальное.
   */
  mode?: "vertical" | "horizontal";
  /**
   * Выставляет в зависимости от `mode` отступ по вертикали или горизонтали.
   */
  gap?: "none" | "space" | "s" | "m";
  /**
   * Растягивает компонент на всю ширину контейнера.
   *
   * Note: Для потомков соответствующее поведение нужно определять самостоятельно, где это необходимо.
   */
  stretched?: boolean;
}

const modeClasses = {
  horizontal: styles["ButtonGroup--mode-horizontal"],
  vertical: styles["ButtonGroup--mode-vertical"],
};

const gapClasses = {
  none: "",
  space: styles["ButtonGroup--gap-space"],
  s: styles["ButtonGroup--gap-s"],
  m: styles["ButtonGroup--gap-m"],
};

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  mode = "horizontal",
  gap = "m",
  stretched = false,
  getRootRef,
  className,
  children,
  ...restProps
}) => {
  return (
    <div
      className={classNamesString(
        className,
        styles.ButtonGroup,
        modeClasses[mode],
        gapClasses[gap],
        stretched && styles["ButtonGroup--stretched"]
      )}
      role="group"
      ref={getRootRef}
      {...restProps}
    >
      {children}
    </div>
  );
};
