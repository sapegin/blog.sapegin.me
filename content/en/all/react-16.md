---
layout: Post
title: 'React 16.0—16.9 new features for every day use'
date: 2018-05-15
lang: en
tags:
  - javascript
  - react
---

This is a short cheat sheet for developers migrating from React 15 to React 16, or from earlier 16.x versions to 16.9. It focuses on features you’ll use often.

## Returning multiple elements from components with fragments

Splitting UI into small reusable components may lead to creation of unnecessary DOM elements, like when you need to return multiple elements from a component. React 16 has several options to avoid that:

```jsx
// React 15: extra wrapper element
const Breakfast = () => (
  <ul>
    <li>Coffee</li>
    <li>Croissant</li>
    <li>Marmalade</li>
  </ul>
);

// React 16.0: array (note that keys are required)
const Breakfast = () => [
  <li key="coffee">Coffee</li>,
  <li key="croissant">Croissant</li>,
  <li key="marmalade">Marmalade</li>
];

// React 16.2: fragment
const Breakfast = () => (
  <React.Fragment>
    <li>Coffee</li>
    <li>Croissant</li>
    <li>Marmalade</li>
  </React.Fragment>
);

// React 16.2: fragment (short syntax)
const Breakfast = () => (
  <>
    <li>Coffee</li>
    <li>Croissant</li>
    <li>Marmalade</li>
  </>
);

// React 16: fragments composition
const Meals = (
  <ul>
    <Breakfast />
    <Lunch />
    <Dinner />
  </ul>
);
```

