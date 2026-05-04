import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';

describe('Footer Component', () => {
  it('calculates the total price of items in the cart', () => {
    const data = [{ basePrice: 500, price: 550 }, { basePrice: 200 }];
    render(
      <BrowserRouter>
        <Footer data={data} totalItems={2} isMobile={true} />
      </BrowserRouter>,
    );

    expect(screen.getByText(/750/)).toBeInTheDocument();
  });
});
