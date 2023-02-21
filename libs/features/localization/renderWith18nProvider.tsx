import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { render, RenderResult } from '@testing-library/react';
import { initI18n } from './i18n';

export const renderWithI18nProvider = (
  locale: string,
  children: ReactNode
): RenderResult => {
  initI18n(locale);
  return render(<I18nextProvider i18n={i18n}>{children}</I18nextProvider>);
};
