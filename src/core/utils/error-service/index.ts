import { HTTP_STATUS } from '@/core/constants/http-status';

type ErrorDetails = { [key in string]: unknown };
type StatusCode = keyof typeof HTTP_STATUS;

export class ErrorService extends Error {
  constructor(
    public status: StatusCode,
    public msg?: null | string,
    public details?: ErrorDetails
  ) {
    super(msg || ErrorService.getMessageForCode(status));
    Object.setPrototypeOf(this, ErrorService.prototype);
  }

  private static getMessageForCode(status: StatusCode): string {
    return HTTP_STATUS[status] || 'Unknown Error';
  }

  public toJSON() {
    return {
      details: this.details,
      message: this.message,
      status: this.status,
    };
  }
}
