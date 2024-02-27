import { useState } from "react"

const useItemContainer = (startState = [], unique = false, onUpdate = undefined) => {
  const [items, setItemsState] = useState(startState)

  const setItems = (newItems) => {
    setItemsState(newItems)
    onUpdate && onUpdate(newItems)
  }

  const id = (item) => item.id

  const ids = () => _.map(items, "id")

  const canAdd = (item) => !unique || !includes(item)

  const add = (item) => {
    if (canAdd(item)) {
      setItems(_.concat(items, item))
    }
  }

  // XXX Cannot call add() here because when we read items and setState only the last setState call is respected.
  const addAll = (newItems) => {
    const keptItems = _.filter(newItems, (i) => canAdd(i))
    setItems(_.concat(items, keptItems))
  }

  const remove = (item) => {
    setItems(_.reject(items, (i) => id(i) == id(item)))
  }

  // XXX Cannot call remove() here because when we read items and setState only the last setState call is respected.
  const removeAll = (removedItems) => {
    const removedItemIds = _.map(removedItems, "id")
    setItems(_.reject(items, (i) => _.includes(removedItemIds, id(i))))
  }

  // XXX Can be optimized by building an index
  const includes = (item) => _.includes(ids(), id(item))

  const toggle = (item) => {
    if (includes(item)) {
      remove(item)
    } else {
      add(item)
    }
  }

  const getAll = () => items

  return [
    items,
    {
      add,
      addAll,
      remove,
      removeAll,
      includes,
      toggle,
      getAll,
      ids,
    },
  ]
}

export default useItemContainer
