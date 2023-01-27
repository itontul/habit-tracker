export default function reducer(state, { type, payload }) {
  switch (type) {
    case "ADD_HABIT":
      return { ...state, habitList: [...state.habitList, { ...payload }] };

    case "SET_ARRAY":
      let tempList = state.habitList.map((item) => {
        if (item.id === payload.id) {
          return { ...item, array: payload.array };
        } else {
          return item;
        }
      });
      return { ...state, habitList: tempList };

    case "COMPLETE_DAY":
      let completedDay = state.habitList.map((item) => {
        if (item.id === payload.id) {
          const completedArray = item.array.map((date) => {
            if (date.date === payload.date) {
              return { ...date, complete: !date.complete };
            } else {
              return date;
            }
          });
          return { ...item, array: completedArray };
        } else {
          return item;
        }
      });
      return { ...state, habitList: completedDay };

    case "COMPLETE_INTERVAL":
      console.log(payload);
      let completedInterval = state.habitList.map((item) => {
        if (item.id === payload.id) {
          return { ...item, complete: payload.completed };
        } else {
          return item;
        }
      });
      return { ...state, habitList: completedInterval };

    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}
