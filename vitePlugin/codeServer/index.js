import os from 'os'

import {execSync} from 'child_process'
export default function GvaPositionServer() {
  return {
    name: 'gva-position-server',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _, next) => {
        if (req._parsedUrl.pathname === '/gvaPositionCode') {
          const path =
              req._parsedUrl.query && req._parsedUrl.query.split('=')[1]
          if (path && path !== 'null') {
            if (process.env.VITE_EDITOR == 'webstorm') {
              const lastColonIndex = path.lastIndexOf(':')
              const linePath = path.substring(lastColonIndex + 1)
              const filePath = path.substring(0, lastColonIndex)
              const platform = os.platform()
              if (platform === 'win32') {
                execSync(
                    `webstorm64.exe  --line ${linePath} ${filePath}`
                )
              } else {
                execSync(
                    `webstorm --line ${linePath} ${filePath}`
                )
              }
            } else {
              execSync('code -r -g ' + path)
            }
          }
        }
        next()
      })
    },
  }
}
