import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { TimelineComponent } from './timeline/timeline.component';
import { IProject } from './models/app.model';
import { AppService } from './services/app.service';
import { GanttDependency } from '@progress/kendo-angular-gantt';
import { ITeamMember, Project, TEAM_MEMBERS } from './chart/data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChartComponent, TimelineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'timline-chart-ng';
  public selectedKeys: number[] = [2];
  public GanttTasks: any;
  public dependencies: GanttDependency[] = [];
  public columns: any[] = [
    { field: 'title', title: 'Project Name' },
    { field: 'priority', title: 'Priority' },
    { field: 'stage', title: 'Stage' },
  ];
  ganttData!: IProject[];

  chartConfig: any = {};
  public chartData: any;
  teamMemberNames!: string[];
  projectCounts!: { name: string; count: any }[];

  constructor(private dataService: AppService) {}

  ngOnInit() {
    this.dataService.getProjects().subscribe((data) => {
      this.chartData = this.distributeProjectsPerMember(data, TEAM_MEMBERS);
      this.updateChartData(this.chartData);
    });
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

    this.chartConfig = {
      chartTitle: 'Project Distribution per Team Member',
      teamMemberNames: this.teamMemberNames,
      projectCounts: this.projectCounts,
      filters: [
        {
          id: 'prioritySelect',
          label: 'Priority',
          options: [
            { value: 'all', display: 'All' },
            { value: 'P0', display: 'P0' },
            { value: 'P1', display: 'P1' },
            { value: 'P2', display: 'P2' },
          ],
        },
        {
          id: 'stageSelect',
          label: 'Stage',
          options: [
            { value: 'all', display: 'All' },
            { value: 'Scoping', display: 'Scoping' },
            { value: 'Implementation', display: 'Implementation' },
            { value: 'Testing', display: 'Testing' },
          ],
        },
      ],
    };
  }

  onFilterChange(filters: any | { priority: string; stage: string }) {
    let filteredDistribution = this.chartData;

    if (filters.priority !== 'all') {
      filteredDistribution = this.filterByPriority(
        filters.priority,
        filteredDistribution
      );
    }
    if (filters.stage !== 'all') {
      filteredDistribution = this.filterByStage(
        filters.stage,
        filteredDistribution
      );
    }
    this.updateChartData(filteredDistribution);
  }

  private filterByPriority(priority: string, distribution: any): any {
    let filteredDistribution: any = {};
    for (const member in distribution) {
      if (distribution.hasOwnProperty(member)) {
        filteredDistribution[member] = distribution[member].filter(
          (project: { priority: string }) => {
            return project.priority === priority;
          }
        );
      }
    }
    return filteredDistribution;
  }

  private filterByStage(stage: string, distribution: any): any {
    let filteredDistribution: any = {};
    for (const member in distribution) {
      if (distribution.hasOwnProperty(member)) {
        filteredDistribution[member] = distribution[member].filter(
          (project: any) => {
            return project && project.stage === stage;
          }
        );
      }
    }
    return filteredDistribution;
  }

  private updateChartData(distribution: any) {
    this.teamMemberNames = Object.keys(distribution);
    this.projectCounts = this.teamMemberNames.map((name) => {
      return { name, count: distribution[name].length };
    });

    this.chartConfig.teamMemberNames = this.teamMemberNames;
    this.chartConfig.projectCounts = this.projectCounts;
  }

  private distributeProjectsPerMember(
    projects: Project[],
    teams: ITeamMember[]
  ): Record<string, Project[]> {
    const memberProjects: Record<string, Project[]> = {};

    teams.forEach((team) => {
      const members = team?.team_member.split('; ');
      members.forEach((member) => {
        if (!memberProjects[member]) {
          memberProjects[member] = [];
        }
      });
    });

    projects.forEach((project) => {
      const participants = project.participants.split('; ');
      participants.forEach((participant) => {
        if (memberProjects[participant]) {
          memberProjects[participant].push(project);
        }
      });
    });

    return memberProjects;
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
