import { FC, useRef } from 'react';
import { canUseDOM, useDOM } from '../../lib/dom';
import {
  ConfigProviderContext,
  ConfigProviderContextInterface,
  Scheme,
  AppearanceScheme,
  defaultConfigProviderProps,
} from './ConfigProviderContext';
import { PlatformType, VKCOM } from '../../lib/platform';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { noop } from '../../lib/utils';

export interface ConfigProviderProps extends ConfigProviderContextInterface {
  /**
   * Цветовая схема приложения
   */
  scheme?: AppearanceScheme;
  /**
   * @ignore
   * Свойство для документации, чтобы менять scheme у ноды с примером, а не у body
   */
  schemeTarget?: HTMLElement;
}

function normalizeScheme(scheme: AppearanceScheme, platform: PlatformType): AppearanceScheme {
  if (scheme === 'inherit') {
    return scheme;
  }
  if (platform === VKCOM) {
    return Scheme.VKCOM;
  }
  switch (scheme) {
    case Scheme.DEPRECATED_CLIENT_LIGHT:
      return Scheme.BRIGHT_LIGHT;
    case Scheme.DEPRECATED_CLIENT_DARK:
      return Scheme.SPACE_GRAY;
    default:
      return scheme;
  }
}

const ConfigProvider: FC<ConfigProviderProps> = ({ children, schemeTarget, ...config }) => {
  const scheme = normalizeScheme(config.scheme, config.platform);

  const { document } = useDOM();
  const setScheme = () => {
    if (scheme !== 'inherit') {
      (schemeTarget || document.body).setAttribute('scheme', scheme);
    }
  };

  const isMounted = useRef(false);
  if (!isMounted.current && canUseDOM) {
    setScheme();
    isMounted.current = true;
  }
  useIsomorphicLayoutEffect(() => {
    setScheme();
    return scheme === 'inherit' ? noop : () => (schemeTarget || document.body).removeAttribute('scheme');
  }, [scheme]);

  const configContext = useObjectMemo(config);

  return (
    <ConfigProviderContext.Provider value={configContext}>
      {children}
    </ConfigProviderContext.Provider>
  );
};

// Деструктуризация нужна из бага в react-docgen-typescript
// https://github.com/styleguidist/react-docgen-typescript/issues/195
ConfigProvider.defaultProps = { ...defaultConfigProviderProps };

export default ConfigProvider;
