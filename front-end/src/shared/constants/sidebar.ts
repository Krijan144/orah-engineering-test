import { BsFillPersonCheckFill, BsFilePersonFill } from "react-icons/bs"

interface SidebarType {
  path: string
  icon?: any
  label: string
}
export const SidebarItem: SidebarType[] = [
  {
    path: "daily-care",
    icon: BsFillPersonCheckFill,
    label: "Daily Care",
  },
  {
    icon: BsFilePersonFill,
    path: "activity",
    label: "Activity",
  },
]
