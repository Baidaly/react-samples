import React from "react";
import ReactDOM from "react-dom";
import './App.css';

// We need createStore, connect, and Provider:
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

// Create a reducer with an empty initial state
const initialState = {
    size: 'small'
};
function reducer(state = initialState, action) {
  switch (action.type) {
    // Respond to the SET_USER action and update
    // the state accordingly
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    case 'SET_USERAVATAR_SIZE':
      return {
        ...state,
        size: action.size
      };
    default:
      return state;
  }
}

// Create the store with the reducer
const store = createStore(reducer);

// Dispatch an action to set the user
// (since initial state is empty)
store.dispatch({
  type: "SET_USER",
  user: {
    avatar: "https://2.gravatar.com/avatar/8bdbedc4b7537dfc2cecae1f89ad9cf9?s=400&d=mm",
    name: "Baidaly",
    followers: 1234,
    following: 123
  }
});

// This mapStateToProps function extracts a single
// key from state (user) and passes it as the `user` prop
const mapStateToProps = state => ({
  user: state.user,
  size: state.size
});

// connect() UserAvatar so it receives the `user` directly,
// without having to receive it from a component above

// could also split this up into 2 variables:
//   const UserAvatarAtom = ({ user, size }) => ( ... )
//   const UserAvatar = connect(mapStateToProps)(UserAvatarAtom);
const UserAvatar = connect(mapStateToProps)(({ user, size }) => {
    function zoomAvatar() {
        const sizes = ['small', 'medium', 'large'];
        size = sizes[(sizes.indexOf(size) + 1) % 3];
        store.dispatch({
            type: "SET_USERAVATAR_SIZE",
            size
          });
    };

    return <img
        className={`user-avatar ${size || ""}`}
        alt="user avatar"
        src={user.avatar}
        onClick={zoomAvatar}
    />;
});

// connect() UserStats so it receives the `user` directly,
// without having to receive it from a component above
// (both use the same mapStateToProps function)
const UserStats = connect(mapStateToProps)(({ user }) => (
  <div className="user-stats">
    <div>
      <UserAvatar />
      {user.name}
    </div>
    <div className="stats">
      <div>{user.followers} Followers</div>
      <div>Following {user.following}</div>
    </div>
  </div>
));

// Nav doesn't need to know about `user` anymore
const Nav = () => (
  <div className="nav">
    <UserAvatar size="small" />
  </div>
);

const Content = () => (
  <div className="content">main content here</div>
);

// Sidebar doesn't need to know about `user` anymore
const Sidebar = () => (
  <div className="sidebar">
    <UserStats />
  </div>
);

// Body doesn't need to know about `user` anymore
const Body = () => (
  <div className="body">
    <Sidebar />
    <Content />
  </div>
);

// App doesn't hold state anymore, so it can be
// a stateless function
const AppRedux = () => (
  <div className="app">
    <Nav />
    <Body />
  </div>
);

// Wrap the whole app in Provider so that connect()
// has access to the store
ReactDOM.render(
  <Provider store={store}>
    <AppRedux />
  </Provider>,
  document.querySelector("#root")
);