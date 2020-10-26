import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categorias = [];
  subCategorias1 = [];
  
  constructor() { }

  ngOnInit(): void {
    this.categorias = [
      {
        id:'1',
        name: 'BOLSOS CONGRESOS'
      },
      {
        id:'2',
        name: 'ROPA CORPORATIVA'
      },
      {
        id:'3',
        name: 'ARTICULOS PUBLICITARIOS'
      },
      {
        id:'4',
        name: 'PAPELERIA E IMPRESIONES GRAFICAS'
      }
    ]

    this.subCategorias1 = [
      {
        id_categoria:'1',
        name: 'BOLSOS'
      },
      {
        id_categoria:'1',
        name: 'BOLSOS DEPORTIVOS'
      },
      {
        id_categoria:'1',
        name: 'MOCHILAS'
      }
    ]
  }

}
