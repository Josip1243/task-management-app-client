import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProcessService } from '../../../core/services/process.service';
import { Process } from '../../../shared/models/process.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './process-list.component.html',
  styleUrl: './process-list.component.scss',
})
export class ProcessListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<Process>();

  constructor(private processService: ProcessService, private router: Router) {}

  ngOnInit(): void {
    this.processService.getProcesses().subscribe((data: Process[]) => {
      this.dataSource.data = data;
    });
  }

  showDetails(row: any) {
    this.router.navigate([`process/detail/${row.id}`]);
  }
}
