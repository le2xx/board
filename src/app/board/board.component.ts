import { AfterViewInit, Component } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit {
  private canvas: any;

  ngAfterViewInit(): void {
    this.canvas = new fabric.Canvas('myCanvas');
    this.canvas.add(new fabric.IText('Hello Fabric!'));
    this.canvas.add(new fabric.Circle(
      {
        left: 200,
        top: 100,
        radius: 50,
        fill: 'rgba(255, 0, 0, .7)',
        stroke: 'green',
        strokeWidth: 2,
      })
    );
    this.canvas.add(new fabric.Line([100, 100, 100, 200],
      {
        strokeWidth: 2,
        stroke: 'orange',
        left: 20,
        top: 50
      })
    );
    this.canvas.add(new fabric.Path('M 0 0 L 200 100 L 180 210 z',
      {
        strokeWidth: 4,
        stroke: 'yellow',
        fill: 'rgba(255, 0, 0, .7)',
        left: 150,
        top: 100
      })
    );
    this.canvas.add(new fabric.Rect(
      {
        width: 100,
        height: 100,
        top: 200,
        left: 200,
        stroke: 'yellow',
        strokeWidth: 6,
        fill: 'rgba(255, 0, 0, .7)',
      })
    );
    this.canvas.add(new fabric.Polyline(
      [
        {x: 10, y: 10},
        {x: 100, y: 60},
        {x: 120, y: 90},
        {x: 20, y: 60},
      ],
      {
        top: 250,
        left: 20,
        stroke: 'yellow',
        strokeWidth: 6,
        fill: 'rgba(255, 255, 255, 0)',
      })
    );
  }
}
