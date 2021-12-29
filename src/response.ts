
/**
 * This is default format on all response api.
 * All response will contains 3 key: status, message, and data
 * The data is generic type (T)
 */
export class GlobalResponse<T> {
    status: string  = 'Success';
    message: string = 'Success';
    data: T = null;

    constructor(data?: {
        status?: string,
        message?: string,
        data?: T
    }) {
        if(data) {
            this.status  = data.status  ??this.status;
            this.message = data.message ??this.message;
            this.data    = data.data    ??this.data;
        }
    }
}

export function empty(obj) {
    return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
}