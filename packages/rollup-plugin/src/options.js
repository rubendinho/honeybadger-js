const MAX_RETRIES = 10
const DEFAULT_RETRIES = 3
const DEFAULT_ENDPOINT = 'https://api.honeybadger.io/v1/source_maps'
const DEFAULT_REVISION = 'master'
const DEFAULT_SILENT = false

const required = [
  'apiKey',
  'assetsUrl'
]

const defaultOptions = {
  endpoint: DEFAULT_ENDPOINT, 
  retries: DEFAULT_RETRIES, 
  revision: DEFAULT_REVISION, 
  silent: DEFAULT_SILENT
}

export function cleanOptions(options) {
  // Validate presence of required fields
  required.forEach(field => {
    if (!options || !options[field]) {
      throw new Error(`${field} is required`)
    }
  })
  // Don't allow excessive retries
  if (options.retries > MAX_RETRIES) {
    if (!options.silent) {
      console.warn(`Using max retries: ${MAX_RETRIES}`)
    }
    options.retries = MAX_RETRIES
  }
  // Merge in our defaults
  return { ...options, ...defaultOptions }
}
