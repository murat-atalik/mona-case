var reactotron = undefined as any;
if (__DEV__) {
  try {
    const Reactotron = require('reactotron-react-native').default;
    const {reactotronRedux} = require('reactotron-redux');

    reactotron = Reactotron.configure({name: 'Borsa.'})
      .use(reactotronRedux())
      .connect();
  } catch (error) {
    console.error(error);
  }
} else {
  reactotron = undefined;
}

export default reactotron;
