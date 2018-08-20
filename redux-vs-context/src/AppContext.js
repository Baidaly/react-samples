import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

// Up top, we create a new context
// This is an object with 2 properties: { Provider, Consumer }
// Note that it's named with UpperCase, not camelCase
// This is important because we'll use it as a component later
// and Component Names must start with a Capital Letter
const UserContext = React.createContext();

// Components that need the data tap into the context
// by using its Consumer property. Consumer uses the
// "render props" pattern.
const UserAvatar = () => (
  <UserContext.Consumer>
    {({ user, size, toggleSize }) => (
      <img
        className={`user-avatar ${size || ""}`}
        alt="user avatar"
        src={user.avatar}
        onClick={toggleSize}
      />
    )}
  </UserContext.Consumer>
);

// Notice that we don't need the 'user' prop any more,
// because the Consumer fetches it from context
const UserStats = () => (
  <UserContext.Consumer>
    {({user}) => (
      <div className="user-stats">
        <div>
          <UserAvatar user={user} />
          {user.name}
        </div>
        <div className="stats">
          <div>{user.followers} Followers</div>
          <div>Following {user.following}</div>
        </div>
      </div>
    )}
  </UserContext.Consumer>
);

const Nav = () => (
  <div className="nav">
    <UserAvatar size="small" />
  </div>
);

const Content = () => <div className="content">main content here</div>;

const Sidebar = () => (
  <div className="sidebar">
    <UserStats />
  </div>
);

const Body = () => (
  <div className="body">
    <Sidebar />
    <Content />
  </div>
);

class UserStore extends React.Component {
    static sizes = ['small', 'medium', 'large'];

    state = {
      user: {
        avatar:
            "https://2.gravatar.com/avatar/8bdbedc4b7537dfc2cecae1f89ad9cf9?s=400&d=mm",
        name: "Baidaly",
        followers: 1234,
        following: 123
      },
      size: UserStore.sizes[0]
    };

    toggleSize = () => {
      this.setState(state => {
          return {
            ...state,
            size: UserStore.sizes[(UserStore.sizes.indexOf(state.size) + 1) % 3]
          };
      });
    }
  
    render() {
      return (
        <UserContext.Provider value={{
            ...this.state,
            toggleSize: this.toggleSize
        }}>
          {this.props.children}
        </UserContext.Provider>
      );
    }
}

// At the bottom, inside App, we pass the context down
// through the tree using the Provider
const AppContext = () => (
    <div className="app">
      <Nav />
      <Body />
    </div>
);

ReactDOM.render(
    <UserStore>
      <AppContext />
    </UserStore>,
    document.querySelector("#root")
);