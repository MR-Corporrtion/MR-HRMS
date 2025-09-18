// pages/_app.tsx
import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import store from "../redux/store"; // Adjust the path to your store file
import { AnnouncementProvider } from "../components/admin/announcement/AnnouncementContext"; 

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <AnnouncementProvider>
        <Component {...pageProps} />
      </AnnouncementProvider>
    </Provider>
  );
}

export default App;
