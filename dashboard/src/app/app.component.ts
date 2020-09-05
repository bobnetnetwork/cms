import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'cms-dashboard';

  ngOnInit(): void{
    const body = document.body;
    body.classList.add('main-sidebar');
    body.classList.add('sidebar-dark-primary');
    body.classList.add('elevation-4');
 }

 ngOnDestroy(): void{
  const body = document.body;
  body.classList.remove('main-sidebar');
  body.classList.remove('sidebar-dark-primary');
  body.classList.remove('elevation-4');
}

}
