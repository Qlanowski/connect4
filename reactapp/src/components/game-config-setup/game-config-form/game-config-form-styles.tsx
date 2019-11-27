import styled from 'styled-components';

export const FormContainer = styled.div`
    max-width: 90%;
    width: 1200px;
    margin: 10px auto;
`;

export const TextInput = styled.input.attrs({ 
    type: 'number',
  })`
    background: #fff;
    margin: 4px auto 25px auto;
    display: block;
    width: 100%;
    border-radius: 6px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #aaa;
    box-shadow: 0px;
    outline: none;
    transition: 0.15s;
    padding: 0 8px;
  `

  export const SelectInput = styled.select`
    background: #fff;
    margin: 4px auto 25px auto;
    display: block;
    width: 100%;
    border-radius: 6px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #aaa;
    box-shadow: 0px;
    outline: none;
    transition: 0.15s;
    padding: 0 8px;
  `

  export const PlayerChoiceContainer = styled.div`
    text-align: center;
    margin-top: 20px;
  `;

  export const PlayerChoiceColumn = styled.div`
    display: inline-block;
    margin: 10px 5%;
    text-align: center;
    max-width: 90%;
    width: 400px;
    padding: 10px;
  `;

  export const SubmitInput = styled.input.attrs({ 
    type: 'submit',
  })`
    background: #fff;
    margin: 5px auto;
    display: block;
    width: 100%;
    border-radius: 6px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #aaa;
    box-shadow: 0px;
    outline: none;
    transition: 0.15s;
    padding: 0 8px;
    text-align: center;
    cursor: pointer;
    &:hover {
        background: #eee;
    }
  `