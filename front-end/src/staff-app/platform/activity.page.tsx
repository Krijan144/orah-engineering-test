import React,{useEffect,useState} from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing } from "shared/styles/styles"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"

export const ActivityPage: React.FC = () => {
  const [getStudents, data, loadState] = useApi({ url:"get-activities" })
  useEffect(() => {
    void getStudents()
  }, [getStudents])
  
  return <S.Container>Activity Page
     {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.activity && (
          <>
           
            {data.activity.map((item:any) => {              
              return (
                <>
                  <S.RollContainer>
                    <div>Roll Name:{item.entity.name}</div>
                    <div>Date:{item.entity.completed_at}</div>
                  </S.RollContainer>
                  {              
                    item.entity.student_roll_states.map((itemm:any)=>
                    <StudentListTile key={itemm.id}  student={itemm}  />
                    )
                  }
                </>
              )
            }
        )}
        </>
        )
        }

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
  </S.Container>
}
const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
  RollContainer:styled.div`
    display: flex;
    justify-content:space-between;
    margin-top: ${Spacing.u4};
  `
}
