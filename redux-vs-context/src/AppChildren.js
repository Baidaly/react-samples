import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

const UserAvatar = ({ user, size }) => (
  <img
    className={`user-avatar ${size || ""}`}
    alt="user avatar"
    src={user.avatar}
  />
);

const UserStats = ({ user }) => (
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
);

// Accept children and render it/them
const Nav = ({ children }) => (
  <div className="nav">
    {children}
  </div>
);

const Content = () => (
  <div className="content">main content here</div>
);

const Sidebar = ({ children }) => (
  <div className="sidebar">
    {children}
  </div>
);

// Body needs a sidebar and content, but written this way,
// they can be ANYTHING
const Body = ({ sidebar, content }) => (
  <div className="body">
    <Sidebar>{sidebar}</Sidebar>
    {content}
  </div>
);

class AppChildren extends React.Component {
  state = {
    user: {
      avatar:
        "https://2.gravatar.com/avatar/8bdbedc4b7537dfc2cecae1f89ad9cf9?s=400&d=mm",
      name: "Baidaly",
      followers: 1234,
      following: 123
    }
  };

  render() {
    const { user } = this.state;

    return (
      <div className="app">
        <Nav>
          <UserAvatar user={user} size="small" />
        </Nav>
        <Body
          sidebar={<UserStats user={user} />}
          content={<Content />}
        />
      </div>
    );
  }
}

ReactDOM.render(<AppChildren />, document.querySelector("#root"));