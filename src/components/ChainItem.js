import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../util/context";
import styles from "./ChainItem.module.css";

const ChainItem = ({ id, array, date, interval, times, index }) => {
  const { habitList, completeDay, completeInterval } = useGlobalContext();
  const [complete, setComplete] = useState(false);

  let dates;
  if (interval !== "daily") {
    dates = array[index];
  } else {
    dates = array;
  }
  const [input, setInput] = useState(dates);
  const checkCounter = (date) => {
    setInput(
      input.map((item) => {
        if (item.date !== date) {
          return item;
        } else {
          completeDay({ date, id });
          return { ...item, complete: !item.complete };
        }
      })
    );
  };

  const checkedCount = input.filter((item) => item.complete === true);

  useEffect(() => {
    if (interval !== "daily" && checkedCount.length >= times) {
      completeInterval({ id, completed: true });
      setComplete(true);
    } else {
      completeInterval({ id, completed: false });
      setComplete(false);
    }
  }, [checkedCount.length, id, times]);

  return (
    <div
      className={
        complete ? `${styles.chain}  ${styles.completed}` : styles.chain
      }
    >
      {dates.map((i, index) => {
        return (
          <div key={index} className={styles.inputContainer}>
            <label>{i.date}</label>
            <input
              type="checkbox"
              onChange={() => {
                checkCounter(i.date);
              }}
            />
          </div>
        );
      })}

      {interval !== "daily" && <p>Completed: {checkedCount.length} </p>}
    </div>
  );
};

export default ChainItem;
