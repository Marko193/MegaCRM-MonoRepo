import {FunctionComponent} from 'react';
import {Divider, Grid, ListItem, Typography, useTheme} from '@mui/material';
import {CustomChips} from '../custom-chip/custom-chip';
import {ChipsColorsEnum} from '../../interfaces/common-interfaces';
// import {
//   nameSpaces,
//   TranslationKey,
//   useTypedTranslation,
// } from '@mega-dev-crm/features';
// import {useEmployeeByIdSelector} from '@mega-dev-crm/data-access';
// import {Link} from 'react-router-dom';

interface LanguageInterface {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  language_name_id: {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
  };
  language_level_info: {
    id: number;
    created_at: string;
    updated_at: string;
    level_name: string;
  };
}

export interface CustomListItem {
  // categoryName: TranslationKey;
  value?: string;
  arrayOfValues?: LanguageInterface[];
  isDivider?: boolean;
  isLanguage?: boolean;
  isValue?: boolean;
  isLink?: boolean;
  isDate?: boolean;
  isEquipment?: boolean;
  assigneePersonObj?: any;
  justifyContent?: string;
}

export const CustomListItem: FunctionComponent<CustomListItem> = ({
  // categoryName,
  value = '',
  arrayOfValues = [],
  isDivider = true,
  isLanguage = false,
  isValue = false,
  isLink = false,
  isDate = false,
  // assigneePersonID,
}) => {
  const {spacing} = useTheme();
  // const {t} = useTypedTranslation(nameSpaces.common);
  // const assigneeUser = useEmployeeByIdSelector(assigneePersonID);
  return (
    <>
      <ListItem
        sx={{
          padding: spacing(1.25, 0),
          gap: spacing(1),
          // justifyContent: {justifyContent},
        }}>
        <Grid item xs={4}>
          {/* <Typography variant='body2'>{t(categoryName)}</Typography> */}
        </Grid>
        {isLanguage &&
          arrayOfValues.map(({language_level_info, language_name_id}) => (
            <Typography variant='body2'>
              {language_name_id.name} ({language_level_info.level_name})
            </Typography>
          ))}
        {isValue && (
          <Typography variant='body2' textTransform='capitalize'>
            {value}
          </Typography>
        )}
        {isLink && (
          <Typography
            variant='body2'
            sx={{
              '&:hover': {
                textDecoration: 'underline',
              },
            }}>
            {/* <Link
              to={assigneeUser ? `/employee-profile/${assigneeUser.id}` : ''}>
              {assigneeUser
                ? `${assigneeUser.name} ${assigneeUser.surname}`
                : '-'}
            </Link> */}
          </Typography>
        )}
        {isDate && (
          <CustomChips title={value} status={ChipsColorsEnum.WARNING} />
        )}
      </ListItem>
      {isDivider && <Divider />}
    </>
  );
};
