import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "jsondate"
})

export class JsonDate implements PipeTransform{
    transform(value){
        return (value) ? parseInt(value.substr(6)) : '';
    }
}