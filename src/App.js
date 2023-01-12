import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { BiCopy } from 'react-icons/bi';

import { useReducer, useState } from 'react';
import { reducer, INITIAL_STATE, ACTION } from './reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [password, setPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);

  const arrayFromAscii = (from, to) => {
    const arrayAscii = [];
    for (let i = from; i <= to; i++) {
      arrayAscii.push(i);
    }
    return arrayAscii;
  };

  const lowercaseCharCodes = arrayFromAscii(97, 122);
  const uppercaseCharCodes = arrayFromAscii(65, 90);
  const numberCharCodes = arrayFromAscii(48, 57);
  const symbolCharCodes = arrayFromAscii(33, 47)
    .concat(arrayFromAscii(58, 64))
    .concat(arrayFromAscii(91, 96))
    .concat(arrayFromAscii(123, 126));

  const generatePassword = (event) => {
    event.preventDefault();
    setPasswordCopied(false);

    let passwordChars = lowercaseCharCodes;

    if (state.includeUppercase)
      passwordChars = passwordChars.concat(uppercaseCharCodes);
    if (state.includeNumbers)
      passwordChars = passwordChars.concat(numberCharCodes);
    if (state.includeSymbols)
      passwordChars = passwordChars.concat(symbolCharCodes);

    const passwordArray = [];

    for (let i = 0; i < state.passwordLength; i++) {
      passwordArray.push(
        passwordChars[Math.floor(Math.random() * passwordChars.length)]
      );
    }

    setPassword(String.fromCharCode(...passwordArray));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setPasswordCopied(true);
  };

  return (
    <div
      className='App d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Form
        style={{
          width: '360px',
          backgroundColor: 'rgba(205, 210, 205, 0.95)',
        }}
        className='rounded-4 py-5 px-4'
        onSubmit={(event) => generatePassword(event)}
      >
        <h3 className='text-success mb-4 text-center'>Password Generator</h3>
        <Form.Text
          style={{
            transition: 'all 0.3s ease-in-out',
            transform: passwordCopied ? 'translateY(0)': 'translateY(10px)',
          }}
          className={`d-block text-center text-success mb-1 ${
            passwordCopied ? 'opacity-100' : 'opacity-0'
          } `}
        >
          Password copied to clipboard!
        </Form.Text>
        <Form.Group className='position-relative'>
          <Form.Control
            value={password}
            type='text'
            readOnly
            className='mb-4 pe-5 ps-3 rounded-5 text-center'
          ></Form.Control>
          <BiCopy
            style={{ cursor: 'pointer' }}
            className='position-absolute top-50 end-0 translate-middle-y me-3 fs-5 text-success cursor-pointer'
            onClick={() => copyToClipboard()}
          />
        </Form.Group>
        <Form.Group className='mx-4'>
          <Form.Label className='d-block text-center'>
            Password length:
          </Form.Label>
          <Form.Group className='mb-4 d-flex gap-3 align-items-center'>
            <Form.Range
              value={state.passwordLength}
              min='8'
              max='24'
              className=''
              onChange={(event) =>
                dispatch({
                  type: ACTION.CHANGE_LENGTH,
                  payload: event.target.value,
                })
              }
            ></Form.Range>
            <div
              style={{
                width: '40px',
                height: '30px',
                padding: '0 1px 0 0',
                border: '2px solid #198754',
              }}
              className='rounded-4 text-center bg-white'
            >
              {state.passwordLength}
            </div>
          </Form.Group>
          <Form.Check
            checked={state.includeUppercase}
            type='switch'
            label='Uppercase'
            className='mb-2'
            onChange={() =>
              dispatch({
                type: ACTION.TOGGLE_UPPERCASE,
              })
            }
          ></Form.Check>
          <Form.Check
            checked={state.includeNumbers}
            type='switch'
            label='Numbers'
            className='mb-2'
            onChange={() =>
              dispatch({
                type: ACTION.TOGGLE_NUMBERS,
              })
            }
          ></Form.Check>
          <Form.Check
            checked={state.includeSymbols}
            type='switch'
            label='Symbols'
            className='mb-5'
            onChange={() =>
              dispatch({
                type: ACTION.TOGGLE_SYMBOLS,
              })
            }
          ></Form.Check>
          <Button type='submit' variant='success' className='d-block m-auto'>
            Generate password
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default App;
