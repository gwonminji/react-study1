import styled from 'styled-components';
import { IoMdAddCircle } from "react-icons/io";

import { useState, useRef, useEffect } from 'react';

const CreateBlock = styled.div`
    position: relative;
    margin: 16px 0 0 0;
    padding: 16px 0 0 0;
`;
const BtnCreate = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: 500;
    background: #f4f4f4;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    &:hover{
        background: #d4d4d4;
    }
    svg{
        margin: 0 8px 0 0;
        font-size: 24px;
    }
`;
const CreateForm = styled.form`
    display: flex;
`;
const Input = styled.input`
    padding: 0 0 0 16px;
    height: 40px;
    line-height: 38px;
    flex: 1;
    font-size: 16px;
    background: #fff;
    border: 1px solid #333;
`;
const BtnAdd = styled.button`
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
`;

export default function TodoCreate({todos, setTodos}){
    const todoInput = useRef(null);
    const currentId = useRef(0);

    const [create, setCreate] = useState(false);

    const [todo, setTodo] = useState("");
    const [todoObj, setTodoObj] = useState({
        id: "",
        text: "",
        done: "",
        active: "",
        editable: ""
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
            active: false,
            editable: false
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
        if(create){
            setFocus();
        }
    }, [create])

    function toggleActive(){
        setCreate(prev => !prev);
    }

    function setFocus(){
        todoInput.current.focus();
    }
    return(
        <CreateBlock>
            {create ?
                <CreateForm onSubmit={onSubmit}>
                    <Input type="text" name="todo" value={todo} placeholder="todo..." onChange={onChange} ref={todoInput} />
                    <BtnAdd title="Add">Add</BtnAdd>
                </CreateForm>
                :
                <BtnCreate onClick={openForm} title="할 일 추가하기"><IoMdAddCircle />할 일 추가하기</BtnCreate>
            }            
        </CreateBlock>
    )
}