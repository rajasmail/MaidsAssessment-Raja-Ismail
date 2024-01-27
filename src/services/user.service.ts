import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cachedData:any;
   // Base API URL for user-related operations
   private apiUrl = 'https://reqres.in/api/users';

   // Constructor with dependency injection for HttpClient
   constructor(private http: HttpClient) {}

   // Function to get a list of users for a specific page
   getUsers(page: number): Observable<any> {

           // Construct the URL with the specified page
     const url = `${this.apiUrl}?page=${page}`;

     // Make an HTTP GET request and return the Observable
     return this.http.get(url);
    }


  //  getUsers(page: number): Observable<any> {
  //   if(this.cachedData){
  //     return this.cachedData;
  //   }
  //   else{
  //    const url = `${this.apiUrl}?page=${page}`;
  //    return this.http.get(url).pipe(tap((data)=>(this.cachedData=data)));
  //   }

  //  }

   // Function to get details of a specific user by ID
   getUserDetails(userId: number): Observable<any> {
     // Construct the URL with the specified user ID
     const url = `${this.apiUrl}/${userId}`;

     // Make an HTTP GET request and return the Observable
     return this.http.get(url);
   }
}
