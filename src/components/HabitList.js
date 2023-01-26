import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { useGlobalContext } from '../util/context'
import HabitItem from './HabitItem'
import styles from './HabitList.module.css'

const HabitList = () => {
  // const [habits, setHabits] = useState([])

  // const getData = useCallback(async () => {
  //   const resp = await axios.get(url)
  //   const data = await resp.data
  //   const loadedHabits = []

  //   for (const key in data) {
  //     loadedHabits.push({
  //       id: data[key].id,
  //       title: data[key].title,
  //       interval: data[key].interval,
  //       times: data[key].times,
  //       date: data[key].date,
  //       array: [],
  //     })
  //   }
  //   setHabits(loadedHabits)
  // }, [url])

  // useEffect(() => {

  //   getData()
  // }, [getData, habits])

  const { habitList } = useGlobalContext()

  return (
    <div className={styles.habitContainer}>
      {habitList.map((item) => {
        return <HabitItem {...item} key={item.id} />
      })}
    </div>
  )
}

export default HabitList
