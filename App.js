import { Main } from './main';
import store from './redux/store';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { CustomDarkTheme, CustomDefaultTheme, LightTheme } from './themes/themeProvider';
export default function App() {

  const theme = {
    // ...DefaultTheme,
    colors: {
      // ...DefaultTheme.colors,
      "primary": "rgb(120, 69, 172)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(240, 219, 255)",
      "onPrimaryContainer": "rgb(44, 0, 81)",
      "secondary": "rgb(102, 90, 111)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(237, 221, 246)",
      "onSecondaryContainer": "rgb(33, 24, 42)",
      "tertiary": "rgb(128, 81, 88)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(255, 217, 221)",
      "onTertiaryContainer": "rgb(50, 16, 23)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 255 255)",
      "onBackground": "rgb(29, 27, 30)",
      "surface": "rgb(255, 255, 255)",
      "onSurface": "rgb(29, 27, 30)",
      "surfaceVariant": "rgb(233, 223, 235)",
      "onSurfaceVariant": "rgb(74, 69, 78)",
      "outline": "rgb(124, 117, 126)",
      "outlineVariant": "rgb(204, 196, 206)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(50, 47, 51)",
      "inverseOnSurface": "rgb(245, 239, 244)",
      "inversePrimary": "rgb(220, 184, 255)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(248, 242, 251)",
        "level2": "rgb(244, 236, 248)",
        "level3": "rgb(240, 231, 246)",
        "level4": "rgb(239, 229, 245)",
        "level5": "rgb(236, 226, 243)"
      },
      "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
      "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
      "backdrop": "rgba(51, 47, 55, 0.4)"

    },
    // "fonts": {
    //   "regular": {
    //     "fontFamily": 'Roboto-Regular',
    //     "fontWeight": '400',
    //   },
    //   'medium': {
    //     "fontFamily": 'Roboto-Medium',
    //     "fontWeight": '500',
    //   },
    // },
    fontSizes: {
      "xs": 11,
      "sm": 13,
      "md": 15,
      "lg": 17,
      "xl": 18,
      "h3": 22,
      "h2": 28,
      "h1": 34
    },
    iconSizes: {
      "xs": 15,
      "sm": 20,
      "md": 25,
    }
  };

  // const theme = LightTheme || CustomDarkTheme;
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </Provider>
  );
}
