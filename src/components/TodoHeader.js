import styled from 'styled-components';
import { FaRegSmile } from "react-icons/fa";
const Block = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    div{
        display: flex;
    }
    svg{
        margin: 0 8px 0 0;
        font-size: 24px;
    }
    h1{
        font-size: 24px;
        color: #333;
        font-weight: 700;
    }
    &>span{
        font-size: 20px;
        color: #666;
        font-weight: 500;
    }
`;
export default function TodoHeader({todos}){
    return(
        <Block>
            <div>
                <FaRegSmile />
                <h1>Hello</h1>
            </div>
            <span>총 {todos.length}개</span>
        </Block>
    )
}