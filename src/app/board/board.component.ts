import { AfterViewInit, Component } from '@angular/core';
import { fabric } from 'fabric';
import { Circle, ICircleOptions, IObjectOptions, Rect } from 'fabric/fabric-impl';
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
  private options: IObjectOptions | ICircleOptions = {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    radius: 0,
    stroke: '#6633FF',
    strokeWidth: 3,
    fill: '#6633FF'
  };
  private subscription = new Subscription();
  private activeTool: CommandToolsEnum = CommandToolsEnum.cursor;

  private static drawRectangle(option: IObjectOptions): Rect {
    return new fabric.Rect(option);
  }

  private static drawCircle(options: IObjectOptions): Circle {
    // @ts-ignore
    const radius = options.width / 2;
    return new fabric.Circle({ ...options, radius });
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
      this.options.top = e.pointer.y;
      this.options.left = e.pointer.x;
    });

    this.canvas.on('mouse:move', (e: any) => {
      // console.log('BoardComponent::mouse:move', e);
    });

    this.canvas.on('mouse:up', (e: any) => {
      console.log('BoardComponent::mouse:up', e);
      if (!this.command()) {
        return;
      }
      console.log(this.options);
      // @ts-ignore
      this.options.height = e.pointer.y - this.options.top;
      // @ts-ignore
      this.options.width = e.pointer.x - this.options.left;
      // this.options.radius = this.options.width / 2;
      this.canvas.add(this.command());
    });
  }

  private optionsInit(): void {
    this.options.stroke = colorList[Math.floor(Math.random() * colorList.length)];
    this.options.fill = this.options.stroke + 'c8';
  }

  private command(): any {
    switch (this.activeTool) {
      case CommandToolsEnum.rect:
        return BoardComponent.drawRectangle(this.options);
      case CommandToolsEnum.circle:
        return BoardComponent.drawCircle(this.options);
      default:
        return;
    }
  }
}

// this.canvas
// this.canvas.add(new fabric.IText('Hello Fabric!'));
// this.canvas.add(new fabric.Circle(
//   {
//     left: 200,
//     top: 100,
//     radius: 50,
//     fill: 'rgba(255, 0, 0, .7)',
//     stroke: 'green',
//     strokeWidth: 2,
//   })
// );
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
// this.canvas.add(new fabric.Rect(
//   {
//     width: 100,
//     height: 100,
//     top: 200,
//     left: 200,
//     stroke: 'yellow',
//     strokeWidth: 6,
//     fill: 'rgba(255, 0, 0, .7)',
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
