import { Component, OnInit } from '@angular/core';

export enum ToolsEnum {
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
  lining = 'lining'
}

export enum typeToolEnum {
  single = 'single',
  dropdown = 'dropdown'
}

export interface IToolbar {
  name: ToolsEnum;
  type: typeToolEnum;
  label?: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public toolbar: IToolbar[] = [
    {
      name: ToolsEnum.image,
      type: typeToolEnum.single
    },
    {
      name: ToolsEnum.pen,
      type: typeToolEnum.single
    },
    {
      name: ToolsEnum.brush,
      type: typeToolEnum.single
    },
    {
      name: ToolsEnum.circle,
      type: typeToolEnum.single
    },
    {
      name: ToolsEnum.rect,
      type: typeToolEnum.single
    },
    {
      name: ToolsEnum.undo,
      type: typeToolEnum.single
    },
    {
      name: ToolsEnum.redo,
      type: typeToolEnum.single
    },
    {
      name: ToolsEnum.zoomIn,
      type: typeToolEnum.single
    },
    {
      name: ToolsEnum.zoomOut,
      type: typeToolEnum.single
    },
    {
      name: ToolsEnum.grid,
      type: typeToolEnum.single
    },
    {
      name: ToolsEnum.lining,
      type: typeToolEnum.single
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
