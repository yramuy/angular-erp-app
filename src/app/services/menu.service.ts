import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    menus: any = {
    myInfo: false,
    config: false,
    attendance: false,
    daily: false,
    monthly: false,
  };

  constructor() { }

  toggleMenu(menu: string) {
    this.menus[menu] = !this.menus[menu];
  }


}
