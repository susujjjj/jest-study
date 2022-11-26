import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HabitAddForm from '../../habitAddForm'
import renderer from 'react-test-renderer'
//npm install react-test-renderer@16.8.4 --save-dev

describe('HabitAddForm', () => {
  it('render', () => {
    //스냅샷 테스트 실행
    const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />)
    expect(component.toJSON()).toMatchSnapshot()
  })

  describe('Form Submit', () => {
    let onAdd
    let input
    let button

    beforeEach(() => {
      onAdd = jest.fn()
      render(<HabitAddForm onAdd={onAdd} />)
      input = screen.getByPlaceholderText('Habit')
      button = screen.getByText('Add')
    })

    it('calls onAdd when button is clicked and valid habit is entered', () => {
      // input에다가 원하는 습관의 이름을 타이핑한 다음에
      // add라는 버튼을 클릭하면
      // onAdd가 input에 입력된 이름과 함께 호출되어야 함

      userEvent.type(input, 'New Habit')
      userEvent.click(button)

      expect(onAdd).toHaveBeenCalledWith('New Habit')
    })

    it('does not call onAdd when the habit is empty', () => {
      userEvent.type(input, '')
      userEvent.click(button)

      //문자열이 비어있으면 onAdd를 호출하면 안되니까 CalledTimes에서 0번호출 되는걸 검사하면된다
      expect(onAdd).toHaveBeenCalledTimes(0)
      //해빗이 텅텅빈 문자열이라면 onAdd를 호출하면안됨.
    })
  })
})

//이름이 입력되지않았을때사용자가 버튼을 클릭하면 아무것도 처리하지 않는다도 테스트하기
