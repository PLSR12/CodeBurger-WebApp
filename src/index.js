import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'

import AppRoutes from './routes/routes'
import GlobalStyles from './styles/GlobalStyles'
import { AppProvider} from './hooks'

ReactDOM.render(
  <>
    <AppProvider>
      <AppRoutes/>
    </AppProvider>
    <ToastContainer autoClose={2500} theme='colored' />
    <GlobalStyles />
  </>,
  document.getElementById('root')
)
