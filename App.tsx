import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppContainer} from './src/AppContainer';
import {AppThemeContextProvider} from './src/library/theme/useCustomTheme';
import {AppStatusBar} from './src/components';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <AppThemeContextProvider>
          <AppStatusBar />
          <AppContainer />
        </AppThemeContextProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
