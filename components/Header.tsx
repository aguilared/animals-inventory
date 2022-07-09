import Container from "./Container";
import Navigation from "./Navigation";

const Header: React.FC = () => (
  <header className="py-2">
    <Container>
      <Navigation />
    </Container>
  </header>
);

export default Header;
