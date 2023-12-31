import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChange,
} from '@angular/core';
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
  ngOnChanges(xhanges: SimpleChange) {
    console.log(xhanges);
  }
  @Input() chartConfig: any;

  @Output() filterChangeEmit = new EventEmitter<{
    priority: string;
    stage: string;
  }>();
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.onFilterChange();
  }
  onFilterChange() {
    const selectedPriority = (
      document.getElementById('prioritySelect') as HTMLSelectElement
    )?.value;
    const selectedStage = (
      document.getElementById('stageSelect') as HTMLSelectElement
    )?.value;
    this.filterChangeEmit.emit({
      priority: selectedPriority,
      stage: selectedStage,
    });
  }
}
