import { createContext } from 'react';
import { Locale, EN_US } from './locales';

export interface Config {
  locale: Locale;
}

const config: Config = {
  locale: EN_US,
};

export const ConfigContext = createContext(config);

export const ConfigProvider = ConfigContext.Provider;
