import React, { useState } from 'react'
import styles from './AddHabit.module.css'
import uniqid from 'uniqid'
import { useGlobalContext } from '../util/context'

const AddHabit = () => {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredInterval, setEnteredInterval] = useState('daily')
  const [enteredTimes, setEnteredTimes] = useState(1)
  const [enteredDate, setEnteredDate] = useState('')
  const { addHabit } = useGlobalContext()

  const submitHandler = (e) => {
    e.preventDefault()
    if ((enteredTitle, enteredInterval, enteredTimes, enteredTitle)) {
      const addedHabit = {
        id: uniqid(),
        title: enteredTitle,
        interval: enteredInterval,
        times: enteredTimes,
        date: enteredDate,
        array: [],
      }
      addHabit(addedHabit)
    } else {
      return
    }
    setEnteredTitle('')
    setEnteredInterval('daily')
    setEnteredTimes(1)
    setEnteredDate('')
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.formItem}>
        <label htmlFor='habit'>Habit:</label>
        <input
          type='text'
          required
          value={enteredTitle}
          className={styles.habitInput}
          placeholder='Read a book for 10 mins'
          onChange={(e) => setEnteredTitle(e.target.value)}
        />
      </div>
      <div className={styles.formItem}>
        <label htmlFor='interval'>Interval:</label>
        <select
          name='interval'
          required
          onChange={(e) => setEnteredInterval(e.target.value)}
        >
          <option value='daily'>Daily</option>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Montly</option>
        </select>
        <label htmlFor='times'>Times:</label>
        <input
          type='number'
          value={enteredTimes}
          className={styles.timesInput}
          required
          onChange={(e) => setEnteredTimes(e.target.value)}
          min='1'
        />
      </div>
      <div className={styles.formItem}>
        <label htmlFor='date'>Starting Date:</label>
        <input
          type='date'
          className={styles.dateInput}
          required
          onChange={(e) => setEnteredDate(e.target.value)}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default AddHabit
