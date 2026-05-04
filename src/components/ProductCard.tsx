import { Image } from '@/components';
import { LITERALS } from '@/data';
import styled from 'styled-components';

interface ProductCardProps {
  brand: string;
  name: string;
  price: number;
  image: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const StyledCard = styled.article`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  min-height: 344px;
  flex-direction: column;
  justify-content: space-between;
  border: 0.5px solid var(--text-color);
  align-items: center;
  padding: 16px;
  z-index: 2;
  background-color: ${(props) => props.theme.background};
  color: var(--text-color);
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color);
  }
`;

const Info = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 14.51px;
  width: 100%;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Paragraph = styled.p`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${StyledCard}:hover & {
    color: var(--color-white);
  }
`;

const Brand = styled.p`
  display: flex;
  font-size: var(--font-size-xxs);
  line-height: 10.51px;
  color: #79736d;
  ${StyledCard}:hover & {
    color: var(--color-white);
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 312px;
  height: calc(100% - 50px);
  position: relative;
  z-index: 3;
`;

const ProductCard = ({ brand, name, price, image, onClick }: ProductCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>);
    }
  };

  return (
    <StyledCard
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`${name} by ${brand}, ${price} ${LITERALS.CURRENCY}`}
    >
      <ImageWrapper>
        <Image src={image} width="100%" height="100%" objectFit="contain" alt={name} />
      </ImageWrapper>
      <Info>
        <Text>
          <Brand>{brand}</Brand>
          <Paragraph>{name}</Paragraph>
        </Text>
        <Paragraph>
          {price} {LITERALS.CURRENCY}
        </Paragraph>
      </Info>
    </StyledCard>
  );
};

ProductCard.displayName = 'ProductCard';

export default ProductCard;
