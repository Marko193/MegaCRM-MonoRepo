import { useEffect, useState, FunctionComponent } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { getItem } from '@mega-dev-crm/utilities';
import i18n from 'i18next';
import { DASHBOARD_LANGUAGES } from '@mega-dev-crm/data-access';
import { useTypedTranslation } from 'libs/features/hooks';
import { nameSpaces } from 'libs/features/localization/typedNameSpaces';

interface LanguageListType {
  translations: DASHBOARD_LANGUAGES[];
}

const menuId = 'primary-search-account-menu';

export const LanguagePopover: FunctionComponent = () => {
  const { t } = useTypedTranslation(nameSpaces.common);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const languageList: LanguageListType = {
    translations: [
      DASHBOARD_LANGUAGES.EN,
      DASHBOARD_LANGUAGES.RU,
      DASHBOARD_LANGUAGES.UA,
    ],
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const setLanguage = ({ target }: React.MouseEvent<HTMLElement>) => {
    setCurrentLanguage((target as HTMLElement)?.id);
    handleLanguageMenuClose();
  };

  useEffect(() => {
    const lang = getItem('i18nextLng');
    setCurrentLanguage(lang);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const isMenuOpen = Boolean(languageAnchorEl);

  return (
    <>
      <MenuItem onClick={handleLanguageMenuOpen}>
        {currentLanguage.toUpperCase()}
      </MenuItem>
      <Menu
        anchorEl={languageAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleLanguageMenuClose}
      >
        {languageList.translations &&
          languageList.translations.map((lang) => {
            return (
              <MenuItem key={lang} id={lang} onClick={setLanguage}>
                {t(`languages.${lang}`)}
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
};
