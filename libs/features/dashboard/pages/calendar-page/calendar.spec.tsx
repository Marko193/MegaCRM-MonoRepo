import { render } from '@testing-library/react';

import CalendarPage from './calendar';

describe('CalendarPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CalendarPage title="CalendarPage" />);
    expect(baseElement).toBeTruthy();
  });
});
