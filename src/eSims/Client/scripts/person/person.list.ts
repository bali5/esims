import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';
import { Person } from './person';

import material from './../common/material';

@Component(material({
  selector: 'es-person-list',
  templateUrl: 'views/person/person-list.html',
  providers: [PersonService]
}))
export class PersonList implements OnInit {
  constructor(private service: PersonService) { }

  public persons: Person[] = [
  ];

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.service.getPersons().then(t => {
      this.persons = t;
      this.length = this.persons.length;
      this.onChangeTable(this.config);
    });
  }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Name', name: 'name', sort: 'asc' },
    { title: 'Efficiency', name: 'efficiency' },
    { title: 'Investigation', name: 'investigation' },
    { title: 'Administration', name: 'administration' },
    { title: 'Creativity', name: 'creativity' },
    { title: 'Efficiency', name: 'efficiency' },
  ];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '', columnName: 'name' }
  };

  public changePage(page: any, data: Array<any> = this.persons): Array<any> {
    console.log(page);
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '') {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    if (!config.filtering) {
      return data;
    }

    let filteredData: Array<any> = data.filter((item: any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.persons, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

}