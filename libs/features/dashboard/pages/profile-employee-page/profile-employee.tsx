import {FunctionComponent} from 'react';
// import { useParams } from 'react-router';
// import {Grid, List, Stack, Typography, useTheme} from '@mui/material';
// import {useTypedTranslation} from '../../../hooks';
// import {nameSpaces} from '../../../localization/typedNameSpaces';
// import {
//   BoyIcon,
//   ChangePasswordIcon,
//   ChildrenListItem,
//   ContactsLine,
//   CustomAccordion,
//   CustomListItem,
//   CustomTabs,
//   GirlIcon,
//   IconPositionsEnum,
//   ProfileHeader,
//   ProfileIcon,
//   ProfileUserCard,
//   RequestsIcon,
//   SubCategory,
//   TabsListItem,
//   TelegramIcon,
// } from '@mega-dev-crm/shared';
// import {BalanceCard} from '../../../components/balance-card/balance-card';
// import {Phone, Email, LinkedIn} from '@mui/icons-material';
// import {useEmployeeByIdSelector} from '@mega-dev-crm/data-access';
// import {useParams} from 'react-router';
// import {toNumber} from 'lodash';

export interface ProfileEmployeePageProps {
  title?: string;
}

export interface EquipmentItem {
  inv_number: number;
  name: string;
  model: string;
  condition: string;
  date_of_issue: string;
}

// const tabsList: TabsListItem[] = [
//   {
//     icon: <ProfileIcon />,
//     iconPosition: IconPositionsEnum.START,
//     label: 'categoryNames.profile',
//   },
//   {
//     icon: <RequestsIcon />,
//     iconPosition: IconPositionsEnum.START,
//     label: 'categoryNames.requests',
//   },
//   {
//     icon: <ChangePasswordIcon />,
//     iconPosition: IconPositionsEnum.START,
//     label: 'categoryNames.changePassword',
//   },
// ];

// const mockDataForBalanceCard: BalanceCardChildrenInterface[] = [
//   {
//     name: 'Filip',
//     surname: 'Kelenli',
//     avatar: 'https://www.w3schools.com/howto/img_avatar.png',
//     id: 1,
//   },
//   {
//     name: 'Filip',
//     surname: 'Kelenli',
//     avatar: 'https://www.w3schools.com/howto/img_avatar.png',
//     id: 2,
//   },
//   {
//     name: 'Filip',
//     surname: 'Kelenli',
//     avatar: 'https://www.w3schools.com/howto/img_avatar.png',
//     id: 3,
//   },
//   {
//     name: 'Filip',
//     surname: 'Kelenli',
//     avatar: 'https://www.w3schools.com/howto/img_avatar.png',
//     id: 4,
//   },
//   {
//     name: 'Filip',
//     surname: 'Kelenli',
//     avatar: 'https://www.w3schools.com/howto/img_avatar.png',
//     id: 5,
//   },
//   {
//     name: 'Filip',
//     surname: 'Kelenli',
//     avatar: 'https://www.w3schools.com/howto/img_avatar.png',
//     id: 6,
//   },
// ];

export const ProfileEmployeePage: FunctionComponent<
  ProfileEmployeePageProps
