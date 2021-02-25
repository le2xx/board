import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ObjectsBoardService } from '../objects-board.service';
import { Subscription } from 'rxjs';

export enum CommandToolsEnum {
  cursor = 'cursor',
  image = 'image',
  pen = 'pen',
  brush = 'brush',
  circle = 'circle',
  rect = 'rect',
  undo = 'undo',
  redo = 'redo',
  zoomIn = 'zoomIn',
  zoomOut = 'zoomOut',
  grid = 'grid',
  lining = 'lining',
  text = 'text',
}

export enum typeToolEnum {
  single = 'single',
  dropdown = 'dropdown'
}

export interface IToolbar {
  name: CommandToolsEnum;
  type: typeToolEnum;
  label?: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public activeTool: CommandToolsEnum = CommandToolsEnum.cursor;
  public toolbar: IToolbar[] = [
    {
      name: CommandToolsEnum.cursor,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.image,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.text,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.pen,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.brush,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.circle,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.rect,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.undo,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.redo,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.zoomIn,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.zoomOut,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.grid,
      type: typeToolEnum.single
    },
    {
      name: CommandToolsEnum.lining,
      type: typeToolEnum.single
    },
  ];

  private subscription = new Subscription();

  constructor(
    private objectsBoardService: ObjectsBoardService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.objectsBoardService.currentTool$
        .subscribe((tool) => {
          this.activeTool = tool;
          this.cdr.detectChanges();
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  public onSelectedTool(toolItem: IToolbar) {
    this.objectsBoardService.selectTool(toolItem.name);
  }
}
