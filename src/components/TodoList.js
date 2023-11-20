import styled from 'styled-components';

const List = styled.ul`
    margin: 16px 0 0 0;
    padding: 16px 0 0 0;
    border-top: 1px solid #e4e4e4;
`;
export default function TodoList({children}){
    return(
        <List>
            {children}
        </List>
    )
}