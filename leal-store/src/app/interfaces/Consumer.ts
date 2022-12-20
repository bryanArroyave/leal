import { HttpClient } from '@angular/common/http';

export default class Consumer {
  constructor(private http: HttpClient) {
    this.http = http;
  }
  protected post(url: string, body: any, options?: any) {
    return this.http.post(url, body, options);
  }

  protected get(url: string, options?: any) {
    return this.http.get(url, options);
  }
}
