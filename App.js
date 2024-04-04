import { Main } from './main';
import store from './redux/store';
import { Provider } from 'react-redux';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

export default function App() {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </Provider>
  );
}