> = () => {
  // const {id} = useParams();
  // const {spacing} = useTheme();
  // const {t} = useTypedTranslation(nameSpaces.common);
  // const [value, setValue] = useState(0);
  // const currentUser = useEmployeeByIdSelector(toNumber(id));

  return (
    <>
      {/* {currentUser && (
        <Grid container p={spacing(3.75, 6.375, 3.75, 3.75)}>
          <Stack pb={4}>
            <Typography variant='h1' lineHeight='2.625'>
              {t('categoryNames.profile')}
            </Typography>
          </Stack>
          <ProfileHeader
            firstName={currentUser.name}
            lastName={currentUser.name}
            position='Director'
            coverImg='/assets/HeaderBackground.png'
            avatar={currentUser.avatar}>
            <CustomTabs tabsList={tabsList} handler={setValue} value={value} />
          </ProfileHeader>
          <Grid columnSpacing={2} container py={spacing(2)}>
            <Grid item xs={4}>
              <Stack>
                <BalanceCard title='balanceCard.available.balance' balance='24'>
                  {mockDataForBalanceCard.map(({name, surname, avatar, id}) => {
                    return (
                      <Grid item xs={4} key={id}>
                        <ProfileUserCard
                          showName={true}
                          name={name}
                          surname={surname}
                          image={avatar}
                          position='Manager'
                        />
                      </Grid>
                    );
                  })}
                </BalanceCard>
              </Stack>
              <SubCategory title='categoryNames.contacts'>
                <Stack pt={spacing(1.5)} spacing={2.25}>
                  <ContactsLine
                    isPhone={true}
                    value={currentUser.main_phone}
                    icon={<Phone />}
                  />
                  <ContactsLine
                    isMail={true}
                    value={currentUser.corporate_email}
                    icon={<Email />}
                  />
                  {currentUser.linkedin && (
                    <ContactsLine
                      isLink={true}
                      value={currentUser.linkedin}
                      icon={<LinkedIn />}
                    />
                  )}
                  {currentUser.telegram && (
                    <ContactsLine
                      isTelegram={true}
                      value={currentUser.telegram}
                      icon={
                        <TelegramIcon
                          height={spacing(2.5)}
                          width={spacing(2.5)}
                        />
                      }
                    />
                  )}
                </Stack>
              </SubCategory>
              <SubCategory title='categoryNames.children'>
                <List component='nav'>
                  <ChildrenListItem icon={<GirlIcon />}>
                    <Typography variant='body2' lineHeight={spacing(1.75)}>
                      Dreda (05/07/2014)
                    </Typography>
                    <Typography variant='body2' lineHeight={spacing(1.75)}>
                      Anna (01/03/2014)
                    </Typography>
                  </ChildrenListItem>
                  <ChildrenListItem icon={<BoyIcon />} isDivider={false}>
                    <Typography variant='body2' lineHeight={spacing(1.75)}>
                      Noah (09/07/2014)
                    </Typography>
                    <Typography variant='body2' lineHeight={spacing(1.75)}>
                      Brad (01/02/2014)
                    </Typography>
                  </ChildrenListItem>
                </List>
              </SubCategory>
            </Grid>
            <Grid item xs={8}>
              <SubCategory title='categoryNames.company.info' mt={0}>
                <List component='nav'>
                  <CustomListItem
                    categoryName='companyInfo.position'
                    value='HR'
                    isValue={true}
                  />
                  <CustomListItem
                    categoryName='companyInfo.status'
                    value={currentUser.user_status}
                    isValue={true}
                  />
                  <CustomListItem
                    categoryName='companyInfo.form.of.employment'
                    value={currentUser.format_of_work}
                    isValue={true}
                  />
                  <CustomListItem
                    categoryName='companyInfo.language'
                    value='Remote'
                    isLanguage={true}
                    arrayOfValues={[
                      {
                        language_level_info: 1,
                        language_name_id: 2,
                      },
                    ]}
                  />
                  <CustomListItem
                    categoryName='companyInfo.assignee.hr'
                    isLink={true}
                    assigneePersonID={currentUser.assigned_hr_id}
                  />
                  <CustomListItem
                    categoryName='companyInfo.assignee.pm'
                    isLink={true}
                    assigneePersonID={currentUser.assigned_pm_id}
                  />
                  <CustomListItem
                    categoryName='companyInfo.assignee.sales'
                    isLink={true}
                    assigneePersonID={currentUser.assigned_sales_id}
                  />
                  <CustomListItem
                    categoryName='companyInfo.probation.status'
                    value={`${currentUser.probation_start_date} - ${currentUser.probation_end_date}`}
                    isDate={true}
                    isDivider={false}
                  />
                </List>
              </SubCategory>
              <SubCategory title={'categoryNames.general.info'}>
                <List component='nav'>
                  <CustomListItem
                    categoryName='companyInfo.birth.date'
                    value={currentUser.date_of_birth}
                    isValue={true}
                  />
                  <CustomListItem
                    categoryName='companyInfo.country'
                    value={currentUser.country}
                    isValue={true}
                    isDivider={false}
                  />
                </List>
              </SubCategory>
              <SubCategory title={'categoryNames.employees.equipment'}>
                <CustomAccordion title='Macbook'>
                  <Typography>Equipment details</Typography>
                </CustomAccordion>
                <CustomAccordion title='Apple mouse' isDivider={false}>
                  <Typography>Equipment details</Typography>
                </CustomAccordion>
              </SubCategory>
            </Grid>
          </Grid>
        </Grid>
      )} */}
    </>
  );
};

export default ProfileEmployeePage;
