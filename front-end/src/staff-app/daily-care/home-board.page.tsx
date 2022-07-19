import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { BsSortAlphaDown, BsSortAlphaUpAlt, BsSearch } from "react-icons/bs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { nameSort } from "staff-app/constants/daily-care"
import { useNavigate } from "react-router-dom"

export const HomeBoardPage: React.FC = () => {
  let navigate = useNavigate()
  const [isRollMode, setIsRollMode] = useState(false)
  const [sortBy, setSortBy] = useState("first_name")
  const [search, setSearch] = useState("")
  const [studentstate, setStudentstate] = useState<any>([])

  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [saveRoll] = useApi<{ students: Person[] }>({ url: "save-roll" })

  useEffect(() => {
    void getStudents({ sort: "" })
  }, [getStudents])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
    if (action === "default") {
      setSearch("")
      void getStudents({ sort: "" })
    }
    if (action === "ascending-sort") {
      void getStudents({ sort: "ASC", sortBy: sortBy })
    }
    if (action === "descending-sort") {
      void getStudents({ sort: "DSC", sortBy: sortBy })
    }
    if (action === "search") {
      void getStudents({ search: search })
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "late") {
      getStudents({ filter: "late", list: studentstate })
    }
    if (action === "present") {
      getStudents({ filter: "present", list: studentstate })
    }
    if (action === "absent") {
      getStudents({ filter: "absent", list: studentstate })
    }
    if (action === "complete") {
      saveRoll(studentstate)
      navigate("/staff/activity")
    }
    if (action === "exit") {
      setIsRollMode(false)
    }
  }

  const stateChange = ({ student = [], state = "" }: any) => {
    if (studentstate.length) {
      const filterStudentstate = studentstate.filter((item: any) => item.id !== student.id)
      setStudentstate([...filterStudentstate, { ...student, roll_state: state }])
    } else {
      setStudentstate([...studentstate, { ...student, roll_state: state }])
    }
  }

  return (
    <>
      <S.PageContainer>
        <S.Title>Daily Care</S.Title>
        <Toolbar
          onItemClick={onToolbarAction}
          onSelectClick={(e) => setSortBy(e)}
          handleChange={(e) => {
            setSearch(e.target.value)
          }}
          search={search}
        />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {data.students.map((student) => (
              <StudentListTile
                key={student.id}
                isRollMode={isRollMode}
                student={student}
                stateChange={(e: string) => {
                  stateChange({ student: student, state: e })
                }}
              />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} studentstate={studentstate} total={data?.students} />
    </>
  )
}

type ToolbarAction = "roll" | "ascending-sort" | "descending-sort" | "search" | "late" | "absent" | "present" | "default"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  onSelectClick: (value: string) => void
  handleChange: (value: any) => void
  search: string
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, onSelectClick, handleChange, search } = props
  const [active, setActive] = useState("")
  const activeStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#00FF00" : "none",
    transition: isActive ? "scale(1.12)" : "0",
  })

  return (
    <S.ToolbarContainer>
      <div>Name</div>
      <div style={{ display: "flex", columnGap: "12px" }}>
        Sort By:
        <select
          onChange={(e) => {
            onSelectClick(e.target.value)
          }}
        >
          {nameSort.map((item) => {
            return (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            )
          })}
        </select>
        <div
          style={{ color: `${active === "ascending-sort" ? "#00FF00" : (active === "descending-sort" && "") || ""}` }}
          onClick={() => {
            setActive(active === "ascending-sort" ? "" : "ascending-sort"), onItemClick(active === "ascending-sort" ? "default" : "ascending-sort")
          }}
        >
          <BsSortAlphaDown />
        </div>
        <div
          style={{ color: `${active === "descending-sort" ? "#00FF00" : (active === "ascending-sort" && "") || ""}` }}
          onClick={() => {
            setActive(active === "descending-sort" ? "" : "descending-sort"), onItemClick(active === "descending-sort" ? "default" : "descending-sort")
          }}
        >
          <BsSortAlphaUpAlt />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
        <S.StyledInput id="search" onChange={(e) => handleChange(e)} value={search} />
        <BsSearch onClick={() => onItemClick("search")} />
        {search && <div onClick={() => onItemClick("default")}>Reset</div>}
      </div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
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
    svg {
      font-size: 20px;
      cursor: pointer;
    }
  `,
  Title: styled.h4`
    font-size: 1.3rem;
    font-weight: bold;
    width: fit-content;
    border-bottom: 4px solid;
    color: ${Colors.blue.base};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,

  StyledInput: styled.input`
    ${({ inputSize }: any) => `
    font-size:${inputSize ? inputSize : "20"}px; 
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
  `}
  `,
}
