import { Injectable } from '@angular/core';
import { DATA, IProject } from '../models/app.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private projects: IProject[] = DATA;

  constructor() {}

  getProjects(): Observable<IProject[]> {
    return of(this.projects);
  }
}
