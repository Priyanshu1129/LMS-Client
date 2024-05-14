import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
export const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        "primary": "#ffffff",
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
        "background": "rgb(255, 251, 255)",
        "onBackground": "rgb(29, 27, 30)",
        "surface": "rgb(255, 251, 255)",
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
    "fonts": {
        "regular": {
            "fontFamily": 'Roboto-Regular',
            "fontWeight": '400',
        },
        'medium': {
            "fontFamily": 'Roboto-Medium',
            "fontWeight": '500',
        },
        // Add more font styles as needed...
    },
    "fontSizes": {
        "xs": 11,
        "s": 13,
        "m": 15,
        "l": 17,
        "h3": 22,
        "h2": 28,
        "h1": 34
    },
}

const DarkTheme =
{
    "colors": {
        "primary": "rgb(156, 202, 255)",
        "onPrimary": "rgb(0, 50, 87)",
        "primaryContainer": "rgb(0, 73, 123)",
        "onPrimaryContainer": "rgb(208, 228, 255)",
        "secondary": "rgb(186, 200, 219)",
        "onSecondary": "rgb(37, 49, 64)",
        "secondaryContainer": "rgb(59, 72, 87)",
        "onSecondaryContainer": "rgb(214, 228, 247)",
        "tertiary": "rgb(214, 190, 229)",
        "onTertiary": "rgb(58, 41, 72)",
        "tertiaryContainer": "rgb(82, 64, 96)",
        "onTertiaryContainer": "rgb(241, 218, 255)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(26, 28, 30)",
        "onBackground": "rgb(226, 226, 230)",
        "surface": "rgb(26, 28, 30)",
        "onSurface": "rgb(226, 226, 230)",
        "surfaceVariant": "rgb(66, 71, 78)",
        "onSurfaceVariant": "rgb(194, 199, 207)",
        "outline": "rgb(140, 145, 153)",
        "outlineVariant": "rgb(66, 71, 78)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(226, 226, 230)",
        "inverseOnSurface": "rgb(47, 48, 51)",
        "inversePrimary": "rgb(0, 98, 161)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(33, 37, 41)",
            "level2": "rgb(36, 42, 48)",
            "level3": "rgb(40, 47, 55)",
            "level4": "rgb(42, 49, 57)",
            "level5": "rgb(44, 52, 62)"
        },
        "surfaceDisabled": "rgba(226, 226, 230, 0.12)",
        "onSurfaceDisabled": "rgba(226, 226, 230, 0.38)",
        "backdrop": "rgba(44, 49, 55, 0.4)"
    }
}




export const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: LightTheme.colors,
    fonts: LightTheme.fonts,
    fontSizes: LightTheme.fontSizes,
};

export const CustomDarkTheme = {
    colors: DarkTheme.colors,
    fonts: LightTheme.fonts,
    fontSizes: LightTheme.fontSizes,
};
