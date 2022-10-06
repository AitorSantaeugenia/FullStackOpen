import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  );
};
const Content = (props) => {
  return (
    <div>
      {props.parts.map((course) => (
        <Part name={course.name} exercises={course.exercises} key={course.id} />
      ))}
    </div>
  );
};

//Not using total in this exercises, at least not yet
const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises:{" "}
        {parseInt(
          props.parts[0].exercises +
            props.parts[1].exercises +
            props.parts[2].exercises
        )}
      </p>
    </div>
  );
};

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>
);

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
