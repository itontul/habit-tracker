import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../util/context'
import styles from './ChainItem.module.css'

const ChainItem = ({ id, date, interval, complete, index }) => {
  const { habitList, completeDay } = useGlobalContext()
  const dates = habitList.find((item) => item.id === id).array[index]
  // const [input, setInput] = useState(array)
  // const checkCounter = ({ number, checked }) => {
  //   setInput(
  //     input.map((item) => {
  //       if (item.number !== number) {
  //         return item
  //       } else {
  //         completeDay({ id, date, day: item.number })
  //         return { ...item, checked: checked }
  //       }
  //     })
  //   )
  // }

  // const checkedCount = input.filter((item) => item.checked === true)

  // useEffect(() => {
  //   if (checkedCount.length >= times) {
  //     onComplete({ date, completed: true })
  //   } else {
  //     onComplete({ date, completed: false })
  //   }
  // }, [checkedCount.length, date, times])

  return (
    <div
      className={
        complete ? `${styles.chain} ${styles.completed}` : styles.chain
      }
    >
      {dates.map((i, index) => {
        return (
          <div key={index} className={styles.inputContainer}>
            <label>{i.date}</label>
            <input type='checkbox' />
          </div>
        )
      })}

      {/* {interval !== 'daily' && <p>Completed: {checkedCount.length} </p>} */}
    </div>
  )
}

export default ChainItem
