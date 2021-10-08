# State

## Overview

### React state manager

- React context, custom reducer
  - if you really really not need more, than this is fine
- React context, useReducer
  - fan of a tiny redux?

### Atomic state manager

- [zustand](https://github.com/pmndrs/zustand)
  - Solid alternativ, good documentation, good TS support
- [zustand-saga](https://www.npmjs.com/package/zustand-saga)
  - Only use this if you have a bunch of old saga implementations, TS support is not so well.
- [auto-zustand-selectors-hook](https://github.com/Albert-Gao/auto-zustand-selectors-hook)
- Optional fields are not supported, again an tiny additional lib which may not be needed.

- [valtio](https://www.npmjs.com/package/valtio) Proxy changes
  - object observer
- [recoil](https://recoiljs.org) & [jotai](https://github.com/pmndrs/jotai)
  - only global useState functionality
- [xstate](https://xstate.js.org), [Calculator Example](https://xstate.js.org/docs/examples/calculator.html#react)
  - only usefull if you have a crazy state machine..

### Redux

- redux, [react-redux](https://www.npmjs.com/package/react-redux)
  - If you are one of the guys: In the former days everything were better!
- redux, [redux toolkit](https://redux-toolkit.js.org/)
  - Not really a solution to reduce boilerplate code
- [easy-peasy](https://easy-peasy.dev/) [(2nd page)](https://easy-peasy.vercel.app/docs/api/store-config.html)
  - Nice an tidy framework, good compromise of boiler plate and functionality. Awesome TS support and good documentation. My favorite today.

### Old

- mobx, mobx-react-lite: one of the oldest libraries for state management for React, it uses the observable pattern
  - State Observer, notify pattern

## References

- [Stop using Redux](https://medium.com/docler-engineering/stop-using-redux-with-react-asap-3cf4fcbedfc3)
- [Redux with React’s Functional Components](https://medium.com/geekculture/redux-with-reacts-functional-components-272f1008ee69)
- [Still using redux in 2021?](https://medium.com/@patwa.deepak/still-using-redux-in-2021-clean-your-codebase-using-modern-react-9d4afed45cda)
- [Stop Using Redux — Consider Easy Peasy if You Want](https://betterprogramming.pub/stop-using-redux-consider-easy-peasy-if-you-want-3214c41bcce5)

👆
👇
