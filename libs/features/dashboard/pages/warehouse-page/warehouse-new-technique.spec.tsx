import { render } from '@testing-library/react';

import WarehouseNewTechniquePage from './warehouse-new-technique';

describe('WarehouseNewTechniquePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <WarehouseNewTechniquePage title="WarehouseNewTechniquePage" />
    );
    expect(baseElement).toBeTruthy();
  });
});
