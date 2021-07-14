import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from 'react-query'

// Components
import {Header} from '../components/header/header'

// Redux
import { persistor, store } from '../redux/store/store'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <QueryClientProvider client={queryClient} >
        <Provider store={store} >
          <PersistGate persistor={persistor} >
            <div>
              <Header/>
              <Component {...pageProps} />
            </div>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
  )
}
export default MyApp
