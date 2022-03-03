import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-center-table',
  templateUrl: './center-table.component.html',
  styleUrls: ['./center-table.component.scss']
})
export class CenterTableComponent implements OnInit {

  faPlus = faPlus;

  aboutDataSource!: MatTableDataSource<any>;
  centerTableColumns: string[] = ['number', 'owner', 'code', 'type', 'types' ];

  tableInput: FormControl = new FormControl();

  data: any[] = [
    {
      owner: 'owner',
      code: 'code',
      type: 'type',
      types: 'types'
    },
    {
      owner: 'owner',
      code: 'code',
      type: 'type',
      types: 'types'
    },
    {
      owner: 'owner',
      code: 'code',
      type: 'type',
      types: 'types'
    },
    {
      owner: 'owner',
      code: 'code',
      type: 'type',
      types: 'types'
    },
    {
      owner: 'owner',
      code: 'code',
      type: 'type',
      types: 'types'
    },
    {
      owner: 'owner',
      code: 'code',
      type: 'type',
      types: 'types'
    },
    {
      owner: 'owner',
      code: 'code',
      type: 'type',
      types: 'types'
    },
    {
      owner: 'owner',
      code: 'code',
      type: 'type',
      types: 'types'
    },
  ]

  constructor() { }

  ngOnInit(): void {
    this.aboutDataSource = new MatTableDataSource<any>(this.data);
  }

}
