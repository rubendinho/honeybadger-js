import originalFetch, { FormData, fileFrom } from 'node-fetch'
import fetchRetry from 'fetch-retry';
import { HbPluginOptions, SourcemapInfo } from './types';
// @ts-ignore
const fetch = fetchRetry(originalFetch)

/******************************
 * Everything in this file is designed to be shared with the webpack plugin
 * e.g. by removing specifics about how the bundle is formatted 
 * In a follow-up, we can extract this into a module to share among the plugins
*******************************/

/**
 * Uploads sourcemaps to API endpoint
 */
export async function uploadSourcemaps(sourcemapData: SourcemapInfo[], hbOptions: HbPluginOptions) {
  if (sourcemapData.length === 0 && !hbOptions.silent) {
    console.warn('Could not find any sourcemaps in the bundle. Nothing will be uploaded.')
  }

  const sourcemapUploadPromises = sourcemapData.map(data => {
    return uploadSourcemap(data, hbOptions)
  })
  
  return Promise.all(sourcemapUploadPromises)
}

/**
 * Executes an API call to upload a single sourcemap
 */
export async function uploadSourcemap (
    sourcemapData: SourcemapInfo, 
    hbOptions: HbPluginOptions
  ): Promise<Response> {
  const body = await buildBodyForSourcemapUpload(sourcemapData, hbOptions)
  
  let res: Response
  try {
    res = await fetch(hbOptions.endpoint, {
      method: 'POST',
      body,
      redirect: 'follow',
      retries: hbOptions.retries,
      retryDelay: 1000
    })
  } catch (err) {
    // network / operational errors. Does not include 404 / 500 errors
    throw new Error(`Failed to upload sourcemap ${sourcemapData.sourcemapFilename} to Honeybadger: ${err.name}`)
  }

  if (res.ok) {
    if (!hbOptions.silent) {
      console.info(`Successfully uploaded ${sourcemapData.sourcemapFilename} to Honeybadger`) 
    }
    return res
  } else {
    // Attempt to parse error details from response
    let details: string
    try {
      const body = await res.json()

      if (body && body.error) {
        details = `${res.status} - ${body.error}`
      } else {
        details = `${res.status} - ${res.statusText}`
      }
    } catch (parseErr) {
      details = `${res.status} - ${res.statusText}`
    }

    throw new Error(`Failed to upload sourcemap ${sourcemapData.sourcemapFilename} to Honeybadger: ${details}`)
  }
}

/**
 * Builds the form data for the API call
 */
export async function buildBodyForSourcemapUpload(
    sourcemapData: SourcemapInfo, 
    hbOptions: HbPluginOptions
  ): Promise<FormData> {
  const form = new FormData()
  
  const jsFile = await fileFrom(sourcemapData.jsFilePath, 'application/javascript')
  const sourcemapFile = await fileFrom(sourcemapData.sourcemapFilePath, 'application/octet-stream')
  const minifiedUrl = new URL(sourcemapData.jsFilename, hbOptions.assetsUrl).href

  form.append('api_key', hbOptions.apiKey)
  form.append('minified_url', minifiedUrl)
  form.append('revision', hbOptions.revision)
  form.append('minified_file', jsFile)
  form.append('source_map', sourcemapFile)

  return form
}
