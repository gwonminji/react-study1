import styled from "styled-components";
import { FaRegEdit, FaCheckSquare, FaRegThumbsUp, FaRegCheckSquare } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import { useState, useRef } from 'react';

const Item = styled.li`
    min-height: 64px;
    padding: 16px;
    margin: 0 0 16px 0;
    background: #f4f4f4;
    border-radius: 8px;
    display: flex;
    align-items: center;
    &.is-active{
        display: block;
        background: #faf3c6;
    }
    &.is-editable{
        display: block;
        background: #ff4600a3;
    }
    &.is-done{
        background: #95b6fa;
    }
`;
const CbGrop = styled.div`
    position: relative;
`;
const Cb = styled.input`
    overflow: hidden;
    position: absolute;
    clip: rect(0, 0, 0, 0);
    clip-path: polygon(0 0, 0 0, 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
`;
const CbLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    svg{
        font-size: 20px;
    }
    &.is-done{
        text-decoration: line-through;
    }
`;
const Btn = styled.button`
    margin: 0 2px;
    width: 32px;
    height: 32px;
    background: #fff;
    border: 1px solid #eee;
    cursor: pointer;
    svg{
        font-size: 20px;
    }
    &.btn-edit{
        svg{
            color: #296aac;
        }
    }
    &.btn-delete{
        svg{
            color: #ac2929;
        }
    }
`;
const Todo = styled.p`
    display: flex;
    align-items: center;
    margin: 0 0 0 4px;
    font-size: 16px;
    font-weight: 600;
    svg{
        margin: 0 0 0 4px;
    }
`;
const Active = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const UpdateForm = styled.form`
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
const BtnUpdate = styled.button`
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
export default function TodoItem({todos, setTodos}){
    const [value, setValue] = useState("");

    const onMouseEnter = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? {...todo, active: true} : todo
            )
        )
    }

    const onMouseLeave = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? {...todo, active: false, editable: false} : todo
            )
        )
    }

    const isChecked = (id) =>{
        setTodos(
            todos.map(todo => 
                todo.id === id ? {...todo, done: !todo.done} : todo
            )
        )
    }

    const onEditMode = (id) => {
        setTodos(
            todos.map(todo => 
                todo.id === id ? {...todo, editable: true} : todo
            )
        )
    }

    const onUpdateValue = (e) => {
        setValue(e.target.value)
    }

    const onUpdate = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? {...todo, text: value, editable: false} : todo
            )
        )
        setValue("");
    } 

    const onDelete = (id, text) => {
        alert(`${text}를(을) 삭제합니다.`);
        setTodos(
            todos.filter(todo => 
                todo.id !== id 
            )
        )
    }
    return(
        <>
            {todos.map(todo => <Item 
                                    key={todo.id}
                                    onMouseOver={() => onMouseEnter(todo.id)}
                                    onMouseOut={() => onMouseLeave(todo.id)}
                                    className={`${todo.active && "is-active"} ${todo.editable && "is-editable"} ${todo.done && "is-done"}`}>
                                    {todo.active ? 
                                    <>
                                        {todo.editable ?
                                        <UpdateForm onSubmit={() => onUpdate(todo.id)}>
                                            <Input 
                                                type="text" 
                                                value={value} 
                                                onChange={onUpdateValue} 
                                                placeholder="update..." 
                                                autoFocus
                                                />
                                            <BtnUpdate title="Update">Update</BtnUpdate>
                                        </UpdateForm>
                                        :
                                        <Active>
                                            <CbGrop>
                                                <Cb 
                                                    type="checkbox" 
                                                    id={todo.id} 
                                                    onChange={() => isChecked(todo.id)} />
                                                <CbLabel 
                                                    htmlFor={todo.id} 
                                                    className={todo.done && "is-done"} 
                                                    title={todo.done ? "완료취소하기" : "완료하기"}>
                                                        {todo.done ? <FaCheckSquare /> : <FaRegCheckSquare />}
                                                        <Todo>{todo.text}</Todo>
                                                </CbLabel>
                                            </CbGrop>
                                            <div>
                                                {!todo.done && 
                                                <Btn 
                                                    className="btn-edit" 
                                                    onClick={() => onEditMode(todo.id)} 
                                                    title="수정">
                                                    <FaRegEdit />
                                                </Btn>}
                                                <Btn 
                                                    className="btn-delete" 
                                                    onClick={() => onDelete(todo.id, todo.text)} 
                                                    title="삭제">
                                                    <FaTrashCan />
                                                </Btn>
                                            </div>
                                        </Active>
                                        }
                                    </>
                                    :
                                    <Todo>{todo.done ? <>완료한 일이에요! <FaRegThumbsUp /></> : todo.text}</Todo>}
                                </Item>
            )}
        </>
    )
}