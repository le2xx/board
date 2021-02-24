import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CommandToolsEnum } from './toolbar/toolbar.component';

@Injectable({
  providedIn: 'root'
})
export class ObjectsBoardService {
  protected currentToolSubject = new ReplaySubject<CommandToolsEnum>(1);
  public currentTool$ = this.currentToolSubject.asObservable();

  constructor() {
    this.currentToolSubject.next(CommandToolsEnum.cursor);
  }

  public selectTool(tool: CommandToolsEnum) {
    this.currentToolSubject.next(tool);
  }
}
