import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Hive } from '../models/hive';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HiveService {
  //in memorry datastore, dont want to expose
  // 1. we dont want to expose entire store so declare behavior subject that component is able to subscribe to
  // 2. behavior robimy na obesrbale to expose to component
  // 3 define get to allow component to subscribe to behavior subject
  // 4. "next" on behavior subject to publish date to all subscriers component on load to know component that data is available
  // 5. in next no all store (to not manipulate ) publish only users that why we object assign ()(copy object) only users.
  private _hives: BehaviorSubject<Hive[]>;

  constructor(private http: HttpClient) {
    this._hives = new BehaviorSubject<Hive[]>([]);
   }
   hivesStore: Hive[] = 
   [
     {    
       id: 1,
       internalNumber: 1,
       race : "Buckfast",
       hiveType: "warszawski",
       queenBirthDate: new Date()
    },
    {    
      id: 2,
      internalNumber: 2,
      race : "Buckfast",
      hiveType: "warszawski",
      queenBirthDate: new Date()
   },
   {    
    id: 3,
    internalNumber: 3,
    race : "Buckfast",
    hiveType: "warszawski",
    queenBirthDate: new Date()
  },
  {    
   id: 4,
   internalNumber: 4,
   race : "Buckfast",
   hiveType: "warszawski",
   queenBirthDate: new Date()
  },
  {    
    id: 5,
    internalNumber: 5,
    race : "Buckfast",
    hiveType: "warszawski",
    queenBirthDate: new Date()
 },
 {    
   id: 6,
   internalNumber: 6,
   race : "Buckfast",
   hiveType: "warszawski",
   queenBirthDate: new Date()
  },
  {    
  id: 7,
  internalNumber: 7,
  race : "Buckfast",
  hiveType: "warszawski",
  queenBirthDate: new Date()
  },
  {    
  id: 8,
  internalNumber: 8,
  race : "Buckfast",
  hiveType: "warszawski",
  queenBirthDate: new Date()
  }
   ];

   getAll() {
     this._hives.next(this.hivesStore); 
   }
   get hives(): Observable<Hive[]> {
    return this._hives.asObservable();
  }

   addHive(hive: Hive){
   this.hivesStore.push(hive);
   this._hives.next(this.hivesStore); 


   
   }

}
