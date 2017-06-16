import {Pipe,PipeTransform} from '@angular/core';


@Pipe({
    name: "search"
})

export class SearchPipe implements PipeTransform{
    transform(value, term){
        if(term == '' || term == null)
            return 'Empty';
        else
        {
            var i;
            var filteredArray = [];
            for(i =0; i<value.length; i++)
            {
                var row = [];
                row.push(value[i]);
                if(row.filter(Customer => Customer.Name.toLowerCase().indexOf(term.toLowerCase()) !== -1).length == 1 ||
                   row.filter(Customer => Customer.Name_2.toLowerCase().indexOf(term.toLowerCase()) !== -1).length == 1
                )
                    filteredArray.push(row[0]);
            }
            return filteredArray;
        }
    }
}