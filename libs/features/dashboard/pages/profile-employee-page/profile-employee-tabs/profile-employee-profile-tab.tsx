import {Grid, List, Stack, Typography, useTheme} from '@mui/material';
import {
  BalanceCard,
  EquipmentItem,
  nameSpaces,
  useTypedTranslation,
} from '@mega-dev-crm/features';
import {
  BoyIcon,
  BusinessTripIconNoBg,
  ChildrenListItem,
  ContactsLine,
  CustomAccordion,
  CustomListItem,
  DayOffIconNoBg,
  GirlIcon,
  HomeOfficeIconNoBg,
  ParentalLeaveNoBgIcon,
  ProfileUserCard,
  SicknessNoBgIcon,
  SubCategory,
  TelegramIcon,
  VacationNoBgIcon,
} from '@mega-dev-crm/shared';
import {Email, LinkedIn, Phone} from '@mui/icons-material';
import dayjs from 'dayjs';
import {
  useEmployeeChildByIdSelector,
  UserInterface,
} from '@mega-dev-crm/data-access';
import {FunctionComponent} from 'react';
import {useParams} from 'react-router';

const equipmentMockData: EquipmentItem[] = [
  {
    inv_number: 345345,
    name: 'MacBook',
    model: 'Pro',
    condition: 'new',
    date_of_issue: '2022-11-04T08:21:22.737Z',
  },
  {
    inv_number: 123123,
    name: 'Samsung mouse',
    model: 'X1',
    condition: 'used',
    date_of_issue: '2022-11-06T08:21:22.737Z',
  },
];

const mockUser = {
  id: 2,
  created_at: '2022-10-05T13:11:30.269Z',
  updated_at: '2022-11-04T12:50:57.004Z',
  added_date: dayjs().toISOString(),
  main_phone: '232332233',
  additional_phone: '111111',
  corporate_email: 'marik8998@gmail.com',
  personal_email: 'personal@nure.ua',
  avatar: null,
  name: 'MООООООООООО',
  surname: 'Pavlenko',
  inn: '233232',
  country: null,
  is_account_active: true,
  salary: '300.00',
  city: null,
  age: 22,
  sex: 'male',
  date_of_birth: '2022-10-05',
  company_name: 'Megadev',
  is_probation_period: false,
  employee_start_date: '2022-10-05T13:11:30.269Z',
  format_of_work: 'remote',
  role_id: 1,
  last_login: '2022-11-04T12:50:56.955Z',
  employee_end_date: '2022-10-05T13:11:30.269Z',
  merchant_size: null,
  user_level: 'junior',
  user_status: 'fulltime',
  probation_start_date: null,
  probation_end_date: null,
  skype: null,
  telegram: null,
  linkedin: null,
  instagram: null,
  facebook: null,
  emergency_contact: null,
  emergency_phone: null,
  assigned_hr_id: 2,
  assigned_pm_id: null,
  assigned_sales_id: null,
  vacation_days_balance: null,
  sickness_days_balance: 3,
  day_off_days_balance: 2,
  home_office_days_balance: 4,
  parental_days_balance: 14,
  business_days_balance: 5,
  family_members: [],
  user_languages: [
    {
      id: 3,
      created_at: '2022-11-04T08:21:22.737Z',
      updated_at: '2022-11-04T08:21:22.737Z',
      user_id: 19,
      language_name_id: {
        id: 1,
        created_at: '2022-10-23T23:09:21.385Z',
        updated_at: '2022-10-23T23:09:21.385Z',
        name: 'Russian',
      },
      language_level_info: {
        id: 1,
        created_at: '2022-10-23T23:09:21.385Z',
        updated_at: '2022-10-23T23:09:21.385Z',
        level_name: 'A1',
      },
    },
  ],
  user_skills: [],
  user_positions: [],
  user_calendar_requests: [],
  family: [],
};

export interface ProfileEmployeeTabPropsInterface {
  currentUser?: UserInterface;
}

export const ProfileEmployeeProfileTab: FunctionComponent<
  ProfileEmployeeTabPropsInterface
