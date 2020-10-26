import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../interfaces/post';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiURL = 'https://publimagen.herokuapp.com/api';
  // private apiURL = 'http://localhost:4000/api';

  constructor(
    private http:HttpClient
  ) { }

  getAllPosts(){
    const path =`${this.apiURL}/posts`;
    return this.http.get<Post[]>(path);
  }

  getPost(id: string){
    const path = `${this.apiURL}/posts/${id}`;
    return this.http.get<Post>(path);
  }

  createPost(post: Post){
    const path = `${this.apiURL}/addPost`;
    return this.http.post(path, post);
  }

  updatePost(post: Post){
    const path = `${this.apiURL}/updatePost/${post._id}`;
    return this.http.put(path, post);
  }

  deletePost(id: string){
    const path = `${this.apiURL}/deletePost/${id}`;
    return this.http.delete(path);
  }

  uploadImage(name:string, file:File){
    const path = `${this.apiURL}/upload`;
    const form = new FormData();
    form.append('name',name);
    form.append('file', file, 'form-data');
    return this.http.post<Object>(path, form);
  }
}
