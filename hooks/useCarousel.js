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
  desired: 0,
  active: 0,
}

function previous(length, current) {
  return (current - 1 + length) % length
}

function next(length, current) {
  return (current + 1) % length
}

function carouselReducer(state, action) {
  switch (action.type) {
    case 'jump':
      return { ...state, desired: action.desired }
    case 'next':
      return { ...state, desired: next(action.length, state.active) }
    case 'prev':
      return { ...state, desired: previous(action.length, state.active) }
    case 'done':
      return { ...state, offset: NaN, active: state.desired }
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
  const n = Math.max(1, Math.min(itemsVisible, length))
  const itemIndexArr =
    length &&
    Array(length)
      .fill()
      .map((_, i) => i)
  const shadowSlides = itemsVisible * 2

  const [state, dispatch] = useReducer(carouselReducer, initialCarouselState)
  const [container, setContainer] = useState(undefined)

  const orderedItemIndexArr = state.active
    ? [...itemIndexArr.slice(state.active), ...itemIndexArr.slice(0, state.active)]
    : itemIndexArr

  const ghostMap = Array(itemsVisible)
    .fill()
    .map((_, i) => i)
  const beforeGhostItems = ghostMap.map((i) => orderedItemIndexArr[orderedItemIndexArr.length - 1 - i]).reverse()
  const afterGhostItems = ghostMap.map((i) => orderedItemIndexArr[i])
  const itemsWithGhosts = [...beforeGhostItems, ...orderedItemIndexArr, ...afterGhostItems]
  console.log(state.active, itemsWithGhosts)

  const [items, setItems] = useState(undefined)
  const [activeItem, setActiveItem] = useState()
  const itemWidth = 800
  const itemGap = 64
  const totalWidth = items?.reduce((acc, item, index) => {
    acc = acc + item.el.clientWidth + (index === items.length - 1 ? 0 : itemGap)
    return acc
  }, 0)
  // console.log({ items, totalWidth })
  const { ref, onMouseDown } = useSwipeable({
    onSwiping(e) {
      const sign = e.deltaX > 0 ? -1 : 1
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
        const newItems = [...(container?.children ? container.children : [])].map((item) => ({
          rect: item.getBoundingClientRect(),
          el: item,
        }))

        if (newItems?.length) {
          setItems(newItems)
          setActiveItem(newItems[itemsVisible])
        }

        return ref(container)
      },
    }),
    [state.active]
  )

  const isVisible = (bounding) => {
    return bounding.left >= 0 && bounding.right <= (container.clientWidth || document.documentElement.clientWidth)
  }

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'next', length }), interval)
    return () => clearTimeout(id)
  }, [state.offset, state.active])

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'done' }), transitionTime)
    return () => clearTimeout(id)
  }, [state.desired])

  const style = {
    transform: 'translateX(0)',
    width: `${totalWidth}px`,
    left: `${-((itemWidth + itemGap) * itemsVisible) + (isInBrowser ? window.innerWidth : 0) / 2 - itemWidth / 2}px`,
  }

  if (state.desired !== state.active) {
    const dist = Math.abs(state.active - state.desired)
    const pref = Math.sign(state.offset || 0)
    const dir = (dist > length / 2 ? 1 : -1) * Math.sign(state.desired - state.active)
    const shift = (totalWidth * (pref || dir)) / (length + shadowSlides)
    style.transition = smooth
    if (state.active === length - 1 && dir === -1) {
      console.log(state.active, length, dir)
      style.transform = `translateX(${(800 + itemGap) * (length + 1)}px)`
    } else {
      style.transform = `translateX(${(800 + itemGap) * dist * dir}px)`
    }
  } else if (!isNaN(state.offset)) {
    if (state.offset !== 0) {
      style.transform = `translateX(${-state.offset}px)`
    } else {
      style.transition = elastic
    }
  }

  const visibleItems = items?.filter((item) => isVisible(item.rect))

  // console.log({ visibleItems })

  return [itemsWithGhosts, state.desired, (n) => dispatch({ type: 'jump', desired: n }), handlers, style]
}

function makeIndices(start, delta, num) {
  const indices = []

  while (indices.length < num) {
    indices.push(start)
    start += delta
  }

  return indices
}
