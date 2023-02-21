import { render } from '@testing-library/react';

import ErrorPage from './error';

describe('ErrorPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorPage title="404" />);
    expect(baseElement).toBeTruthy();
  });
});
