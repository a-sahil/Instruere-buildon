
import MainPage from './components/MainPage';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Home: React.FC = () => {
    return (
        <main>
          <MainPage />
          <ConnectButton />
        </main>
    );
};

export default Home;
