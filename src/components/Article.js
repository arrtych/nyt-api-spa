import React from "react";

const Article = props => (
    <div>
      <h2>Title:{props.title}</h2>
      <h3>Fragment: {props.fragment}</h3>
      <a href={props.link}>Link: {props.link}</a>
    </div>

);

export default Article;