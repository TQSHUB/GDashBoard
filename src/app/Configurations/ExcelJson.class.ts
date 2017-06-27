export class JsonForExcel{
    convertJsonToExcel(res, Oldcolumns ,Newcolumns, delColumns){
        var i,j; 
        var o = JSON.parse(JSON.stringify(res));
        for(i = 0; i < o.length; i++)
        {
            for(j = 0; j<Newcolumns.length; j++)
            {
                if(!(Oldcolumns[j] == Newcolumns[j]))
                {
                    o[i][Newcolumns[j]] = o[i][Oldcolumns[j]];
                    delete o[i][Oldcolumns[j]];
                }
            }
            // for(j = 0; j< delColumns.length; j++)
            // {
            //     delete o[i][delColumns[j]];
            // }
        }
        var output =  []
        for(i = 0; i < o.length; i++)
        {
            var row = {};
            for(j = 0; j< Newcolumns.length; j++)
            {
                row[Newcolumns[j]] = o[i][Newcolumns[j]];
            }
            for(j = 0; j< delColumns.length; j++)
            {
                delete row[delColumns[j]];
            }
            output.push(row);        
        }
        return output;
    }
}