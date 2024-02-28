declare global {
  interface Event {
    path?: unknown[]
  }

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose
    __REACT_DEVTOOLS_GLOBAL_HOOK__: Record<string, unknown> | undefined
  }
}

export {}
