import { render } from '@testing-library/react';

import SchedulePage from './schedule';

describe('SchedulePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SchedulePage title="SchedulePage" />);
    expect(baseElement).toBeTruthy();
  });
});
