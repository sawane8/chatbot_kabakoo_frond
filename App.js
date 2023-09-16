import * as React from 'react';
import Home from './Screens/Home';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux'
import Navigation from './Navigation'
import configureStore from './Components/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';


const {store, persistor} = configureStore();

export default function App() {

  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratBlack: require('./assets/fonts/Montserrat-Black.ttf'),
    MontserratBlackItalic: require('./assets/fonts/Montserrat-BlackItalic.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MontserratBoldItalic: require('./assets/fonts/Montserrat-BoldItalic.ttf'),
    MontserratExtraBold: require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    MontserratExtraBoldItalic: require('./assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
    MontserratExtraLight: require('./assets/fonts/Montserrat-ExtraLight.ttf'),
    MontserratExtraLightItalic: require('./assets/fonts/Montserrat-ExtraLightItalic.ttf'),
    MontserratItalic: require('./assets/fonts/Montserrat-Italic.ttf'),
    MontserratLight: require('./assets/fonts/Montserrat-Light.ttf'),
    MontserratLightItalic: require('./assets/fonts/Montserrat-LightItalic.ttf'),
    MontserratMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
    MontserratMediumItalic: require('./assets/fonts/Montserrat-MediumItalic.ttf'),
    MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratSemiBoldItalic: require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
    MontserratThin: require('./assets/fonts/Montserrat-Thin.ttf'),
    MontserratThinItalic: require('./assets/fonts/Montserrat-ThinItalic.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
