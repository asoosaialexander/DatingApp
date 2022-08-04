import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  rootUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private httpClient: HttpClient) {}

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.httpClient.get<Member[]>(this.rootUrl + 'users').pipe(
      map((members) => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find((x) => x.username === username);
    if (member !== undefined) return of(member);
    return this.httpClient.get<Member>(this.rootUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.httpClient.put(this.rootUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.findIndex(
          (x) => x.username === member.username
        );
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.httpClient.put(
      this.rootUrl + 'users/set-main-photo/' + photoId,
      {}
    );
  }

  deletePhoto(photoId: number) {
    return this.httpClient.delete(
      this.rootUrl + 'users/delete-photo/' + photoId
    );
  }
}
