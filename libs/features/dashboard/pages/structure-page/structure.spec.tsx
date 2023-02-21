import { render } from '@testing-library/react';

import StructurePage from './structure';

describe('StructurePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StructurePage title="StructurePage" />);
    expect(baseElement).toBeTruthy();
  });
});
