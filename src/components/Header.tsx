import { Image } from '@/components';
import { URL_FRIENDLY } from '@/constants';
import { useAppContext } from '@/store/context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
`;

const Container = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0 auto;
  padding: 14px 16px;

  @media (min-width: 1280px) {
    max-width: 1720px;
  }

  @media (max-width: 768px) {
    max-width: 768px;
  }
`;

const Logo = styled(Link)`
  font-weight: var(--font-weight-bold);
  text-decoration: none;
`;

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);
  img {
    margin-right: 6px;
  }
`;

const Header = () => {
  const { cart } = useAppContext();

  const count = cart?.length;

  return (
    <StyledHeader>
      <Container aria-label="Main navigation">
        <Logo to={URL_FRIENDLY.BASE} aria-label="Home">
          <Image src="/logo.svg" alt="ZARA logo" />
        </Logo>
        <CartLink to={`/${URL_FRIENDLY.CART}`} aria-label={`Cart with ${count} items`}>
          <Image
            width="18px"
            src={count > 0 ? '/icons/bag-filled.svg' : '/icons/bag.svg'}
            alt=""
          />
          <span>{count}</span>
        </CartLink>
      </Container>
    </StyledHeader>
  );
};

Header.displayName = 'Header';

export default Header;
