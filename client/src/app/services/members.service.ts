import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  rootUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getMembers() {
    return this.httpClient.get<Member[]>(this.rootUrl + 'users');
  }

  getMember(username: string) {
    return this.httpClient.get<Member>(this.rootUrl + 'users/' + username);
  }
}
