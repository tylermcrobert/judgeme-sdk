export declare const apiLink: (route: string, payload: object | void) => string;
/**
 * Handle Fetch response
 * @param res Response object
 */
export declare const handleRes: (res: Response) => Promise<any> | null;
/**
 * Get Parsed HTML from HTML string
 * @param htmlStr Html String
 */
export declare const getHtml: (htmlStr: string) => Document;
/**
 * Search for attribute and fetch its value
 * @param doc Source document or Element
 * @param attr Attribute to fetch
 */
export declare const getAttr: (doc: Document | Element, attr: string) => any;
/**
 * Extract text from unknown element
 * @param el Element to get text from
 */
export declare const getText: (el: Element | null) => string;
