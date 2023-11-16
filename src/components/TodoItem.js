import styled from "styled-components";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';

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
    &.is-done{
        background: gray;
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
    &:checked + label{
        text-decoration: line-through;
    }
`;
const CbLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    svg{
        font-size: 20px;
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
    margin: 0 0 0 4px;
    font-size: 16px;
    font-weight: 600;
`;
const Active = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
`;
export default function TodoItem({todos, setTodos}){
    const [value, setValue] = useState("");

    const onMouseOver = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? {...todo, active: true} : todo
            )
        )
    }
    const onMouseOut = (id) => {
        console.log(id + "번째 out");
        setTodos(
            todos.map(todo =>
                todo.id === id ? {...todo, active: false} : todo
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
    const onDelete = (id) => {
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
                                    onMouseOver={() => onMouseOver(todo.id)}
                                    onMouseOut={() => onMouseOut(todo.id)}
                                    className={`${todo.active && "is-active"} ${todo.done && "is-done"}`}>
                                    {todo.active ? 
                                    <Active>
                                        {todo.editable ?
                                        <div>
                                            <input type="text" value={value} onChange={onUpdateValue} placeholder="update..." />
                                            <button onClick={() => onUpdate(todo.id)} title="Update">Update</button>
                                        </div>
                                        :
                                        <>
                                            <CbGrop>
                                                <Cb type="checkbox" id={todo.id} onChange={() => isChecked(todo.id)} />
                                                <CbLabel htmlFor={todo.id} title={todo.done ? "완료취소하기" : "완료하기"}>
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
                                                <Btn className="btn-delete" onClick={() => onDelete(todo.id)} title="삭제"><FaTrashCan /></Btn>
                                            </div>
                                        </>
                                        }
                                    </Active>
                                    :
                                    <Todo>{todo.text}</Todo>}
                                </Item>
            )}
        </>
    )
}