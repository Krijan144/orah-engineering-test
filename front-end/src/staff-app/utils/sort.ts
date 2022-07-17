
interface Props {
  list?: any
  type?:string
  sortBy?:string
}
export const sorter=({list,type,sortBy}:Props)=>{          
    if(type==="ASC"){
        return list?.sort( (a:any, b:any)=> {
        return a[`${sortBy}`].localeCompare(b[`${sortBy}`]); 
      });
    }
    if(type==="DSC"){       
        return list?.sort( (a:any, b:any)=> {
          return b[`${sortBy}`].localeCompare(a[`${sortBy}`]); 
        });
    }
    else{       
        return list
    }}

export const searcher=({list,searchValue}:any)=>{
  const columns = list[0] && Object.keys(list[0]);  
  return list.filter((student:any) => {
    return columns.some(
      (column:any) =>
        student[column].toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  });
} 
