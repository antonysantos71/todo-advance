import { Aside } from "../../components/aside"
import { Header } from "../../components/header"

export const Reminders = () => {
  return(
    <div className="flex">
      <Aside />
      <Header typePage="Remiders" />
    </div>
  )
}