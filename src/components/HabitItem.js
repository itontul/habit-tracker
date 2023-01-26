import moment from 'moment/moment'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './HabitItem.module.css'
import ChainItem from './ChainItem'
import { useGlobalContext } from '../util/context'

const HabitItem = ({ id, date, interval, times, title, array }) => {
  const { habitList, setArray, completeDay } = useGlobalContext()
  // Array formation  depending on intervals
  useEffect(() => {
    let endDate = moment()
    let start = moment(date)
    if (start > endDate) {
      start = endDate
    }

    if (interval === 'weekly') {
      start = start.startOf('week')
    }

    if (interval === 'monthly') {
      start = start.startOf('month')
    }

    const dayArray = []
    let currentDay = start
    while (currentDay.isSameOrBefore(endDate)) {
      dayArray.unshift({
        date: currentDay.format('DD MMM'),
        complete: false,
        id: currentDay.format('DDMMMYYYY'),
      })
      currentDay = currentDay.add(1, 'day')
    }

    if (interval === 'daily') {
      setArray(id, dayArray)
    }

    if (interval === 'weekly') {
      let weekArray = []
      for (let index = 0; index < dayArray.length; index += 7) {
        weekArray.unshift(dayArray.slice(index, index + 7))
      }
      setArray(id, weekArray)
    }

    if (interval === 'monthly') {
      const arrayLength = moment().diff(date, 'months')
      let monthArray = []
      let tempDate = moment(date)
      for (let i = 0; i <= arrayLength; i++) {
        const daysInMonth = tempDate.daysInMonth()
        let tempArray = []
        for (let j = 1; j <= daysInMonth; j++) {
          tempArray.unshift({
            date: tempDate.date(j).format('DD MMM'),
            complete: false,
            id: tempDate.date(j).format('DDMMMYYYY'),
          })
        }
        monthArray.unshift([...tempArray])
        tempDate.add(1, 'months')
      }
      setArray(id, monthArray)
    }
  }, [date, interval])

  // Calculating streaks
  const [trueVals, setTrueVals] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  useEffect(() => {
    let currentStreakCount = 0
    let longestStreakCount = 0
    let trueCompletes = 0

    for (let i = habitList.length - 1; i >= 0; i--) {
      const day = habitList[i]
      if (day.complete) {
        trueCompletes += 1
        currentStreakCount += 1
      } else {
        currentStreakCount = 0
      }
      if (currentStreakCount > longestStreakCount) {
        longestStreakCount = currentStreakCount
      }
    }
    if (currentStreakCount > longestStreakCount) {
      longestStreakCount = currentStreakCount
    }
    setCurrentStreak(currentStreakCount)
    setLongestStreak(longestStreakCount)
    setTrueVals(trueCompletes)
  }, [habitList])

  // Complete the task for the interval
  const handleChange = useCallback(
    ({ date, completed }) => {
      completeDay(
        array.map((day) => {
          if (day.date !== date) {
            return day
          } else {
            return { ...day, complete: completed }
          }
        })
      )
    },
    [array]
  )
  return (
    <div key={id} className={styles.habitItem}>
      <header>
        <h2>{title}</h2>
        <p>
          <span className={styles.emphasized}>Start Date:</span>
          {moment(date).format('DD.MM.YYYY')}
        </p>
        <p>
          <span className={styles.emphasized}>Current Streak:</span>
          {currentStreak}
        </p>
        <p>
          <span className={styles.emphasized}>Longest Streak:</span>
          {longestStreak}
        </p>
        <p>
          <span className={styles.emphasized}>Total:</span> {trueVals}
        </p>
      </header>
      <main className={styles.chains}>
        {array.map((item, index) => {
          return (
            <ChainItem
              {...item}
              index={index}
              array
              id={id}
              interval={interval}
              title={title}
              key={index}
              times={times}
              onComplete={handleChange}
            />
          )
        })}
      </main>
    </div>
  )
}

export default HabitItem
