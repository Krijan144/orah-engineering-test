export const sorter=({students,type,sortBy}:any)=>{
            
    if(type==="ASC"){
        return students.sort( (a:any, b:any)=> {
        return a[`${sortBy}`].localeCompare(b[`${sortBy}`]); 
      });
    }
    if(type==="DSC"){       
        return students.sort( (a:any, b:any)=> {
          return b[`${sortBy}`].localeCompare(a[`${sortBy}`]); 
        });
    }
    else{       
        return students
    }}