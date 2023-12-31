import { CommonModule } from '@angular/common';
import { GanttDependency } from '@progress/kendo-angular-gantt';
import { Component } from '@angular/core';
import { GanttModule } from '@progress/kendo-angular-gantt';
import { AppService } from '../services/app.service';
import { IProject } from '../models/app.model';
@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, GanttModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  public selectedKeys: number[] = [2];
  public GanttTasks: any;
  public dependencies: GanttDependency[] = [];
  public columns: any[] = [
    { field: 'title', title: 'Project Name' },
    { field: 'priority', title: 'Priority' },
    { field: 'stage', title: 'Stage' },
  ];
  ganttData!: IProject[];
  constructor(private dataService: AppService) {}

  ngOnInit() {
    this.dataService.getProjects().subscribe((data) => {
      this.ganttData = data;
      this.generateDependencies(this.ganttData);
    });

    if (this.ganttData?.length > 0) {
      this.GanttTasks = {
        data: this.ganttData.map((project: IProject) => ({
          id: project.project_name,
          start: new Date(project.start_date),
          end: new Date(project.launch_date),
          title: project.project_name,
          priority: project.priority,
          stage: project.stage,
          percentComplete: parseFloat(project.progress.replace('%', '')) / 100,
        })),
      };
    }
  }

  private generateDependencies(data: IProject[]) {
    let dependencyId = 1;

    data.forEach((task) => {
      if (task.blocked_by) {
        // Find the task that is blocking the current task
        const blockingTask = data.find(
          (t) => t.project_name === task.blocked_by
        );
        if (blockingTask) {
          this.dependencies.push({
            id: dependencyId++,
            fromId: blockingTask.id,
            toId: task.id,
            type: 1,
          });
        }
      }
    });

    this.dependencies = [...this.dependencies];
  }
}
