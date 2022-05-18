import Header from '@modules/components/Header';
import Button from '@modules/components/Button';
import { categories, Category } from '@shared/utils/categories';
import { useCallback } from 'react';
import {
  Container,
  Content,
  CategoriesList,
  CategoryButton,
  Icon,
  Name,
} from './styles';

type CategorySelectProps = {
  category: Category;
  onClose(): void;
  setCategory(category: Category): void;
};

const CategorySelect = ({
  category,
  onClose,
  setCategory,
}: CategorySelectProps): JSX.Element => {
  const handleSelectCategory = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Container>
      <Header title="Selecionar categoria" />
      <Content>
        <CategoriesList>
          {categories.map(({ icon, color, name, key }) => (
            <CategoryButton
              selected={category.key === key}
              key={key}
              color={color}
              onPress={() =>
                setCategory({
                  icon,
                  color,
                  name,
                  key,
                })
              }
            >
              <Icon name={icon} color={color} selected={category.key === key} />
              <Name color={color} selected={category.key === key}>
                {name}
              </Name>
            </CategoryButton>
          ))}
        </CategoriesList>
        <Button onPress={handleSelectCategory}>Selecionar</Button>
      </Content>
    </Container>
  );
};

export default CategorySelect;
