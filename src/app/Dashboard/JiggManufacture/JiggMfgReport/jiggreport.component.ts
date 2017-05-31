import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'jiggreportcomponent',
  templateUrl: './jiggreport.component.html',
})

export class JiggReport{

 constructor(private router:Router){

    }

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/component/JiggManufacture/jiggreport.component.js';
    }
}