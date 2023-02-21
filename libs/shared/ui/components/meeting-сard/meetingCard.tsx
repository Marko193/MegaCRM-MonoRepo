import { FunctionComponent, ReactNode } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import { nameSpaces, TranslationKey, useTypedTranslation } from '@mega-dev-crm/features';

export interface MeetingCardProps {
  title: TranslationKey;
  children: ReactNode;
}

export const MeetingCard: FunctionComponent<MeetingCardProps> = ({
  title,
  children,
}) => {
  const { t } = useTypedTranslation(nameSpaces.overview);
  const {
    spacing,
    palette: {mode}
  } = useTheme();
  return (
    <Grid
      container
      direction = 'column'
      justifyContent = 'space-between'
      alignItems = 'center'
      width='100%'
      mb={spacing(1)}
      p={spacing(2,1,1.25)}
      minHeight="105px"
      boxShadow={1}
      borderRadius={spacing(1)}
      bgcolor={mode==='light' ? "common.white" : "secondary.dark"}
    >
      <Grid>
        <Typography
          sx={{ textAlign: 'center' }}
          data-testid="meetingCard-title"
        >
          {t(title)}
        </Typography>
      </Grid>
      <Grid>{children}</Grid>
    </Grid>
  );
};
