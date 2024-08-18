import { Aside } from "../../components/aside"
import { Header } from "../../components/header"

export const WeeklyGoals = () => {
  return(
    <div className="flex">
      <Aside />
      <Header typePage="Weekly Goals" />
    </div>
  )
}