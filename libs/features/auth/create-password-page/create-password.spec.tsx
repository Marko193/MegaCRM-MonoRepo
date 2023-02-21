import { render } from '@testing-library/react';

import CreatePasswordPage from './create-password';

describe('CreatePasswordPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CreatePasswordPage title="CreatePasswordPage" />
    );
    expect(baseElement).toBeTruthy();
  });
});
