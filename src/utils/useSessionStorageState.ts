import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

interface IUseSessionStorageStateParams {
  options: {
    serialize?: (params: any) => string
    deserialize?: (params: any) => any
  }
}

/**
 * @param {String} key The key to set in sessionStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in sessionStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */
function useSessionStorageState<State>(
  key: string,
  defaultValue: (() => any) | any = '',
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: IUseSessionStorageStateParams['options'] = {}
): [State, Dispatch<SetStateAction<State>>] {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      const valueInSessionStorage = window?.sessionStorage.getItem(key)
      if (valueInSessionStorage) {
        return deserialize(valueInSessionStorage)
      }
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key)
  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window?.sessionStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key

    window?.sessionStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

export { useSessionStorageState }
