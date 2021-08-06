import { FunctionComponent, ReactNode, HTMLAttributes, ElementType, AnchorHTMLAttributes } from 'react';
import { getClassName } from '../../helpers/getClassName';
import Counter from '../Counter/Counter';
import { classNames } from '../../lib/classNames';
import { usePlatform } from '../../hooks/usePlatform';
import { hasReactNode } from '../../lib/utils';
import './TabbarItem.css';

export interface TabbarItemProps extends HTMLAttributes<HTMLElement>, AnchorHTMLAttributes<HTMLElement> {
  selected?: boolean;
  /**
   * Тест рядом с иконкой
   */
  text?: ReactNode;
  /**
   * Индикатор над иконкой. Принимает `<Badge mode="prominent" />` или `<Counter size="s" mode="prominent" />`
   */
  indicator?: ReactNode;
  /**
   * @deprecated будет удалено в 5.0.0. Используйте `indicator`
   */
  label?: ReactNode;
}

const TabbarItem: FunctionComponent<TabbarItemProps> = (props: TabbarItemProps) => {
  const { children, selected, label, indicator, text, ...restProps } = props;
  const platform = usePlatform();
  const Component: ElementType = restProps.href ? 'a' : 'div';

  return (
    <Component
      {...restProps}
      vkuiClass={classNames(getClassName('TabbarItem', platform), {
        'TabbarItem--selected': selected,
        'TabbarItem--text': !!text,
      })}
    >
      <div vkuiClass="TabbarItem__in">
        <div vkuiClass="TabbarItem__icon">
          {children}
          <div vkuiClass="TabbarItem__label">
            {hasReactNode(indicator) && indicator}
            {!indicator && label && <Counter size="s" mode="prominent">{label}</Counter>}
          </div>
        </div>
        {text && <div vkuiClass="TabbarItem__text">{text}</div>}
      </div>
    </Component>
  );
};

export default TabbarItem;
