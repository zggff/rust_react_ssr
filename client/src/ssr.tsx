import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import App from './App'
import { StaticRouter } from 'react-router-dom/server'
import './index.scss'

export const Index = (params: string | undefined) => {
    const props = params ? JSON.parse(params) : {}
    const app = renderToString(
        <StaticRouter {...props}>
            <App />
        </StaticRouter>
    )

    return `<!doctype html>
  <html lang="en">
    <head>
      <title>React RUST SSR</title>
      <link rel="stylesheet" href="/styles/ssr.css">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    
    ${renderToStaticMarkup(
        <script
            dangerouslySetInnerHTML={{
                __html: `window.__INITIAL_PROPS__ =${JSON.stringify(
                    params
                ).replace(/</g, '\\u003c')}`,
            }}
        />
    )}
    <body>
      <div id="root">${app}</div>
    </body>
      
    
    <script async defer src="/scripts/bundle.js"></script>
  </html>`
}
