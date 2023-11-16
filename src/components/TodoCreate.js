import styled from 'styled-components';
import { IoMdAddCircle } from "react-icons/io";
import { useState, useRef, useEffect } from 'react';

const CreateBlock = styled.div`
    &>button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 48px;
        font-size: 16px;
        font-weight: 500;
        background: #f4f4f4;
        border-radius: 8px;
        border: 0;
        cursor: pointer;
        &:hover{
            background: #d4d4d4;
        }
    }
    svg{
        margin: 0 8px 0 0;
        font-size: 24px;
        // vertical-align: middle;
    }
`;
const CreateForm = styled.form`
    display: flex;
    border: 1px solid #f4f4f4;
    input{
        padding: 0 0 0 16px;
        height: 38px;
        line-height: 40px;
        flex: 1;
        font-size: 16px;
        background: #fff;
        border: 1px solid #333;
    }
    &>button{
        margin: 0 0 0 -1px;
        width: 64px;
        height: 40px;
        font-size: 16px;
        color: #333;
        font-weight: 500;
        background: #fff;
        border: 1px solid #333;
        cursor: pointer;
        &:hover{
            background: #f4f4f4;
        }
    }
`;

export default function TodoCreate({todos, setTodos}){
    const todoInput = useRef(null);
    const currentId = useRef(0);

    const [active, setActive] = useState(false);

    const [todo, setTodo] = useState("");
    const [todoObj, setTodoObj] = useState({
        id: "",
        text: "",
        done: "",
        active: ""
    })

    const openForm = () => {
        toggleActive();
    }

    const onChange = (e) => {
        setTodo(e.target.value);
        setTodoObj({
            id: currentId.current,
            text: e.target.value,
            done: false,
            active: false
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(todo === "" | "undefined"){
            alert("할 일을 입력하세요.");
            setFocus();
            return;
        }
        setTodos(current => [todoObj, ...current]);
        setTodo("");
        toggleActive();
        currentId.current += 1;
    }
    useEffect(() => {
        if(active){
            setFocus();
        }
    }, [active])

    function toggleActive(){
        setActive(prev => !prev);
    }

    function setFocus(){
        todoInput.current.focus();
    }
    return(
        <CreateBlock>
            {active ?
                <CreateForm onSubmit={onSubmit}>
                    <input type="text" name="todo" value={todo} placeholder="todo..." onChange={onChange} ref={todoInput} />
                    <button title="Add">Add</button>
                </CreateForm>
                :
                <button onClick={openForm} title="할 일 추가하기"><IoMdAddCircle />할 일 추가하기</button>
            }            
        </CreateBlock>
    )
}