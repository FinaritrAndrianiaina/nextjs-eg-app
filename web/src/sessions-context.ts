export class SessionsContext {
  private request: Record<string, object> | undefined;

  constructor() {}

  getRequest() {
    return this.request;
  }

  setRequest(request: Record<string, object>) {
    this.request = request;
  }
}
