import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import {BsSortAlphaDown,BsSortAlphaUpAlt} from "react-icons/bs"
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
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  
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
  }
 

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} onSelectClick={(e)=>{console.log(e,"log"),setSortBy(e)}} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {data.students.map((student) => (
              <StudentListTile key={student.id} isRollMode={isRollMode} student={student} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "ascending-sort"|"descending-sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  onSelectClick:(value:string)=>void
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick,onSelectClick } = props
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
     
      <div>Search</div>
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
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
