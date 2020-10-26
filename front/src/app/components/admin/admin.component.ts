import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PostsService } from '../../services/posts.service';
import { Product } from '../../interfaces/product';
import { Post } from '../../interfaces/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  product: Product;
  post: Post;

  imageForm: FormGroup;
  trabajosForm: FormGroup;
  image: any;
  file: any;
  productos = [];
  trabajos = [];
  servicio: any;
  trabajo: any;
  seleccionado;
  opt = 'crear';
  title = 'Crear Servicio';
  title2 = 'Crear Trabajo';
  id;
  opt2 = 'servicios';
  path: any;
  downloadUrl: Observable<string>;
  imageURL:any;

  constructor(
    private productService: ProductsService,
    private postService: PostsService,
    private router: Router,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {

    this.imageForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      companyName: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      file: new FormControl(null)
    });
    this.trabajosForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      companyName: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      file: new FormControl(null)
    });
    this.productService.getAllProducts().subscribe((data) => {

      var i = 0;
      for (const key in data) {
        console.log('key', i);
        this.productos.push(data[key]);
        this.productos[i]['_id'] = key;
        i++;
      }
      console.log('Producto: ', this.productos);
    });
    this.postService.getAllPosts().subscribe((data) => {
      this.trabajos = data;
    });
  }

  onFileChange(event) {
    console.log('holaaaaa');
    var that = this;
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function load() {
          that.image = reader.result;
        }.bind(this);
        that.file = file;
      }
    }
  }

  async onSubmit() {
    const form = this.imageForm;
    const that = this;

    if (form.valid) {
      if (this.file) {
        this.path = 'servicios/' + Date.now() + `${form.value.name}`;
        var fileRef = this.storage.ref(this.path);
        var envio = this.storage.upload(this.path, this.file);

        await envio.snapshotChanges().pipe(
          finalize(() => {
            this.downloadUrl = fileRef.getDownloadURL();
            this.downloadUrl.subscribe((url)=>{
              that.imageURL = url;
              console.log('URL de la imagen cargada: ',that.imageURL);
              if (that.opt === 'crear') {
                that.product = {
                  userId: "Administrador",
                  description: form.value.description,
                  name: form.value.name,
                  companyName: form.value.companyName,
                  urlImage: `${that.imageURL}`
                }
                that.productService.createProduct(that.product).subscribe((producto) => {
                  console.log(producto);
                  that.productService.getAllProducts().subscribe((data) => {
                    that.productos = [];
                    var i = 0;
                    for (const key in data) {
                      console.log('key', i);
                      that.productos.push(data[key]);
                      that.productos[i]['_id'] = key;
                      i++;
                    }
    
                  });
                });
              }
              if (that.opt === 'editar') {
                that.product = {
                  _id: that.id,
                  userId: "Administrador",
                  description: form.value.description,
                  name: form.value.name,
                  companyName: form.value.companyName,
                  urlImage: `${that.imageURL}`
                }
                that.productService.updateProduct(that.product).subscribe((update) => {
                  console.log(update);
                  that.productService.getAllProducts().subscribe((data) => {
                    that.productos = [];
                    var i = 0;
                    for (const key in data) {
                      console.log('key', i);
                      that.productos.push(data[key]);
                      that.productos[i]['_id'] = key;
                      i++;
                    }
    
                  });
                });
              }
              that.opt = 'crear';
              that.title = 'Crear Servicio';
              that.title2 = 'Crear Trabajo'
              that.limpiar();
            })
          })
        ).subscribe();
          
      } else {
        if (this.opt === 'crear') {
          console.log('invalido')
        } 
        if (this.opt === 'editar') {
          this.product = {
            _id: this.id,
            userId: "Administrador",
            description: form.value.description,
            name: form.value.name,
            companyName: form.value.companyName,
          }
          this.productService.updateProduct(this.product).subscribe((update) => {
            console.log(update);
            this.productService.getAllProducts().subscribe((data) => {
              this.productos = [];
              var i = 0;
              for (const key in data) {
                console.log('key', i);
                this.productos.push(data[key]);
                this.productos[i]['_id'] = key;
                i++;
              }

            });
          });
        }
      }
    }
  }

  async onSubmit2() {
    const form = this.trabajosForm;
    const that = this;

    if (form.valid) {
      if (this.file) {
        this.path = 'trabajos/' + Date.now() + `${form.value.name}`;
        var fileRef = this.storage.ref(this.path);
        var envio = this.storage.upload(this.path, this.file);

        await envio.snapshotChanges().pipe(
          finalize(() => {
            this.downloadUrl = fileRef.getDownloadURL();
            this.downloadUrl.subscribe((url)=>{
              that.imageURL = url;
              console.log('URL de la imagen cargada: ',that.imageURL);
              if (that.opt === 'crear') {
                that.trabajo = {
                  userId: "Administrador",
                  description: form.value.description,
                  name: form.value.name,
                  companyName: form.value.companyName,
                  urlImage: `${that.imageURL}`
                }
                that.postService.createPost(that.trabajo).subscribe((post) => {
                  console.log(post);
                  that.postService.getAllPosts().subscribe((data) => {
                    that.trabajos = [];
                    var i = 0;
                    for (const key in data) {
                      console.log('key', i);
                      that.trabajos.push(data[key]);
                      that.trabajos[i]['_id'] = key;
                      i++;
                    }
    
                  });
                });
              }
              if (that.opt === 'editar') {
                that.trabajo = {
                  _id: that.id,
                  userId: "Administrador",
                  description: form.value.description,
                  name: form.value.name,
                  companyName: form.value.companyName,
                  urlImage: `${that.imageURL}`
                }
                that.postService.updatePost(that.trabajo).subscribe((update) => {
                  console.log(update);
                  that.postService.getAllPosts().subscribe((data) => {
                    that.trabajos = [];
                    var i = 0;
                    for (const key in data) {
                      console.log('key', i);
                      that.trabajos.push(data[key]);
                      that.trabajos[i]['_id'] = key;
                      i++;
                    }
    
                  });
                });
              }
              that.opt = 'crear';
              that.title = 'Crear Servicio';
              that.title2 = 'Crear Trabajo'
              that.limpiar2();
            })
          })
        ).subscribe();
          
      } else {
        if (this.opt === 'crear') {
          console.log('invalido')
        } 
        if (this.opt === 'editar') {
          this.trabajo = {
            _id: this.id,
            userId: "Administrador",
            description: form.value.description,
            name: form.value.name,
            companyName: form.value.companyName,
          }
          this.postService.updatePost(this.trabajo).subscribe((update) => {
            console.log(update);
            this.postService.getAllPosts().subscribe((data) => {
              this.trabajos = [];
              var i = 0;
              for (const key in data) {
                console.log('key', i);
                this.trabajos.push(data[key]);
                this.trabajos[i]['_id'] = key;
                i++;
              }

            });
          });
        }
      }
    }
  }

  editar(id) {
    this.id = id;
    this.productService.getProduct(id).subscribe((data) => {
      console.log('editar', this.id)
      this.servicio = data['solucion'];
      const form = this.imageForm;
      form.controls['name'].setValue(this.servicio.name);
      form.controls['companyName'].setValue(this.servicio.companyName);
      form.controls['description'].setValue(this.servicio.description);
      this.opt = 'editar';
      this.title = 'Editar Servicio';
    });
  }

  editar2(id) {
    this.id = id;
    this.postService.getPost(id).subscribe((data) => {
      this.trabajo = data['trabajo'];
      const form = this.trabajosForm;
      form.controls['name'].setValue(this.trabajo.name);
      form.controls['companyName'].setValue(this.trabajo.companyName);
      form.controls['description'].setValue(this.trabajo.description);
      this.opt = 'editar';
      this.title2 = 'Editar Trabajo';
    });
  }

  eliminar(id) {
    this.productService.deleteProduct(id).subscribe(item => {
      this.productService.getAllProducts().subscribe((data) => {
        this.productos = [];
        var i = 0;
        for (const key in data) {
          console.log('key', i);
          this.productos.push(data[key]);
          this.productos[i]['_id'] = key;
          i++;
        }

      });
    });
  }

  eliminar2(id) {
    this.postService.deletePost(id).subscribe(item => {
      this.postService.getAllPosts().subscribe((data) => {
        console.log('trabajos: ', data);
        this.trabajos = [];

        var i = 0;
        for (const key in data) {
          console.log('key', i);
          this.trabajos.push(data[key]);
          this.trabajos[i]['_id'] = key;
          i++;
        }

      });
    });
  }

  limpiar() {
    const form = this.imageForm;
    form.controls['name'].setValue('');
    form.controls['companyName'].setValue('');
    form.controls['description'].setValue('');
    form.controls['file'].setValue('');
    this.opt = 'crear';
    this.title = 'Crear Servicio';
  }

  limpiar2() {
    const form = this.trabajosForm;
    form.controls['name'].setValue('');
    form.controls['companyName'].setValue('');
    form.controls['description'].setValue('');
    form.controls['file'].setValue('');
    this.opt = 'crear';
    this.title2 = 'Crear Trabajos';
  }

  changeForm(opcion) {
    if (opcion === 'servicios') {
      this.opt2 = opcion;
      this.limpiar();
      this.productService.getAllProducts().subscribe((data) => {
        this.productos = [];
        var i = 0;
        for (const key in data) {
          console.log('key', i);
          this.productos.push(data[key]);
          this.productos[i]['_id'] = key;
          i++;
        }
      });
    } else if (opcion === 'trabajos') {
      this.opt2 = opcion;
      this.limpiar2();
      this.postService.getAllPosts().subscribe((data) => {
        this.trabajos = [];
        var i = 0;
        for (const key in data) {
          console.log('key', i);
          this.trabajos.push(data[key]);
          this.trabajos[i]['_id'] = key;
          i++;
        }
      });
    }
  }
}
