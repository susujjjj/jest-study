import HabitPresenter from '../components/habit_presenter'

describe('HabitPresenter', () => {
  const habits = [
    { id: 1, name: 'Reading', count: 1 },
    { id: 2, name: 'Running', count: 0 },
  ]
  //초기화하는 값과 presenter를 생성해줘야함
  let presenter

  //update는 mock을 이용해보겠음
  let update

  //항상 테스트를 시작하기 전에 beforeEach에서 초기화들을 진행해줄거에요.
  beforeEach(() => {
    //항상 시작하는 초기값이 있어야하므로 여기서 배열을 만들면 되는데,
    //여기에다가 바로 배열을 만들면 되지만 나중에 이 배열에 대해서 테스트 하고 할때
    //이 배열에 접근을 해야하므로 외부에다가 정의해줘야함. const habits =[] ....
    presenter = new HabitPresenter(habits)
    update = jest.fn() //update는 jest에서 제공하는 목함수를 이용하면됨
  })

  //첫번째 테스트는 프레젠터는 inits 초기화한다 전달된 habit으로..
  //그래서 실제로 이 초기값이 잘 설정되는지 테스트를 해볼거에요.
  it('inits with habits', () => {
    //그래서 나는 예상하는데, presenter의 getHabit을 했을때,
    //초기값이 잘 지정되어있어야겠죠? 우리가 사용하는 배열과 똑같아야한다
    expect(presenter.getHabits()).toEqual(habits)
  })

  //habit presenter는 증가시킨다. increments를 한다. habit count를. 그리고 항상 update callback을 호출한다
  it('increments habit count and call update callback', () => {
    //즉 increment는 해당 habit을 항상 증가하고 그리고 업데이트도 마지막에 호출해줘야겠쥬?
    presenter.increment(habits[0], update) //habit의 첫번째 배열의 아이템을 전달해줄거임

    // habit에 첫번째에 있는 카운트가 증가해야되겠죠?
    //첫번째 아이템은 count가 1이니까 증가시키면 2가 되어야함 그래서 presenter에 가지고있는 gatHabits을 가져와서
    //첫번째로 가리키고있는 아이템의 count가 toBe 정확하게 2가되어야하고,
    expect(presenter.getHabits()[0].count).toBe(2)
    checkUpdateIsCalled()
    //업데이트 함수가 toHaveVennCalledTimes에 한번 호출이 되어야 합니다
    //expect(update).toHaveBeenCalledTimes(1)
    //업뎃은 한번 호출이 되어야하고

    //또 뭐가 되어야할까? 그러쵸. 호출이 될때 정확하게 이 presenter에서 가지고있는 habit이 전달되는지도 확인하고싶어요
    //그럴때는 toHaveBeenCalledWith
    //expect(update).toHaveBeenCalledWith(presenter.getHabits())
    //이 함수가 호출될때, presenter에있는 gethabit으로 호출이 되었는지. 즉 그말은
    //presenter에서 업데이트한 habit의 배열이 우리가 업데이트할때 호출할때
    //정확한 그 배열을 전달했는지를 검사하는거겟죠 ?
  })

  it('decrements habit count and call update callback', () => {
    presenter.decrement(habits[0], update)

    expect(presenter.getHabits()[0].count).toBe(0)
    checkUpdateIsCalled()
  })
  //그리고 decrement할때, 0에서 decrement하게되면 마이너스로 가니까 그거 방지하기 위해서
  it('does not set the count value below 0', () => {
    presenter.decrement(habits[0], update) //habit의 첫번째 아이템을 decrement할거임. update도 전달
    presenter.decrement(habits[0], update)
    //똑같이반복. 그러니까 decrement를 두번하겠죠, 대신에 계속 해빗을 동일한, 즉 habit에 있는 첫번째거를 전달해주니까
    //이 배열을 만든 뒤로는 이 배열을 업데뎃하진안죠  우리가 업데이트를 지금 mocking을 했기때문에
    //업데이트를 호출해도 우리 기존에 가지고있는 배열은 업데이트 되지 않아요
    //그러니까 즉 habit에 있는 첫번째 배열 아이템을 전달해준다는 말은, 계속 count가 1인 배열을 전달해준다는 말이죠 .
    //1을 전달해주고, (첫번째)1을 감소하니까 1에서 감소0, (두번째)0에서 하나 감소 또 0이 된다는것
    //그래서 항상 0 0 이니까 이 테스트는 실패하지 않겠죠

    //두번감소하더라도 우리가원하는 것은 presenter의 getHabit을 가지고 왔을때, 첫번째의 카운트가 toBe 0이되어야된다는거죠
    expect(presenter.getHabits()[0].count).toBe(0)
  })

  it('deletes habit from the list', () => {
    //presenter의 delete을 호출하면 첫번째 배열을 삭제할거에요
    presenter.delete(habits[0], update)

    //그러면 , expect() presenter에 있는 getHabit의 길이가, 2개가 아니라 하나가 되어야함 !
    expect(presenter.getHabits().length).toBe(1)
    //그리고 하나 더 확인해보자면. 그럼 habit에 있는 배열의 아이템에 우리가 첫번째껄 삭제했으니까
    //첫번째껄 삭제하면 이제 첫번째께 삭제가 되면 이제 첫번째 아이템은 Running이겠죠? 그럼 이름이 Running인지도 확인해볼게요.

    expect(presenter.getHabits()[0].name).toBe('Running')

    //여기서 그리고 update도 호출해줘야죠
    checkUpdateIsCalled()
  })

  //뉴 해빗 추가
  it('adds new habit to the list', () => {
    presenter.add('Eating', update)

    expect(presenter.getHabits()[2].name).toBe('Studying') // 새로 추가되었으니까 두번째 인덱스에 있는 habit의 이름이 'Studying'
    expect(presenter.getHabits()[2].count).toBe(0) // count 0으로 초기화

    checkUpdateIsCalled() //그리고 항상 업데이트 호출되어있는지 확인해주어야함
  })

  it('resets all habit counts to 0', () => {
    presenter.reset(update)

    expect(presenter.getHabits()[0].count).toBe(0)
    expect(presenter.getHabits()[1].count).toBe(0)
    checkUpdateIsCalled()
  })

  //업데이트 함수가 호출되었는지 체크하는 함수 .반복적으로 들어가니까 묶어서 할당해줄거임
  function checkUpdateIsCalled() {
    //요 함수를 호출하면 요 두가지가 확인이 되도록 만들거임
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(presenter.getHabits())
  }
})

//우리가 테스트 할때 뭐라그랬죠? 의도적으로 실패하라
//실패하는 테스트를 먼저 만들고 성공으로 바꿔라
//만약 그 테스트가 어떤 경우에도 실패하지 않으면 무언가 잘못된거다
