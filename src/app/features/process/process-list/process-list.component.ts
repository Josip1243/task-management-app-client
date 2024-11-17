import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-process-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './process-list.component.html',
  styleUrl: './process-list.component.scss',
})
export class ProcessListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'startDate',
    'endDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<Process>();
  @ViewChild(MatTable) table!: MatTable<Process>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private processService: ProcessService, private router: Router) {}

  ngOnInit(): void {
    this.processService.getProcesses().subscribe((data: Process[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
