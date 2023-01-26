import styles from './App.module.css'
import AddHabit from './components/AddHabit'
import HabitList from './components/HabitList'
import { useGlobalContext } from './util/context'

// const URL =
//   'https://bamboo-magnet-335718-default-rtdb.firebaseio.com/habits.json'

function App() {
  const { habitList } = useGlobalContext()
  // useEffect(() => {
  //   addHabitHandler()
  // })

  // const addHabitHandler = async (data) => {
  //   const res = await axios.post(URL, { ...data, Array: [] })
  //   const json = await res.data
  // }

  return (
    <div className={styles.App}>
      <h1>Habit Tracker App</h1>
      <AddHabit />
      {habitList.length > 0 && <HabitList />}
    </div>
  )
}

export default App
