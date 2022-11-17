import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.scss'

const props = (() => {
    const stateHolder = window as { __INITIAL_PROPS__?: string }
    const ssrState = stateHolder.__INITIAL_PROPS__

    if (ssrState) {
        delete stateHolder.__INITIAL_PROPS__
        return JSON.parse(ssrState)
    }
    return {}
})()

if (process.env.NODE_ENV !== 'production') {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )
} else {
    ReactDOM.hydrateRoot(
        document.getElementById('root') as HTMLElement,
        <BrowserRouter>
            <App {...props} />
        </BrowserRouter>
    )
}
