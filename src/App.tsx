import { ToastProvider } from './components/ui/Toast';
import { Home } from './pages/Home';

function App() {
  return (
    <ToastProvider>
      <Home />
    </ToastProvider>
  );
}

export default App;
