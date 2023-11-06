import { useState } from "react";
const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

export default App;

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>
      {activeTab === 3 ? (
        <DifferentTab />
      ) : (
        <TabContent
          item={content[activeTab]}
          key={content[activeTab].summary}
        />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [likes, setLikes] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

  function handleIncrementLikes() {
    setLikes((likes) => likes + 1);
  }

  function handleIncrementTripleLikes() {
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
  }

  function undoState() {
    setLikes((likes) => 0);
    setShowDetails((show) => true);
  }

  function undoStateInTwoSeconds() {
    setTimeout(undoState, 2000);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}
      <div className="tab-actions">
        <button onClick={() => setShowDetails((isOpen) => !isOpen)}>
          {showDetails ? "Hide details" : "Show details"}
        </button>
        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleIncrementLikes}>+</button>
          <button onClick={handleIncrementTripleLikes}>+++</button>
        </div>
      </div>
      <div className="tab-undo">
        <button onClick={undoState}>Undo</button>
        <button onClick={undoStateInTwoSeconds}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentTab() {
  return (
    <div className="tab-content">
      <h4>"I'm a DIFFERENT tab, so I reset state 💣💥"</h4>
    </div>
  );
}
