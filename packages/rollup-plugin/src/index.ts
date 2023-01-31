import { cleanOptions } from './options.js'
import { extractSourcemapDataFromBundle } from './rollupUtils.js'
import { uploadSourcemaps } from './hbUtils.js'
import type { OutputOptions, OutputBundle } from 'rollup'
import type { HbPluginOptions } from './types.js'

export default function honeybadgerRollupPlugin(options: HbPluginOptions) {
  const hbOptions = cleanOptions(options)

  return {
    name: 'honeybadger', 
    writeBundle: async (
        outputOptions: OutputOptions, 
        bundle: OutputBundle
      ) => {
      const sourcemapData = extractSourcemapDataFromBundle(outputOptions, bundle)
      await uploadSourcemaps(sourcemapData, hbOptions)
    }
  }
}