import { Container, Content, Button, Icon, Title } from './styles';

interface HeaderProps {
  title: string;
  onGoback?(): void;
}

const Header = ({ title, onGoback }: HeaderProps): JSX.Element => {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        {onGoback && (
          <Button onPress={onGoback}>
            <Icon name="arrow-left" />
          </Button>
        )}
      </Content>
    </Container>
  );
};

export default Header;
