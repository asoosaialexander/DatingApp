import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './models/User';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  rootUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getUsersWithRoles() {
    return this.httpClient.get<Partial<User[]>>(
      this.rootUrl + 'admin/users-with-roles'
    );
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.httpClient.post(
      this.rootUrl + 'admin/edit-roles/' + username + '?roles=' + roles,
      {}
    );
  }
}
