import { generateStudents } from "shared/helpers/data-generation"
import { httpMock } from "shared/helpers/http-mock"
import { addIfNotExist, LocalStorageKey } from "shared/helpers/local-storage"
import { ApiResponse } from "shared/interfaces/http.interface"
import { Person } from "shared/models/person"
import { sorter,searcher } from "staff-app/utils/sort"

export async function getHomeboardStudents({query}:any): Promise<ApiResponse<{ students: Person[] }>> {
  try {               
    await httpMock({ randomFailure: true })
    if(query.sort){    
      return {
        success: true,
        students: sorter({students:addIfNotExist(LocalStorageKey.students, generateStudents(14))||[],type:query.sort||"",sortBy:query.sortBy||""})!,
      }
    }
    if(query.search){
      return {
        success: true,
        students: searcher({students:addIfNotExist(LocalStorageKey.students, generateStudents(14)),searchValue:query.search||""}),
      }
    }
    else{
      return {
        success: true,
        students: addIfNotExist(LocalStorageKey.students, generateStudents(14)),
      }
    }
 
  } catch (error) {
    return {
      success: false,
      error: {},
    }
  }
}
