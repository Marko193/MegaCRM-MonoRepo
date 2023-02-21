import { useTypedTranslation } from '../hooks';
import { nameSpaces } from './typedNameSpaces';
import { renderWithI18nProvider } from './renderWith18nProvider';
describe('i18n', () => {
  const TranslatedText = () => {
    const { t } = useTypedTranslation(nameSpaces.common);
    return <div>{t('testing.testingKey')}</div>;
  };

  it('should render text in English', async () => {
    const { getByText } = renderWithI18nProvider('en', <TranslatedText />);
    expect(getByText('This text is used to test the app.')).toBeTruthy();
  });

  it('should render text in Russian ', async () => {
    const { getByText } = renderWithI18nProvider('ru', <TranslatedText />);

    expect(getByText('Для тестирования локализации.')).toBeTruthy();
  });

  it('should render text in Ukrainian', async () => {
    const { getByText } = renderWithI18nProvider('ua', <TranslatedText />);

    expect(getByText('Цей текст повинен бути на укр.')).toBeTruthy();
  });
});
