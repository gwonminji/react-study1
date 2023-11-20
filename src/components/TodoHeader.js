import styled from 'styled-components';
import { FaRegSmile, FaHandPeace  } from "react-icons/fa";

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
    p{
        font-size: 16px;
        color: #666;
        font-weight: 500;
        &.is-done{
            display: flex;
            align-items: center;
            position: relative;
            &:after{
                content: '';
                display: block;
                position: absolute;
                left: 0;
                right: 28px;
                bottom: 2px;
                height: 8px;
                background: #95b6fa4d;
                transform: rotate(-1deg);
                z-index: 1;
            }
            svg{
                margin: 0 0 0 4px;
                color: #ffc700;
            }
        }
    }
    span{
        font-size: 20px;
        color: #333;
        font-weight: 600;
    }
`;
export default function TodoHeader({todos}){
    return(
        <Block>
            <div>
                <FaRegSmile />
                <h1>Hello</h1>
            </div>
            {todos.length > 0 ? 
                todos.length > todos.filter(todo => todo.done).length ?
                <p>할 일 <span>{todos.length}</span>개 중 <span>{todos.filter(todo => todo.done).length}</span>개를 완료했어요!</p>
                :
                <p className="is-done">할 일을 모두 완료했어요! <FaHandPeace /></p>
            :
            <p>할 일을 추가해보세요!</p>
            }
        </Block>
    )
}