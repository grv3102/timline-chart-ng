import { CommonModule } from '@angular/common';
import { GanttDependency } from '@progress/kendo-angular-gantt';
import { Component, Input } from '@angular/core';
import { GanttModule } from '@progress/kendo-angular-gantt';
import { IProject } from '../models/app.model';
@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, GanttModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  @Input() GanttTasks: any;
  public selectedKeys: number[] = [2];
  @Input() dependencies: GanttDependency[] = [];
  @Input() columnsConfig: any[] = [];
  ganttData!: IProject[];
  constructor() {}

  ngOnInit() {}
}
