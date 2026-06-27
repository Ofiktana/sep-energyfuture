import { useApp } from './context/AppContext';
import AuthScreen from './components/AuthScreen';
import MainApp from './components/MainApp';

export default function App() {
  const { user } = useApp();

  return user ? <MainApp /> : <AuthScreen />;
}
