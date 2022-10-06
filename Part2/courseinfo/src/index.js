import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = ({ name, exercises, total }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};
const Content = (props) => {
  let arr = [];
  let total = 0;
  return (
    <div>
      {props.parts.map((course) => {
        arr.push(course.exercises);
        total = arr.reduce((s, p) => s + p, 0);
        return (
          <Part
            name={course.name}
            exercises={course.exercises}
            total={total}
            key={course.id}
          />
        );
      })}
      <Total total={total} />
    </div>
  );
};

//Not using total in this exercises, at least not yet
const Total = ({ total }) => {
  return <p className="boldText">number of {total} exercises</p>;
};

const Course = ({ course }) => (
  <div>
    {/* {console.log(course)} */}
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
