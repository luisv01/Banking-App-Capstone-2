import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

export function Card(props) {
  function classes() {
    const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card mb-3' + bg + txt;
  }
function cardStyle() {
  const style = props.style ? props.style : '48rem'
  return style
}
  return (
    <div className={classes()} style={{ maxWidth: cardStyle() }}>
      <div className="card-header text-center fs-1 text">{props.header}</div>
      <div className="card-body text-center fs-4 text">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}

export const UserContext = React.createContext(null);
export { Routes, Route, Link, BrowserRouter };
