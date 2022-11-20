import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import './app.css'
import Habits from './components/habits'
import Navbar from './components/navbar'

const App = ({ presenter }) => {
  const [habits, setHabits] = useState(presenter.getHabits())
  // const [habits, setHabits] = useState([
  //   { id: 1, name: 'Reading', count: 0 },
  //   { id: 2, name: 'Running', count: 0 },
  //   { id: 3, name: 'Coding', count: 0 },
  // ])

  const handleIncrement = useCallback((habit) => {
    presenter.increment(habit, setHabits)
    // setHabits((habits) =>
    //   habits.map((item) => {
    //     if (item.id === habit.id) {
    //       return { ...habit, count: habit.count + 1 }
    //     }
    //     return item
    //   }),
    // )
  }, [])

  const handleDecrement = useCallback((habit) => {
    presenter.decrement(habit, setHabits)
    // setHabits((habits) =>
    //   habits.map((item) => {
    //     if (item.id === habit.id) {
    //       const count = habit.count - 1
    //       return { ...habit, count: count < 0 ? 0 : count }
    //     }
    //     return item
    //   }),
    // )
  }, [])

  const handleDelete = useCallback((habit) => {
    presenter.delete(habit, setHabits)
    // setHabits((habits) => habits.filter((item) => item.id !== habit.id))
  }, [])

  const handleAdd = useCallback((name) => {
    presenter.add(name, setHabits)
    // setHabits((habits) => [...habits, { id: Date.now(), name, count: 0 }])
  }, [])

  const handleReset = useCallback(() => {
    presenter.reset(setHabits)
    // setHabits((habits) =>
    //   habits.map((habit) => {
    //     if (habit.count !== 0) {
    //       return { ...habit, count: 0 }
    //     }
    //     return habit
    //   }),
    // )
  }, [])

  return (
    <>
      <Navbar totalCount={habits.filter((item) => item.count > 0).length} />
      <Habits
        habits={habits}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onReset={handleReset}
      />
    </>
  )
}

export default App
