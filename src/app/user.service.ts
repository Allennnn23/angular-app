import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// The IUser interface defines the shape of the data, matching your C# model
export interface IUser {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  // Base URL for your ASP.NET Core API running locally (e.g., on port 5000)
  // Make sure this port matches what your C# API is running on!
  private apiUrl = 'http://localhost:5043/users'; 

   constructor(private http: HttpClient) { }

  /**
   * GET: Fetches all users from the API
   * @returns An Observable array of IUser objects
   */
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  /**
   * POST: Sends a new user object to the API
   * @param user The new user data (Name and Email)
   * @returns An Observable of the created IUser object with the new ID
   */
  createUser(user: IUser): Observable<IUser> {
    // We only send Name and Email; the API will generate the ID
    return this.http.post<IUser>(this.apiUrl, user);
  }
}
