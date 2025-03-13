# borsa.

borsa. is a React Native-based stock market tracking application. The app lists all stock symbols on the home page and provides real-time data, charts, and news on the details page.

## 📌 Features

- **Home Page**: View all stock symbols
- **Details Page**: Real-time data, charts, and news for selected symbols
- **State Management with Redux**
- **Navigation with React Navigation**
- **API Communication with Axios**
- **Custom Splash Screen with Bootsplash**

## 🎬 Demo

![Demo GIF](demo/demo.gif)

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

## 🛠 Environment Variables

To configure the project, create a .env file in the root directory and add the following variables:

- AUTH_TOKEN=AUTH_TOKEN_HERE
- BASE_URL= BASE_URL_HERE
- STOCK_LIST_PATH=STOCK_LIST_PATH_HERE
- NEWS_PATH=NEWS_PATH_HERE
- SNAPSHOT_PATH=SNAPSHOT_PATH_HERE

Replace **AUTH_TOKEN_HERE**, **BASE_URL_HERE**, **STOCK_LIST_PATH_HERE**, **NEWS_PATH_HERE**, and **SNAPSHOT_PATH_HERE** with the appropriate values.

## 👨‍💻 Author

Murat ATALIK
