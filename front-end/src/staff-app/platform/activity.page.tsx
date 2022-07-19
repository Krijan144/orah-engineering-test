import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing } from "shared/styles/styles"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { Colors } from "shared/styles/colors"
import { colors } from "@material-ui/core"

export const ActivityPage: React.FC = () => {
  const [getStudents, data, loadState] = useApi<{ activity: [] }>({ url: "get-activities" })
  const [params, setParams] = useState({ value: "", type: "" })
  useEffect(() => {
    void getStudents()
  }, [getStudents])
  const onFilterAction = (action: string) => {
    if (action === "filter") {
      getStudents(params)
    }
    if (action === "default") {
      getStudents()
    }
  }
  return (
    <S.Container>
      <S.Title> Activity Page</S.Title>
      <div style={{display:"flex",columnGap:"10px"}}>
        <select onChange={(e) => setParams({ value: e.target.value, type: "date" })}>
          <option value="" disabled selected>
            Select Date
          </option>
          {data?.activity.map((item: any) => (
            <option key={item.entity.completed_at} value={item.entity.completed_at}>
              {item.entity.completed_at}
            </option>
          ))}
        </select>
        <Button onClick={() => onFilterAction("filter")}>Filter</Button>
        <Button color="darkred" onClick={() => onFilterAction("default")}>Reset</Button>

      </div>
      {loadState === "loading" && (
        <CenteredContainer>
          <FontAwesomeIcon icon="spinner" size="2x" spin />
        </CenteredContainer>
      )}
      {loadState === "loaded" && data?.activity && (
        <>
          {data.activity.map((item: any) => {
            return (
              <>
                <S.RollContainer>
                  <p>{item.entity.name}</p>
                  <p>Date:{item.entity.completed_at}</p>
                </S.RollContainer>
                {item.entity.student_roll_states.map((itemm: any) => (
                  <StudentListTile key={itemm.id} student={itemm} showRoll={true} />
                ))}
              </>
            )
          })}
        </>
      )}
      {loadState === "error" && (
        <CenteredContainer>
          <div>Failed to load</div>
        </CenteredContainer>
      )}
    </S.Container>
  )
}
const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: ${Spacing.u4} auto 0;
    padding-bottom: 5rem;
  `,
  RollContainer: styled.div`
    display: flex;
    background: ${Colors.blue.base};
    border-radius: 4px;
    color: #fff;
    font-weight: 500;
    padding: 5px;
    justify-content: space-between;
    margin-top: ${Spacing.u4};
  `,
  Title: styled.h4`
    font-size: 1.3rem;
    font-weight: bold;
    width: fit-content;
    border-bottom: 4px solid;
    color: ${Colors.blue.base};
  `,
}
export const Button = styled.button`
  background-color: ${({ color }) => (color ? color : Colors.blue.base)};
  border: 1px solid transparent;
  border-radius: 0.75rem;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  flex: 0 0 auto;
  padding: 0.35rem 0.8rem;
  text-align: center;
  text-decoration: none #6b7280 solid;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  transition: 0.3s;
  :hover {
    transform: scale(1.12);
  }

  :focus {
    box-shadow: none;
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`
