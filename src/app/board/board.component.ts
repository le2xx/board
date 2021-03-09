import { AfterViewInit, Component } from '@angular/core';
import { fabric } from 'fabric';
import {Circle, ICircleOptions, IRectOptions, IText, ITextOptions, Rect, Triangle} from 'fabric/fabric-impl';
import { Subscription } from 'rxjs';
import { ObjectsBoardService } from '../objects-board.service';
import { CommandToolsEnum } from '../toolbar/toolbar.component';

const colorList = [
  '#FFFF66',
  '#FFCC33',
  '#CC9966',
  '#FF6600',
  '#FF3300',
  '#FF6666',
  '#CC3333',
  '#FF0066',
  '#FF0099',
  '#FF33CC',
  '#FF66FF',
  '#CC00CC',
  '#CC00FF',
  '#9933FF',
  '#6600CC',
  '#6633FF',
  '#6666CC',
  '#3300CC',
  '#0000FF',
  '#3366CC',
  '#0099FF',
  '#00CCFF',
  '#339999',
  '#66FFFF',
  '#33FFCC',
  '#00CC99',
  '#00FF99',
  '#33FF66',
  '#66CC66',
  '#00FF00',
  '#33FF00',
  '#66CC00',
  '#99CC66',
  '#CCFF33',
  '#999966',
  '#999999'
];

interface IOptions {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  strokeWidth: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit {

  constructor(
    private objectsBoardService: ObjectsBoardService
  ) {
  }
  private canvas: any;
  private options: IOptions = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    color: '#999999',
    strokeWidth: 3,
    fontSize: 26,
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'normal',
  };
  private subscription = new Subscription();
  private activeTool: CommandToolsEnum = CommandToolsEnum.cursor;

  public static drawTriangle(options: IOptions): Triangle {
    const triangleOptions = {
      left: options.startX,
      top: options.startY,
      height: options.endY - options.startY,
      width: options.endX - options.startX,
      fill: options.color + 'c8',
      stroke: options.color,
      strokeWidth: options.strokeWidth,
    };
    return new fabric.Triangle(triangleOptions);
  }

  private static drawRectangle(options: IOptions): Rect {
    const rectOptions: IRectOptions = {
      left: options.startX,
      top: options.startY,
      height: options.endY - options.startY,
      width: options.endX - options.startX,
      fill: options.color + 'c8',
      stroke: options.color,
      strokeWidth: options.strokeWidth,
    };
    return new fabric.Rect(rectOptions);
  }

  private static drawCircle(options: IOptions): Circle {
    const circleOptions: ICircleOptions = {
      left: options.startX,
      top: options.startY,
      radius: options.endX - options.startX < options.endY - options.startY ?
        (options.endX - options.startX) / 2 : (options.endY - options.startY) / 3,
      fill: options.color + 'c8',
      stroke: options.color,
      strokeWidth: options.strokeWidth,
    };
    return new fabric.Circle(circleOptions);
  }

  private static drawText(options: IOptions): IText {
    const textOptions: ITextOptions = {
      left: options.startX,
      top: options.startY,
      fontSize: options.fontSize,
      fontFamily: options.fontFamily,
      fontWeight: options.fontWeight,
      fill: options.color,
    };
    return new fabric.IText('Input text', textOptions);
  }

  ngAfterViewInit(): void {
    this.canvas = new fabric.Canvas('myCanvas');
    this.optionsInit();
    this.eventsInit();

    this.subscription.add(
      this.objectsBoardService.currentTool$
        .subscribe((tool) => this.activeTool = tool)
    );
  }

  private eventsInit(): void {
    this.canvas.on('mouse:down', (e: any) => {
      console.log('BoardComponent::mouse:down', e);
      this.options.startX = e.pointer.x;
      this.options.startY = e.pointer.y;
    });

    this.canvas.on('mouse:move', (e: any) => {
      // console.log('BoardComponent::mouse:move', e);
    });

    this.canvas.on('mouse:up', (e: any) => {
      console.log('BoardComponent::mouse:up', e);
      this.options.endX = e.pointer.x;
      this.options.endY = e.pointer.y;
      if (!this.command()) {
        this.objectsBoardService.selectTool(CommandToolsEnum.cursor);
        return;
      }

      this.canvas.add(this.command());
      this.objectsBoardService.selectTool(CommandToolsEnum.cursor);
    });
  }

  private optionsInit(): void {
    this.options.color = colorList[Math.floor(Math.random() * colorList.length)];
  }

  private removeObject(): void {
    const activeObject = this.canvas.getActiveObject();
    this.canvas.remove(activeObject);
  }

  private drawPen() {
    this.canvas.isDrawingMode = true;
  }

  private command(): any {
    switch (this.activeTool) {
      case CommandToolsEnum.triangle:
        return BoardComponent.drawTriangle(this.options);
      case CommandToolsEnum.rect:
        return BoardComponent.drawRectangle(this.options);
      case CommandToolsEnum.circle:
        return BoardComponent.drawCircle(this.options);
      case CommandToolsEnum.text:
        return BoardComponent.drawText(this.options);
      case CommandToolsEnum.remove:
        return this.removeObject();
      case CommandToolsEnum.pen:
        return this.drawPen();
      default:
        return;
    }
  }
}

// this.canvas
// this.canvas.add(new fabric.IText('Hello Fabric!'));
// this.canvas.add(new fabric.Line([100, 100, 100, 200],
//   {
//     strokeWidth: 2,
//     stroke: 'orange',
//     left: 20,
//     top: 50
//   })
// );
// this.canvas.add(new fabric.Path('M 0 0 L 200 100 L 180 210 z',
//   {
//     strokeWidth: 4,
//     stroke: 'yellow',
//     fill: 'rgba(255, 0, 0, .7)',
//     left: 150,
//     top: 100
//   })
// );
// this.canvas.add(new fabric.Polyline(
//   [
//     {x: 10, y: 10},
//     {x: 100, y: 60},
//     {x: 120, y: 90},
//     {x: 20, y: 60},
//   ],
//   {
//     top: 250,
//     left: 20,
//     stroke: 'yellow',
//     strokeWidth: 6,
//     fill: 'rgba(255, 255, 255, 0)',
//   })
// );
