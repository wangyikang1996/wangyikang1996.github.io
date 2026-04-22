import { useEffect } from 'react';
import { useLocalState } from './hooks/useLocalState';
import TerminalDirection from './components/TerminalDirection';

export default function App() {
  const [theme, setTheme] = useLocalState('yw.theme', 'dark');

  useEffect(() => {
    document.body.dataset.direction = 'terminal';
    document.body.dataset.theme = theme;
  }, [theme]);

  return <TerminalDirection theme={theme} setTheme={setTheme} />;
}
