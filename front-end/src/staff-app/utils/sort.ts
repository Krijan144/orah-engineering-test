
interface Props {
  students?: any
  type?:string
  sortBy?:string
}
export const sorter=({students,type,sortBy}:Props)=>{          
    if(type==="ASC"){
        return students?.sort( (a:any, b:any)=> {
        return a[`${sortBy}`].localeCompare(b[`${sortBy}`]); 
      });
    }
    if(type==="DSC"){       
        return students?.sort( (a:any, b:any)=> {
          return b[`${sortBy}`].localeCompare(a[`${sortBy}`]); 
        });
    }
    else{       
        return students
    }}

export const searcher=({students,searchValue}:any)=>{
  const columns = students[0] && Object.keys(students[0]);  
  return students.filter((student:any) => {
    return columns.some(
      (column:any) =>
        student[column].toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  });
} 
