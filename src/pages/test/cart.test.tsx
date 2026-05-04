import { LITERALS } from '@/data';
import { Cart } from '@/pages/cart';
import { useAppContext } from '@/store/context';
import { CART_MOCK } from '@/test/mock';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

describe('Cart Component Products', () => {
  beforeEach(() => {
    (window.matchMedia as unknown as Mock).mockImplementation((query) => ({
      matches: query === '(max-width: 640px)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    (useAppContext as Mock).mockReturnValue({
      cart: CART_MOCK,
      setCart: vi.fn(),
    });
  });

  it('renders cart title with item count', () => {
    render(<Cart />);

    expect(
      screen.getByText((content) => content.startsWith(`${LITERALS.TITLE_CART}(2)`)),
    ).toBeInTheDocument();
  });

  it('renders cart title and item list', () => {
    const { container } = render(<Cart />);

    expect(
      screen.getByText((content) => content.startsWith(`${LITERALS.TITLE_CART}(2)`)),
    ).toBeInTheDocument();

    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('128GB | Black')).toBeInTheDocument();
    expect(screen.getByText('256GB | White')).toBeInTheDocument();
    expect(screen.getByText(`100 ${LITERALS.CURRENCY}`)).toBeInTheDocument();
    expect(screen.getByText(`200 ${LITERALS.CURRENCY}`)).toBeInTheDocument();
    expect(container).toBeDefined();
  });

  it('renders total price correctly', async () => {
    render(<Cart />);

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText(`300 ${LITERALS.CURRENCY}`)).toBeInTheDocument();
  });

  it('calls setCart with updated cart when item is removed', async () => {
    const mockSetCart = vi.fn();
    (useAppContext as Mock).mockReturnValue({
      cart: CART_MOCK,
      setCart: mockSetCart,
    });

    render(<Cart />);

    const removeButton = screen.getByTestId('remove-item-1');
    fireEvent.click(removeButton);

    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith([CART_MOCK[0]]);
  });

  it('displays an alert with the correct message when the "Pay" button is clicked', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Cart />);

    const payButton = screen.getByText(LITERALS.PAY);
    fireEvent.click(payButton);

    expect(alertSpy).toHaveBeenCalledWith(LITERALS.PAY);
    alertSpy.mockRestore();
  });
});

describe('Cart Component 1 product', () => {
  beforeEach(() => {
    (window.matchMedia as unknown as Mock).mockImplementation((query) => ({
      matches: query === '(max-width: 640px)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    (useAppContext as Mock).mockReturnValue({
      cart: [CART_MOCK[0]],
      setCart: vi.fn(),
    });
  });

  it('calls setCart with updated cart when item is removed', async () => {
    const { setCart } = useAppContext();
    render(<Cart />);

    expect(
      screen.getByText((content) => content.startsWith(`${LITERALS.TITLE_CART}(1)`)),
    ).toBeInTheDocument();

    const removeButton = screen.getByText(
      (content) => content.includes(LITERALS.REMOVE),
    );
    fireEvent.click(removeButton);

    expect(setCart).toHaveBeenCalledTimes(1);
    expect(setCart).toHaveBeenCalledWith([]);
  });
});

describe('Cart Component 0 products', () => {
  beforeEach(() => {
    (window.matchMedia as unknown as Mock).mockImplementation((query) => ({
      matches: query === '(max-width: 640px)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    (useAppContext as Mock).mockReturnValue({
      cart: [],
      setCart: vi.fn(),
    });
  });

  it('renders correctly when the cart is empty', async () => {
    render(<Cart />);

    expect(screen.getByText(`${LITERALS.TITLE_CART}(0)`)).toBeInTheDocument();
    expect(screen.getByText(LITERALS.BACK_TO_SHOPPING)).toBeInTheDocument();
    expect(screen.queryByText(LITERALS.REMOVE)).not.toBeInTheDocument();
  });
});
