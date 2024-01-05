import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

interface Territory {
  id: string;
  name: string;
  parent: string | null;
  children?: Territory[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  territories: Territory[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const apiUrl = 'http://localhost:3000/api/Territories/All';
    this.dataService.fetchData(apiUrl).subscribe(
      (data: { data: Territory[] }) => {
        console.log('API Response:', data);

        const sortedTerritories = this.sortList(data.data, 'id');

        this.territories = this.buildHierarchy(sortedTerritories, null);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  sortList<T>(list: T[], field: keyof T): T[] {
    return list.slice().sort((a, b) => (a[field] > b[field] ? 1 : -1));
  }

  buildHierarchy(list: Territory[], parentId: string | null): Territory[] {
    const hierarchy: Territory[] = [];

    list.forEach((territory) => {
      if (territory.parent === parentId) {
        const children = this.buildHierarchy(list, territory.id);
        if (children.length) {
          territory.children = children;
        }
        hierarchy.push(territory);
      }
    });

    return hierarchy;
  }

  toggleChildren(territory: Territory) {
    territory.isOpen = !territory.isOpen;
  }
  
}
