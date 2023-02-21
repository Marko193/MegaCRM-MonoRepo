import {
  ChipsColorsEnum,
  CoinIcon,
  CustomChips,
  EmailIcon,
  GithubIcon,
  LinkedIn,
  LocationIcon,
  PageHeader,
  PhoneIcon,
  ProfileUserCard,
  WebIcon,
} from '@mega-dev-crm/shared';
import {
  Button,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';

export interface ProfileCandidatePageProps {
  title: string;
}

export const ProfileCandidatePage: FunctionComponent<
  ProfileCandidatePageProps
> = ({title}) => {
  return (
    <Stack>
      <PageHeader title='Candidate Profile' />
      <Stack mb={3} sx={{background: 'white', padding: '24px 24px 16px 24px'}}>
        <Stack
          mb={5}
          justifyContent='space-between'
          alignItems='center'
          flexDirection='row'>
          <Stack>
            <ProfileUserCard
              name='asda'
              surname='asdasd'
              showName={true}
              position='asdad'
              imageSize={60}
            />
          </Stack>
          <Button
            sx={{textTransform: 'capitalize'}}
            startIcon={<LinkedIn color='white' width={14} height={14} />}
            color='secondary'>
            Linkedin Account
          </Button>
        </Stack>
        <Stack
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'>
          <Stack flexDirection='row' gap={2}>
            <Button sx={{textTransform: 'capitalize'}} color='secondary'>
              Edit profile
            </Button>
            <Button sx={{textTransform: 'capitalize'}} color='secondary'>
              Download Resume
            </Button>
            <Button sx={{textTransform: 'capitalize'}}>Make an Offer</Button>
            <Stack ml={1}>
              <FormControlLabel
                control={<Checkbox />}
                label='Move to Employee'
              />
            </Stack>
          </Stack>
          <Stack flexDirection='row' gap={1}>
            <Typography>Assigne:</Typography>
            <Typography sx={{textDecoration: 'underline'}}>
              <Link to={`candidate/id`}>1</Link>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack mb={4}>
        <Typography mb={3} variant='body1' color='secondary'>
          All Pesonal Information
        </Typography>
        <Stack flexDirection='row'>
          <Stack flex={1} gap={2}>
            <Stack flexDirection='row' alignItems='center' gap={1}>
              <CoinIcon />
              <Typography>$1200</Typography>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap={1}>
              <WebIcon />
              <Typography>English (B1), Spanish(B1)</Typography>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap={1}>
              <GithubIcon />
              <CustomChips status={ChipsColorsEnum.INFO} title={'react.js'} />
            </Stack>
          </Stack>
          <Stack flex={1} gap={2}>
            <Stack flexDirection='row' alignItems='center' gap={1}>
              <PhoneIcon />
              <Typography>+38(097)5489932</Typography>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap={1}>
              <EmailIcon />
              <Typography>serhiibarbishev@gmail.com</Typography>
            </Stack>
          </Stack>
          <Stack flex={1} gap={2}>
            <Stack flexDirection='row' alignItems='center' gap={1}>
              <LocationIcon />
              <Typography>Germany, Berlin</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack>
        <Typography mb={3} variant='body1' color='secondary'>
          All Pesonal Information
        </Typography>
        <Typography>
          Need 1 month to work on a previous job. Has a great hard skiils.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProfileCandidatePage;
