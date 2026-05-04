import { ProductCard, Title } from '@/components';
import styled from 'styled-components';

type Variant = 'grid' | 'list';

const VARIANT_GRID: Variant = 'grid';
const VARIANT_LIST: Variant = 'list';

interface Phone {
  id: string;
  imageUrl: string;
  brand: string;
  basePrice: number;
  name: string;
}

interface ProductCardListProps {
  label?: string;
  phones: Phone[];
  variant: Variant;
  onClick: (id: string, name: string) => void;
}

const GridContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: Variant }>`
  ${({ variant }) =>
    variant === VARIANT_GRID &&
    `
      display: grid;
      width: 100%;
  `}

  ${({ variant }) =>
    variant === VARIANT_LIST &&
    `
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      white-space: nowrap;
      padding-bottom: 40px;

      &::-webkit-scrollbar {
        height: 1px;
      }

      &::-webkit-scrollbar-track {
        background-color: var(--color-gray);
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--primary-color);
      }
  `}

  @media (max-width: 767px) {
    ${({ variant }) =>
      variant === VARIANT_GRID &&
      `
        grid-template-columns: minmax(0, 1fr);
    `}
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    ${({ variant }) =>
      variant === VARIANT_GRID &&
      `
        grid-template-columns: repeat(2, minmax(0, 1fr));
    `}
  }

  @media (min-width: 1024px) and (max-width: 1439px) {
    ${({ variant }) =>
      variant === VARIANT_GRID &&
      `
        grid-template-columns: repeat(3, minmax(0, 1fr));
    `}
  }

  @media (min-width: 1440px) and (max-width: 1719px) {
    ${({ variant }) =>
      variant === VARIANT_GRID &&
      `
        grid-template-columns: repeat(4, minmax(0, 1fr));
    `}
  }

  @media (min-width: 1720px) {
    ${({ variant }) =>
      variant === VARIANT_GRID &&
      `
        grid-template-columns: repeat(5, minmax(0, 1fr));
    `}
  }
`;

const ProductCardList = ({
  label,
  phones,
  variant = VARIANT_GRID,
  onClick,
}: ProductCardListProps) => {
  return (
    <>
      {label && (
        <Title uppercase variant="medium" mb="20px">
          {label}
        </Title>
      )}
      <GridContainer variant={variant}>
        {phones?.map((phone, index) => (
          <ProductCard
            key={`${phone.id}-${index}`}
            name={phone.name}
            image={phone.imageUrl}
            brand={phone.brand}
            price={phone.basePrice}
            onClick={() => onClick(phone.id, phone.name)}
          />
        ))}
      </GridContainer>
    </>
  );
};

ProductCardList.displayName = 'ProductCardList';

export default ProductCardList;
