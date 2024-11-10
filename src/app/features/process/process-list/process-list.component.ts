import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { ProcessService } from '../../../core/services/process.service';
import { Process } from '../../../shared/models/process.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-process-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './process-list.component.html',
  styleUrl: './process-list.component.scss',
})
export class ProcessListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'startDate',
    'endDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<Process>();
  @ViewChild(MatTable) table!: MatTable<Process>;

  constructor(private processService: ProcessService, private router: Router) {}

  ngOnInit(): void {
    this.processService.getProcesses().subscribe((data: Process[]) => {
      this.dataSource.data = data;
    });
  }

  showProcessDetails(id: number) {
    this.router.navigate([`process/detail/${id}`]);
  }

  editProcess(id: number) {
    this.router.navigate([`process/edit/${id}`]);
  }

  deleteProcess(id: number) {
    this.processService.deleteProcess(id).subscribe({
      next: () => {
        let temp = this.dataSource.data.filter((p) => p.id !== id);
        this.dataSource.data = temp;
        this.table.renderRows();
        console.log('Deleted');
      },
    });
  }
}
