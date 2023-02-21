import {FunctionComponent, ReactNode} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import {ExpandMore} from '@mui/icons-material';

export interface CustomAccordionItem {
  title: string;
  children: ReactNode;
  isDivider?: boolean;
}

export const CustomAccordion: FunctionComponent<CustomAccordionItem> = ({
  title,
  children,
  isDivider = true,
}) => {
  const {spacing} = useTheme();
  return (
    <>
      <Accordion
        sx={{
          bgcolor: 'inherit',
          boxShadow: 0,
          backgroundImage: 'none',
        }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            px: spacing(0),
          }}>
          <Typography variant='h5'>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            px: spacing(0),
          }}>
          <Divider />
          {children}
        </AccordionDetails>
      </Accordion>
      {isDivider && <Divider />}
    </>
  );
};
