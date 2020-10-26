import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PostsService } from '../../services/posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts = [];
  servicio: any;
  servicios = [];
  soluciones = [];
  trabajos = [];
  interval: any;
  interval2: any;
  clientes = [];
  contactForm: FormGroup;


  constructor(
    private productService: ProductsService,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {

    var that = this;
    this.contactForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      fono: new FormControl(null, [Validators.required]),
      mensaje: new FormControl(null)
    });

    this.productService.getAllProducts().subscribe((data) => {
      var i = 0;
      for (const key in data) {
        console.log('key', i);
        this.soluciones.push(data[key]);
        this.soluciones[i]['_id'] = key;
        i++;
      }
      console.log('servicios: ', this.soluciones);

    });
    this.postsService.getAllPosts().subscribe((data) => {
      var i = 0;
      for (const key in data) {
        console.log('key', i);
        this.trabajos.push(data[key]);
        this.trabajos[i]['_id'] = key;
        i++;
      }
    });
    this.servicios = [{
      name: 'IMPRESION A GRAN FORMATO',
      image: '../../assets/img/svg/icono_plotter.svg',
      link: '#'
    },
    {
      name: 'SEÑALIZACIONES',
      image: '../../assets/img/svg/icono_señaletica.svg',
      link: '#'
    },
    {
      name: 'DISEÑO Y PUBLICDAD',
      image: '../../assets/img/svg/icono_diseño.svg',
      link: '#'
    },
    {
      name: 'REGALOS PUBLICITARIOS',
      image: '../../assets/img/svg/icono_regalos_publicitarios.svg',
      link: '#'
    }];

    this.clientes = [
      {
        name:'MUNICIPALIDAD DE COPIAPÓ',
        image:'../../assets/img/muniCopiapo.png'
      },
      {
        name:'MINERA CANDELARIA',
        image:'../../assets/img/mineraCandelaria.png'
      },
      {
        name:'AGUAS CHAÑAR',
        image:'../../assets/img/aguasChanar.png'
      },
      {
        name:'PUCOBRE',
        image:'../../assets/img/pucobre.png'
      }
    ];

    window.onscroll = function () {
      if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container')
          .classList.add('showUp');
      } else {
        document.querySelector('.go-top-container')
          .classList.remove('showUp');
      }
    }
    document.querySelector('.go-top-container')
      .addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      });
  }

  onSubmit(){

  }

}
