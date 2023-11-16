import styled from "styled-components";

const Template = styled.div`
    width: 600px;
    padding: 40px;
    margin: 40px auto;
    background: #fff;
    border-radius: 10px;
`;
export default function TodoTemplate({children}){
    return(
        <Template>{children}</Template>
    )
}