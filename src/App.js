import { useState, useEffect } from 'react';

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'
import TodoTemplate from './components/TodoTemplate';
import TodoHeader from './components/TodoHeader';
import TodoCreate from './components/TodoCreate';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';


const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    box-sizing: border-box;
  }
  body{
    background: #e9ecef;
  }
`;

function App() {
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   console.log("todos", todos)
  // }, [todos])

  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHeader todos={todos} />
        <TodoCreate todos={todos} setTodos={setTodos} />
        <TodoList>
          <TodoItem todos={todos} setTodos={setTodos} />
        </TodoList>
      </TodoTemplate>
    </>
  );
}

export default App;
