import qs from 'querystring'

export const apiLink = (route: string, payload: object | void) => {
  return `/api/reviews?${qs.stringify({ ...payload, route })}`
}
/**
 * Handle Fetch response
 * @param res Response object
 */
export const handleRes = (res: Response) => {
  if (res.ok) {
    return res.json()
  }
  console.error(res.statusText)
  return null
}

/**
 * Get Parsed HTML from HTML string
 * @param htmlStr Html String
 */
export const getHtml = (htmlStr: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlStr, 'text/html')
  return doc
}

/**
 * Search for attribute and fetch its value
 * @param doc Source document or Element
 * @param attr Attribute to fetch
 */
export const getAttr = (doc: Document | Element, attr: string): any => {
  const node = doc.querySelector(`[${attr}]`)
  return node ? node.getAttribute(attr) : undefined
}

/**
 * Extract text from unknown element
 * @param el Element to get text from
 */
export const getText = (el: Element | null) => (el ? el.textContent || '' : '')