> = ({currentUser}) => {
  const {id} = useParams();
  const {spacing, palette} = useTheme();
  const {t} = useTypedTranslation(nameSpaces.common);
  const employeeChildren = useEmployeeChildByIdSelector(Number(id));
  const girls = employeeChildren?.filter((child) => child.sex === 'female');
  const boys = employeeChildren?.filter((child) => child.sex === 'male');
  return (
    <>
      <Grid columnSpacing={2} container py={spacing(2)}>
        <Grid item xs={5}>
          <BalanceCard title={t('balanceCard.available.balance')}>
            <Grid item xs={4} key={0}>
              <ProfileUserCard
                showName={true}
                name={t('balanceCategories.vacation')}
                position={`${currentUser?.vacation_days_balance} ${t(
                  'profileCard.d'
                )}`}
                isUserCard
                isBalance
                svgIcon={<VacationNoBgIcon />}
                spacingBetweenColumns={0.5}
                circleColor={palette.success.main}
              />
            </Grid>
            <Grid item xs={4} key={1}>
              <ProfileUserCard
                showName
                name={t('balanceCategories.sickness')}
                position={`${currentUser?.sickness_days_balance} ${t(
                  'profileCard.d'
                )}`}
                isUserCard
                isBalance
                svgIcon={<SicknessNoBgIcon />}
                spacingBetweenColumns={0.5}
                circleColor={palette.error.main}
              />
            </Grid>
            <Grid item xs={4} key={2}>
              <ProfileUserCard
                showName
                name={t('balanceCategories.home.office')}
                position={`${currentUser?.home_office_days_balance} ${t(
                  'profileCard.d'
                )}`}
                isUserCard
                isBalance
                svgIcon={<HomeOfficeIconNoBg />}
                spacingBetweenColumns={0.5}
                circleColor={palette.warning.main}
              />
            </Grid>
            <Grid item xs={4} key={3}>
              <ProfileUserCard
                showName={true}
                name={t('balanceCategories.parental.leave')}
                position={`${currentUser?.parental_days_balance} ${t(
                  'profileCard.d'
                )}`}
                isUserCard
                isBalance
                svgIcon={<ParentalLeaveNoBgIcon />}
                spacingBetweenColumns={0.5}
                circleColor={palette.warning.light}
              />
            </Grid>
            <Grid item xs={4} key={4}>
              <ProfileUserCard
                showName
                name={t('balanceCategories.day.off')}
                position={`${currentUser?.day_off_days_balance} ${t(
                  'profileCard.d'
                )}`}
                isUserCard
                isBalance
                svgIcon={<DayOffIconNoBg />}
                spacingBetweenColumns={0.5}
                circleColor={palette.warning.dark}
              />
            </Grid>
            <Grid item xs={4} key={5}>
              <ProfileUserCard
                showName
                name={t('balanceCategories.business')}
                position={`${currentUser?.business_days_balance} ${t(
                  'profileCard.d'
                )}`}
                isUserCard
                isBalance
                svgIcon={<BusinessTripIconNoBg />}
                spacingBetweenColumns={0.5}
                circleColor={palette.warning.contrastText}
              />
            </Grid>
          </BalanceCard>
          <SubCategory title={t('categoryNames.contacts')}>
            <Stack pt={spacing(1.5)} spacing={2.25}>
              <ContactsLine
                isPhone={true}
                value={currentUser?.main_phone}
                icon={<Phone />}
              />
              <ContactsLine
                isMail={true}
                value={currentUser?.corporate_email}
                icon={<Email />}
              />
              {currentUser?.linkedin && (
                <ContactsLine
                  isLink={true}
                  value={currentUser?.linkedin}
                  icon={<LinkedIn />}
                />
              )}
              {currentUser?.telegram && (
                <ContactsLine
                  isTelegram={true}
                  value={currentUser?.telegram}
                  icon={
                    <TelegramIcon height={spacing(2.5)} width={spacing(2.5)} />
                  }
                />
              )}
            </Stack>
          </SubCategory>
          {employeeChildren?.length !== 0 && (
            <SubCategory title={t('categoryNames.children')}>
              <List component='nav'>
                <ChildrenListItem icon={<GirlIcon />}>
                  {girls?.map(({name, date_of_birth, id}) => (
                    <Typography
                      key={id}
                      variant='body2'
                      lineHeight={spacing(1.75)}>
                      {name} ({dayjs(date_of_birth).format('DD/MM/YYYY')})
                    </Typography>
                  ))}
                </ChildrenListItem>
                <ChildrenListItem icon={<BoyIcon />} isDivider={false}>
                  {boys?.map(({name, date_of_birth, id}) => (
                    <Typography
                      key={id}
                      variant='body2'
                      lineHeight={spacing(1.75)}>
                      {name} ({dayjs(date_of_birth).format('DD/MM/YYYY')})
                    </Typography>
                  ))}
                </ChildrenListItem>
              </List>
            </SubCategory>
          )}
        </Grid>
        <Grid item xs={7}>
          <SubCategory title={t('categoryNames.company.info')} mt={0}>
            <List component='nav'>
              <CustomListItem
                categoryName={t('companyInfo.position')}
                value='HR'
                isValue={true}
              />
              <CustomListItem
                categoryName={t('companyInfo.status')}
                value={currentUser?.user_status}
                isValue={true}
              />
              <CustomListItem
                categoryName={t('companyInfo.form.of.employment')}
                value={currentUser?.format_of_work}
                isValue={true}
              />
              <CustomListItem
                categoryName={t('companyInfo.language')}
                value='Remote'
                isLanguage={true}
                arrayOfValues={currentUser?.user_languages}
              />
              {currentUser?.assigned_hr_id && (
                <CustomListItem
                  categoryName={t('companyInfo.assignee.hr')}
                  isLink={true}
                  assigneePersonObj={mockUser}
                />
              )}
              {currentUser?.assigned_pm_id && (
                <CustomListItem
                  categoryName={t('companyInfo.assignee.pm')}
                  isLink={true}
                  assigneePersonObj={mockUser}
                />
              )}
              {currentUser?.assigned_sales_id && (
                <CustomListItem
                  categoryName={t('companyInfo.assignee.sales')}
                  isLink={true}
                  assigneePersonObj={mockUser}
                />
              )}
              {currentUser?.is_probation_period && (
                <CustomListItem
                  categoryName={t('companyInfo.probation.status')}
                  value={`${dayjs(currentUser?.probation_start_date).format(
                    'DD/MM/YYYY'
                  )} - ${dayjs(currentUser?.probation_end_date).format(
                    'DD/MM/YYYY'
                  )}`}
                  isDate={true}
                  isDivider={false}
                />
              )}
            </List>
          </SubCategory>
          <SubCategory title={t('categoryNames.general.info')}>
            <List component='nav'>
              <CustomListItem
                categoryName={t('companyInfo.birth.date')}
                value={dayjs(currentUser?.date_of_birth).format('DD/MM/YYYY')}
                isValue={true}
              />
              <CustomListItem
                categoryName={t('companyInfo.country')}
                value={currentUser?.country}
                isValue={true}
                isDivider={false}
              />
            </List>
          </SubCategory>
          <SubCategory title={t('categoryNames.employees.equipment')}>
            {equipmentMockData.map(
              ({inv_number, name, model, condition, date_of_issue}, index) => (
                <CustomAccordion title={name} key={index}>
                  <CustomListItem
                    categoryName={t('warehouseCategories.inventory.number')}
                    value={`${inv_number}`}
                    isValue={true}
                    justifyContent='space-between'
                  />
                  <CustomListItem
                    categoryName={t('warehouseCategories.name')}
                    value={name}
                    isValue={true}
                    justifyContent='space-between'
                  />
                  <CustomListItem
                    categoryName={t('warehouseCategories.model')}
                    value={model}
                    isValue={true}
                    justifyContent='space-between'
                  />
                  <CustomListItem
                    categoryName={t('warehouseCategories.condition')}
                    value={condition}
                    isValue={true}
                    justifyContent='space-between'
                  />
                  <CustomListItem
                    categoryName={t('warehouseCategories.date_of_issue')}
                    value={dayjs(date_of_issue).format('DD/MM/YYYY')}
                    isValue={true}
                    justifyContent='space-between'
                    isDivider={false}
                  />
                </CustomAccordion>
              )
            )}
          </SubCategory>
        </Grid>
      </Grid>
    </>
  );
};
