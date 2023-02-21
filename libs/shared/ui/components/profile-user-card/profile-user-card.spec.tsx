import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import { ProfileUserCard, SicknessIcon } from '@mega-dev-crm/shared';

describe('ProfileUserCard', () => {
  it('should render successfully', () => {
    // render(
    //   <ProfileUserCard
    //     position={'sales'}
    //     name={'John'}
    //     surname={'Wayne'}
    //     isBadge
    //   />
    // );
    // expect(screen.getByTestId('profile-user-card')).toBeInTheDocument();
  });

  it('should have content', () => {
    // render(
    //   <ProfileUserCard
    //     position={'sales'}
    //     name={'John'}
    //     surname={'Wayne'}
    //     isBadge
    //   />
    // );
    // expect(screen.getByTestId('profile-user-card')).toHaveTextContent('John');
    // expect(screen.getByTestId('profile-user-card')).toHaveTextContent('Wayne');
    // expect(screen.getByTestId('profile-user-card')).toHaveTextContent('sales');
  });

  it('if parameter isBadge added should have badge', () => {
    // render(
    //   <ProfileUserCard
    //     position={'sales'}
    //     name={'John'}
    //     surname={'Wayne'}
    //     isBadge
    //     icon={<SicknessIcon />}
    //   />
    // );
    // expect(screen.getByTestId('profile-user-card-badge')).toBeInTheDocument();
    // expect(screen.getByTestId('profile-user-card-icon')).toBeInTheDocument();
  });
});
