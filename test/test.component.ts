import { Component, OnInit, NgModule } from '@angular/core';

@Component({
    selector: 'test-app',
    template: require('./test.component.html')
})

export class TestComponent implements OnInit {

    private time:string;

    ngOnInit(){
    }
}
