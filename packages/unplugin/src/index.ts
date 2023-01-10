import { createUnplugin } from 'unplugin';
import type { Options } from './types';

const defaultOptions: Partial<Options> = {
  silent: false
}

export default createUnplugin<Options>((options) => {
  const { silent, apiKey } = {...defaultOptions, ...options}

  return {
    name: 'unplugin-honeybadger',
    writeBundle: async () => {
      if (!silent) {
        console.info(`writeBundle called, apiKey was ${apiKey}`)
      }
    },
  }
})

