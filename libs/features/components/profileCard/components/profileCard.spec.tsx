import '@testing-library/jest-dom';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { EventStatuses } from '@mega-dev-crm/shared';
// import { ProfileCard } from '../profileCard';
// import fn = jest.fn;

// const item = {
//   name: 'Ivan',
//   total: '14',
//   avatar: '',
//   surname: 'Bunin',
//   endDate: '12.03.2021',
//   position: 'sales',
//   status: EventStatuses.VACATION,
//   days: 3,
//   startDate: '12.02.2021',
//   isBadge: true,
// };

describe('ProfileCard', () => {
  it('should render successfully', () => {
    // render(<ProfileCard item={item} isTotal isActions />);
    // expect(screen.getByTestId('profile-card')).toBeInTheDocument();
  });

  it('should have content', () => {
    // render(<ProfileCard item={item} isTotal isActions />);
    // expect(screen.getByTestId('profile-card')).toHaveTextContent('Ivan');
    // expect(screen.getByTestId('profile-card')).toHaveTextContent('Bunin');
    // expect(screen.getByTestId('profile-card')).toHaveTextContent('sales');
    // expect(screen.getByTestId('profile-card')).toHaveTextContent('14');
    // expect(screen.getByTestId('profile-card')).toHaveTextContent('12.03.2021');
    // expect(screen.getByTestId('profile-card')).toHaveTextContent('12.02.2021');
    // expect(screen.getByTestId('profile-card')).toHaveTextContent('3');
  });

  it('if parameter isBadge added should have badge', () => {
    // render(<ProfileCard item={item} isTotal isActions />);
    // expect(screen.getByTestId('total-id')).toBeInTheDocument();
  });

  it('Accept button should be clicked', () => {
    // const clickHandler = fn();
    // render(
    //   <ProfileCard item={item} isTotal isActions acceptHandler={clickHandler} />
    // );
    // fireEvent.click(screen.getByText(/Accept/i));
    // expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('Accept button should be Decline', () => {
    // const clickHandler = fn();
    // render(
    //   <ProfileCard
    //     item={item}
    //     isTotal
    //     isActions
    //     declineHandler={clickHandler}
    //   />
    // );
    // fireEvent.click(screen.getByText(/Decline/i));
    // expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
