import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthguardServiceService {
  env = environment;
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };

  login(username: string, password: string) {
    return this.httpClient.post(
      this.env.baseURI + 'user/login',
      {
        username,
        password,
      },
      this.httpOptions
    );
  }
}
