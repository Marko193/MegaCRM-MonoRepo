// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { AuthLayout } from '@mega-dev-crm/features';

describe('test component props', () => {
  describe('test component with title prop', () => {
    it('should render components with title props', () => {
      // render(<AuthLayout title="Hello" />);
      // const HelloTitle = screen.getByText('Hello');
      // expect(HelloTitle).toBeInTheDocument();
      // expect(HelloTitle).toBeVisible();
    });
    it('should render components without title props', () => {
      // render(<AuthLayout />);
      // const HelloTitle = screen.getByText('Hi, Welcome Back');
      // expect(HelloTitle).toBeInTheDocument();
      // expect(HelloTitle).toBeVisible();
    });
  });

  describe('test component with image prop', () => {
    // it('should render components with image props', () => {
    //   const { getByAltText } = render(<AuthLayout image="/image.jpeg" />);
    //   const image = getByAltText('authImage');
    //   expect(image).toHaveAttribute('src', '/image.jpeg');
    //   expect(image).toBeInTheDocument();
    // });
    it('should render components without image props', () => {
      // const { getByAltText } = render(<AuthLayout />);
      // const image = getByAltText('authImage');
      // expect(image).toHaveAttribute('src', '/assets/welcomeback.png');
      // expect(image).toBeInTheDocument();
    });
  });
});
