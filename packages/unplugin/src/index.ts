import { createUnplugin } from 'unplugin';
import type { Options } from './types';

const defaultOptions: Partial<Options> = {
  silent: false
}

export default createUnplugin<Options>((options = {}) => {
  const { silent } = {...defaultOptions, ...options}
  return {
    name: 'unplugin-honeybadger',
    async writeBundle() {
      if (!silent) {
        console.info('writeBundle hook called')
      }
    },
  }
})

