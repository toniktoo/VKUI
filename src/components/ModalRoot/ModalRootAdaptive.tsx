import * as React from "react";
import { withAdaptivity, AdaptivityProps } from "../../hoc/withAdaptivity";
import { ModalRootTouch } from "./ModalRoot";
import { ModalRootDesktop } from "./ModalRootDesktop";

export interface ModalRootProps extends AdaptivityProps {
  activeModal?: string | null;

  /**
   * Будет вызвано при закрытии активной модалки с её id
   */
  onClose?: (modalId: string) => void;
}

const ModalRootComponent: React.FC<ModalRootProps> = ({
  isDesktop,
  ...restProps
}: ModalRootProps) => {
  const RootComponent = isDesktop ? ModalRootDesktop : ModalRootTouch;

  return <RootComponent {...restProps} />;
};

ModalRootComponent.displayName = "ModalRoot";

export const ModalRoot = withAdaptivity(ModalRootComponent, {
  isDesktop: true,
});