Note that the short syntax may not be supported by [the tools you’re using](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html#support-for-fragment-syntax).

## Returning strings and numbers from components

In React 16 components can return strings and numbers. This is useful for components that don’t need any markup, like internationalization or formatting:

```jsx
// React 15
const LocalDate = ({ date }) => (
  <span>
    {date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
  </span>
);

// React 16
const LocalDate = ({ date }) =>
  date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
```

## Cancelling setState() to avoid rerendering

In React 15 it wasn’t possible to cancel `setState()` and avoid rerendering, if your next state was based on the previous state. In React 16 you could return `null` in `setState()`’s callback:

```js
// React 16
handleChange = event => {
  const city = event.target.value;
  this.setState(prevState =>
    prevState.city !== city ? { city } : null
  );
};
```

In this example calling `handleChange()` with the same city name as in the state won’t cause a rerender.

## Avoiding prop drilling with the official context API (16.3)

[Prop drilling](https://kentcdodds.com/blog/prop-drilling/) is when you’re passing some data to a deeply nested component using a prop, so you have to add this prop to each layer of your React component tree between a component that owns the data and a component that consumes it.

```jsx
class Root extends React.Component {
  state = { theme: THEME_DARK };
  handleThemeToggle = theme =>
    this.setState(({ theme }) => ({
      theme: theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    }));
  render() {
    return (
      <Page
        onThemeToggle={this.handleThemeToggle}
        {...this.state}
        {...this.props}
      />
    );
  }
}

// Each layer will have to pass theme and theme toggle handler props
<SomeOtherComponent
  onThemeToggle={props.onThemeToggle}
  theme={props.theme}
/>;

// Many layers below
const Header = ({ theme, onThemeToggle }) => (
  <header className={cx('header', `header--${theme}`)}>
    ...
    <button onClick={onThemeToggle}>Toggle theme</button>
  </header>
);
```

That’s a lot of boilerplate code! With the [context API](https://reactjs.org/docs/context.html) we can access our theme props anywhere in the component tree:

```jsx
const ThemeContext = React.createContext(THEME_DARK);

// We should wrap our app in this component
class ThemeProvider extends React.Component {
  state = { theme: THEME_DARK };
  handleThemeToggle = theme =>
    this.setState(({ theme }) => ({
      theme: theme === THEME_DARK ? THEME_LIGHT : THEME_DARK
    }));
  render() {
    return (
      <ThemeContext.Provider
        value={{
          onThemeToggle: this.handleThemeToggle,
          theme: this.state.theme
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

// And then use theme consumer anywhere in the component tree
const Header = () => (
  <ThemeContext.Consumer>
    {({ theme, onThemeToggle }) => (
      <header className={cx('header', `header--${theme}`)}>
        ...
        <button onClick={onThemeToggle}>Toggle theme</button>
      </header>
    )}
  </ThemeContext.Consumer>
);
```

[Check out an example](https://codesandbox.io/s/l43j6j2n7z) on CodeSandbox.

## Updating state based on props with getDerivedStateFromProps() (16.3)

The `getDerivedStateFromProps()` lifecycle method is a replacement for `componentWillReceiveProps()`. It’s useful when you have a prop with a default value for a state property, but you want to reset the state when that prop changes. For example, a modal that has a prop that says if it’s initially open, and a state that says if a modal is open now:

```jsx
// React 15
class Modal extends React.Component {
  state = {
    isOpen: this.props.isOpen
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen
      });
    }
  }
}

// React 16.3
class Modal extends React.Component {
  state = {};
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isOpen !== prevState.isOpen) {
      return {
        isOpen: nextProps.isOpen
      };
    }
  }
}
```

The `getDerivedStateFromProps()` method is called when a component is created and when it receives new props, so you don’t have to convert props to state twice (on initialization and in `componentWillReceiveProps`).

## Rerendering function components on props change with React.memo() (16.6)

[React.memo()](https://reactjs.org/docs/react-api.html#reactmemo) does the same for function components as [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) does for class components: only rerenders the component if its props change.

```js
const MyComponent = React.memo(props => {
  /* Only rerenders if props change */
});
```

## Easier access to context in class components with contextType (16.6)

[Class.contextType](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#static-contexttype) simplifies access to the React context _in class components_:

```jsx
class App extends React.Component {
  static contextType = ThemeContext;
  componentDidMount() {
    const { theme } = this.context;
    /* ... */
  }
  componentDidUpdate() {
    const { theme } = this.context;
    /* ... */
  }
  componentWillUnmount() {
    const { theme } = this.context;
    /* ... */
  }
  render() {
    const { theme } = this.context;
    return (
      <h1>
        {theme === THEME_DARK
          ? 'Welcome to the dark side!'
          : 'Welcome to the light side!'}
      </h1>
    );
  }
}
```

## Using state in function components with hooks (16.8)

[Hooks](https://reactjs.org/docs/hooks-overview.html) allows you to use state and other React features in function components. Often code with hooks is simpler than with classes.

For example, we can use state with the [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook:

```jsx
function Counter() {
  // A counter with the default value of 0
  const [count, setCount] = React.useState(0);
  return (
    <>
      <p>You’ve eaten {count} croissants.</p>
      <button onClick={() => setCount(count + 1)}>
        Eat a croissant!
      </button>
    </>
  );
}
```

[Check out this example](https://codesandbox.io/s/o9pz6q3z8y) on CodeSandbox.

Other hooks are:

- [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) to manage side effects;
- [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) to access React context;
- [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) to manage complex state;
- [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) to memoize functions;
- [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) to memoize values.
- [useRef](https://reactjs.org/docs/hooks-reference.html#useref) to persist values between renders;
- [useImperativeHandle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle) to forward imperative methods;
- [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) to manage side effects synchronously;
- [useDebugValue](https://reactjs.org/docs/hooks-reference.html#usedebugvalue) to debug custom hooks.

And you can [create your own hooks](https://reactjs.org/docs/hooks-custom.html) to share logic between function components.

## Other new features

React 16 has many other features that are useful in some cases:

- [error boundaries](https://reactjs.org/docs/error-boundaries.html);
- [portals](https://reactjs.org/docs/portals.html);
- [forwarding refs](https://reactjs.org/docs/forwarding-refs.html) (16.3);
- [getSnapshotBeforeUpdate() lifecycle method](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate) (16.3);
- [StrictMode component](https://reactjs.org/blog/2018/03/29/react-v-16-3.html) (16.3);
- [pointer events](https://reactjs.org/blog/2018/05/23/react-v-16-4.html#pointer-events) (16.4);
- [profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) (16.5);
- [React.lazy](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactlazy-code-splitting-with-suspense) (16.6);
- [static getDerivedStateFromError()](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#static-getderivedstatefromerror) (16.6).
- [act()](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#testing-hooks) and [async act()](https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#async-act-for-testing) for testing (16.8 and 16.9).
- [<React.Profiler> component](https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#performance-measurements-with-reactprofiler) for performance measurements (16.9).

I also highly recommend Nik Graf’s [course on React 16](https://egghead.io/courses/leverage-new-features-of-react-16) and Kent C. Dodds’s [course on hooks](https://egghead.io/courses/simplify-react-apps-with-react-hooks) on Egghead.
