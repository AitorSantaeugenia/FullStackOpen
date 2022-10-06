import React from 'react';

const Course = ({ course }) => (
    <div>
      {course.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course.name} key={course.id} />
            <Content parts={course.parts} key={course.id + course.name} />
          </div>
        );
      })}
    </div>
  );

  const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };
  
  const Part = ({ name, exercises }) => {
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

  export default Course;