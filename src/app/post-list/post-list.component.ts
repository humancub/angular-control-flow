import { Component, Input, computed, signal } from '@angular/core';
import {TitleCasePipe } from '@angular/common';
import { Post } from '../model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    <h3>Posts</h3>
    <input (input)="handleInput($event)" placeholder="Start typing..." />
    @for(post of filtered(); track post.id){
      <div class="card">
    <span>id: {{ $index }}</span> {{ post.title | titlecase }}
    </div>
    } @empty {
    <div class="not-found">Nothing was found...</div>
    }
  `,
})
export class PostListComponent {
  @Input()
  posts: Post[] = [];

  query = signal('');

  filtered = computed(() =>
    this.posts.filter((p) => p.title.startsWith(this.query()))
  );


  handleInput(e: Event) {
    this.query.set((e.target as any).value);
  }
}