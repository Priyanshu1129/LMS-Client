import { Main } from './main';
import store from './redux/store';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { CustomDarkTheme, CustomDefaultTheme } from './themes/themeProvider';
export default function App() {
  const colorScheme = useColorScheme();
  const theme = CustomDefaultTheme

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </Provider>
  ); a
}
