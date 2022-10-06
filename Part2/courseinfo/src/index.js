import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
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

const Total = ({ total }) => {
  return <p className="boldText">number of {total} exercises</p>;
};

const Course = ({ course }) => (
  <div>
    {course.map((course) => {
      return (
        <>
          <Header course={course.name} key={course.id} />
          <Content parts={course.parts} />
        </>
      );
    })}
  </div>
);

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course course={courses} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
