# borsa.

borsa. is a React Native-based stock market tracking application. The app lists all stock symbols on the home page and provides real-time data, charts, and news on the details page.

## 📌 Features

- **Home Page**: View all stock symbols
- **Details Page**: Real-time data, charts, and news for selected symbols
- **State Management with Redux**
- **Navigation with React Navigation**
- **API Communication with Axios**
- **Custom Splash Screen with Bootsplash**

## 📂 Project Structure

```bash
src/
├── components/        # Reusable components
├── hooks/             # Custom hooks
├── icons/             # Icons used in the app
├── navigation/        # Navigation setup
├── network/           # API requests and management
├── screens/           # Application screens
├── store/             # Redux state and actions
├── utils/             # Utility functions
├── library/
│   ├── theme/             # Theme management
│   ├── componentMemoiser/ # Component memoization
```

## 🛠 Installation

Follow these steps to run the project:

**Install dependencies:**

```sh
npm install
```

**Bundle Install:(for ios)**

```sh
bundle install
```

**Install iOS pods:(for ios)**

```sh
npx pod-install
```

**Run on Android:**

```sh
npm run android
```

**Run on iOS:**

```sh
npm run ios
```

> ⚠️ Before running on iOS, make sure to execute `npx pod-install`.

## 📦 Dependencies

- **React Native** (`react-native@0.78.0`)
- **React Navigation** (`@react-navigation/native`, `@react-navigation/stack`)
- **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`)
- **React Native Gesture Handler** (`react-native-gesture-handler`)
- **Axios** (`axios`)
- **React Native SVG** (`react-native-svg`)
- **React Native Bootsplash** (`react-native-bootsplash`)
- **React Native Vector Icons** (`react-native-vector-icons`)
- **Reactotron** (`reactotron-react-native`, `reactotron-redux`)

## 👨‍💻 Author

Murat ATALIK
