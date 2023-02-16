import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient:HttpClient) { }
  getProduct():any{
   return this._httpClient.get<any>("http://localhost:3000/posts/")
    .pipe(
      map((res)=>{
      return res;
    }))
  }


}
