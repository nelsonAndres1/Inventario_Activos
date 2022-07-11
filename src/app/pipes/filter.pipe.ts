import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg?: any){
    if(arg ==''|| arg.length < 3)return value;
    const resultPosts : any =[];
    for(const activos of value){
      if(activos.codact.indexOf(arg)>-1){
        resultPosts.push(activos);
        console.log("sipp");
      }

    }
    return resultPosts;
  }
    
  

}
