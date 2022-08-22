import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
import { PaginatedResults } from '../models/pagination';
import { getPaginatedResults, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  rootUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('container', container);

    return getPaginatedResults<Message[]>(
      this.rootUrl + 'messages',
      params,
      this.httpClient
    );
  }

  getMessageThread(username: string) {
    return this.httpClient.get<Message[]>(
      this.rootUrl + 'messages/thread/' + username
    );
  }

  sendMessage(username: string, content: string) {
    return this.httpClient.post<Message>(this.rootUrl + 'messages', {
      recipientUsername: username,
      content,
    });
  }

  deleteMessage(id: number) {
    return this.httpClient.delete(this.rootUrl + 'messages/' + id);
  }
}
