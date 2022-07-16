import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import {BsSortAlphaDown,BsSortAlphaUpAlt,BsSearch} from "react-icons/bs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { nameSort } from "staff-app/constants/table"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [sortBy,setSortBy]=useState("first_name")
  const [search,setSearch]=useState("")
  
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  
  const [count,setCount]=useState([])

  useEffect(() => {
    void getStudents({sort:""})
  }, [getStudents])

  

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
    if(action==="ascending-sort"){
      void getStudents({sort:"ASC",sortBy:sortBy});
    }
    if(action==="descending-sort"){
      void getStudents({sort:"DSC",sortBy:sortBy});    
    }
    if(action==="search"){
      void getStudents({search:search});    
    }
  }
 

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }
  
  const stateChange=({student,state}:any)=>{
    if(count.length){
      const filterCount=count.filter(item=>item.id!==student.id)      
      setCount([...filterCount,{...student,state:state}])
    }
    else{
      setCount([...count,{...student,state:state}])

    }
   
  }
 

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} onSelectClick={(e)=>setSortBy(e)} handleChange={(e)=>{setSearch(e.target.value)}} search={search} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {data.students.map((student) => (
              <StudentListTile key={student.id} isRollMode={isRollMode} student={student} stateChange={(e)=>{stateChange({student:student,state:e})}}  />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} count={count} total={data?.students}/>
    </>
  )
}

type ToolbarAction = "roll" | "ascending-sort"|"descending-sort"|"search"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  onSelectClick:(value:string)=>void
  handleChange:(value:any)=>void
  search:string
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick,onSelectClick,handleChange,search } = props
  return (
    <S.ToolbarContainer>
      <div>Name</div>
      <div style={{display:"flex",columnGap:"12px"}}>
        Sort By:
        <select onChange={(e)=>{onSelectClick(e.target.value)}}>
          {
            nameSort.map(item=>{
              return<option key={item.id} value={item.value} >{item.name}</option>
            })
          }
        </select>
      <BsSortAlphaDown onClick={() => onItemClick("ascending-sort")}/>
      <BsSortAlphaUpAlt onClick={() => onItemClick("descending-sort")}/>
      </div>
     
      <div style={{display:"flex"}}>
        <S.StyledInput id="search" onChange={(e)=>handleChange(e)} value={search}/>
        <BsSearch onClick={()=>onItemClick("search")}/>
      </div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
    svg{
      font-size:20px;
      cursor:pointer;
    }
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
  
 StyledInput : styled.input`${({inputSize}:any)=>`
    font-size:${inputSize?inputSize:"20"}px; 
    position: relative;
    width: 100%;
    outline: none;
    transition:0.5s ease-in-out;
    border-radius: ${BorderRadius.default};
    :focus {
      outline: none;
      border-color: #9ecaed;
      box-shadow: 0 0 10px #9ecaed;    
    }
    ::placeholder {
      color: grey;
      }
    :hover {
      border-color: #9ecaed;
      box-shadow: 0 0 10px #9ecaed; 
    }
  `}`
}
