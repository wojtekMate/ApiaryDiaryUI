import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //in memorry datastore, dont want to expose
  // 1. we dont want to expose entire store so declare behavior subject that component is able to subscribe to
  // 2. behavior robimy na obesrbale to expose to component
  // 3 define get to allow component to subscribe to behavior subject
  // 4. "next" on behavior subject to publish date to all subscriers component on load to know component that data is available
  // 5. in next no all store (to not manipulate ) publish only users that why we object assign ()(copy object) only users.
  private _users: BehaviorSubject<User[]>;
  private dataStore: {
    users: User[];
  }
  constructor(private http: HttpClient) {
    this.dataStore = {users: []};
    this._users = new BehaviorSubject<User[]>([]);
   }


   get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  loadAll() {
    const usersUrl = ''

    return this.http.get<User[]>(usersUrl)
      .subscribe(data => { //subscribe to response
        this.dataStore.users = data;
        this._users.next(Object.assign({}, this.dataStore).users); 
      }, error => {
        console.log("Failed to fetch users")
      });
  }

}
