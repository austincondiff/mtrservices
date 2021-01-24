import { useReducer, useEffect, useState, useMemo } from 'react'
import { useSwipeable, SwipeableHandlers } from 'react-swipeable'
import isInBrowser from 'is-in-browser'

// defines the time for the animation between slides in milliseconds
const transitionTime = 400
// defines the threshold when to accept a swipe
const threshold = 0.3
// defines the limit for swiping (max. the next full and a bit)
const limit = 1.2
// animation to be used when bouncing back
const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`
// animation to be used when automatically sliding
const smooth = `transform ${transitionTime}ms ease`

const initialCarouselState = {
  offset: 0,
  target: 0,
  active: 0,
}

function previous(current) {
  return current - 1
}

function next(current) {
  return current + 1
}

function targetToActive(target, length) {
  return target < 0 ? (target + length) % length : target > length - 1 ? target % length : target
}

function carouselReducer(state, action) {
  switch (action.type) {
    case 'jump':
      return { ...state, target: action.target }
    case 'next':
      return { ...state, target: next(Math.max(state.active, state.target)) }
    case 'prev':
      return { ...state, target: previous(Math.min(state.active, state.target)) }
    case 'done':
      return {
        ...state,
        offset: NaN,
        active: targetToActive(state.target, action.length),
        target: targetToActive(state.target, action.length),
      }
    case 'drag':
      return { ...state, offset: action.offset }
    default:
      return state
  }
}

function swiped(delta, dispatch, length, dir, container) {
  const t = container.clientWidth * threshold
  const d = dir * delta

  if (d >= t) {
    dispatch(dir > 0 ? { type: 'next', length } : { type: 'prev', length })
  } else {
    dispatch({
      type: 'drag',
      offset: 0,
    })
  }
}

export function useCarousel(length, interval, options = {}) {
  const itemsVisible = 3
  const itemWidth = 800
  const itemGap = 64
  const itemIndexArr = Array(length || 0)
    .fill()
    .map((_, i) => i)
  const [state, dispatch] = useReducer(carouselReducer, initialCarouselState)
  const [container, setContainer] = useState(undefined)
  const orderedItemIndexArr = itemIndexArr
  const ghostMap = Array(itemsVisible)
    .fill()
    .map((_, i) => i)
  const beforeGhostItems = ghostMap.map((i) => orderedItemIndexArr[orderedItemIndexArr.length - 1 - i]).reverse()
  const afterGhostItems = ghostMap.map((i) => orderedItemIndexArr[i])
  const itemsToDisplay = [...beforeGhostItems, ...orderedItemIndexArr, ...afterGhostItems]
  // console.log(itemsToDisplay)
  // const [items, setItems] = useState(undefined)
  // const [activeItem, setActiveItem] = useState()
  // const totalWidth = items?.reduce((acc, item, index) => {
  //   acc = acc + item.el.clientWidth + (index === items.length - 1 ? 0 : itemGap)
  //   return acc
  // }, 0)
  const { ref, onMouseDown } = useSwipeable({
    onSwiping(e) {
      const sign = Math.sign(-e.deltaX)
      dispatch({
        type: 'drag',
        offset: sign * Math.min(Math.abs(e.deltaX), limit * container.clientWidth),
      })
    },
    onSwipedLeft(e) {
      swiped(e.deltaX, dispatch, length, 1, container)
    },
    onSwipedRight(e) {
      swiped(e.deltaX, dispatch, length, -1, container)
    },
    trackMouse: true,
    trackTouch: true,
  })

  const handlers = useMemo(
    () => ({
      onMouseDown,
      ref(container) {
        setContainer(container)
        // const newItems = [...(container?.children ? container.children : [])].map((item) => ({
        //   rect: item.getBoundingClientRect(),
        //   el: item,
        // }))

        // if (newItems?.length) {
        //   setItems(newItems)
        //   setActiveItem(newItems[itemsVisible])
        // }

        return ref(container)
      },
    }),
    [state.active]
  )

  // const isVisible = (bounding) => {
  //   return bounding.left >= 0 && bounding.right <= (container.clientWidth || document.documentElement.clientWidth)
  // }

  useEffect(() => {
    console.log(state.target)
    const id = setTimeout(() => dispatch({ type: 'next', length }), interval)
    return () => clearTimeout(id)
  }, [state.offset, state.active])

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'done', length }), transitionTime)
    return () => clearTimeout(id)
  }, [state.target])

  const windowWidth = isInBrowser ? window.innerWidth : 0

  const activePosition = -((itemWidth + itemGap) * (state.active + itemsVisible)) + windowWidth / 2 - itemWidth / 2
  const targetPosition = -((itemWidth + itemGap) * (state.target + itemsVisible)) + windowWidth / 2 - itemWidth / 2

  const style = {
    transform: `translateX(${activePosition}px)`,
    // width: `${totalWidth}px`,
    // left: 0,
  }

  if (targetToActive(state.target, length) !== state.active) {
    // const dist = Math.abs(state.active - state.target)
    // const pref = Math.sign(state.offset || 0)
    // const dir = (dist > length / 2 ? 1 : -1) * Math.sign(state.target - state.active)
    // const shift = (totalWidth * (pref || dir)) / (length + itemsVisible * 2)
    style.transition = smooth
    style.transform = `translateX(${targetPosition}px)`
    // console.log({ target: state.target, active: state.active, targetPosition })

    // if (state.active === length - 1 && dir === -1) {
    //   console.log(state.active, length, dir)
    //   style.transform = `translateX(${(itemWidth + itemGap) * (length + 1)}px)`
    // } else {
    //   style.transform = `translateX(${(itemWidth + itemGap) * dist * dir}px)`
    // }
  } else if (!isNaN(state.offset)) {
    if (state.offset !== 0) {
      style.transform = `translateX(${activePosition - state.offset}px)`
    } else {
      style.transition = elastic
    }
  }

  return {
    slideIndices: itemsToDisplay,
    active: targetToActive(state.target, length),
    jump: (n) => dispatch({ type: 'jump', target: n }),
    next: () => dispatch({ type: 'next' }),
    previous: () => dispatch({ type: 'prev' }),
    handlers,
    style,
  }
}
