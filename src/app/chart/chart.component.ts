import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from '../services/app.service';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { ITeamMember, Project, TEAM_MEMBERS } from './data';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule,
    ChartsModule,
    InputsModule,
    DropDownsModule,
    LabelModule,
    ButtonsModule,
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  @ViewChild('prioritySelect') prioritySelect!: ElementRef;
  @ViewChild('stageSelect') stageSelect!: ElementRef;
  public chartData: any;
  teamMemberNames!: string[];
  projectCounts!: { name: string; count: any }[];
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getProjects().subscribe((data) => {
      this.chartData = this.distributeProjectsPerMember(data, TEAM_MEMBERS);
      this.updateChartData(this.chartData);
    });
  }

  ngAfterViewInit() {
    this.onFilterChange();
  }

  onFilterChange() {
    const selectedPriority = this.prioritySelect?.nativeElement?.value;
    const selectedStage = this.stageSelect?.nativeElement?.value;

    let filteredDistribution = this.chartData;

    if (selectedPriority !== 'all') {
      filteredDistribution = this.filterByPriority(
        selectedPriority,
        filteredDistribution
      );
    }
    if (selectedStage !== 'all') {
      filteredDistribution = this.filterByStage(
        selectedStage,
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
    console.log('Current Distribution:', distribution);

    for (const member in distribution) {
      if (distribution.hasOwnProperty(member)) {
        console.log(`Member: ${member}, Projects:`, distribution[member]);

        filteredDistribution[member] = distribution[member].filter(
          (project: any) => {
            console.log(`Checking project:`, project);
            return project && project.stage === stage;
          }
        );
      }
    }
    console.log(`Filtered Distribution:`, filteredDistribution);
    return filteredDistribution;
  }

  private updateChartData(distribution: any) {
    this.teamMemberNames = Object.keys(distribution);
    this.projectCounts = this.teamMemberNames.map((name) => {
      return { name, count: distribution[name].length };
    });
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
}
