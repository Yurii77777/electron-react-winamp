import { Header } from '../Header/Header';
import { HeaderVariant } from '../Header/types';
import { Container } from './components/Container/Container';

const Playlist = () => {
  return (
    <section className="flex flex-col flex-1 bg-baseBlack">
      <Header variant={HeaderVariant.Secondary} />
      <Container />
    </section>
  );
};

export default Playlist;
