import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { PaginatedResults } from '../models/pagination';
import { User } from '../models/User';
import { UserParams } from '../models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResults, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  rootUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(userParams: UserParams) {
    this.userParams = userParams;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) return of(response);

    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResults<Member[]>(
      this.rootUrl + 'users',
      params,
      this.httpClient
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, ele) => arr.concat(ele.results), [])
      .find((member: Member) => member.username === username);

    if (member) return of(member);

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

  addLike(username: string) {
    return this.httpClient.post(this.rootUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);

    return getPaginatedResults<Partial<Member[]>>(
      this.rootUrl + 'likes',
      params,
      this.httpClient
    );
  }
}
