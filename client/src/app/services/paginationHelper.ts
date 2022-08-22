import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResults } from '../models/pagination';

export function getPaginatedResults<T>(
  url: string,
  params: HttpParams,
  http: HttpClient
) {
  let paginatedResult: PaginatedResults<T> = new PaginatedResults<T>();
  return http.get<T>(url, { observe: 'response', params }).pipe(
    map((response) => {
      paginatedResult.results = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(
          response.headers.get('Pagination')
        );
      }

      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();

  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());

  return params;
}
