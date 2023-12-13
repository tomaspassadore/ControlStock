/* eslint-disable react/prop-types */

// El state del select para almacenar su valor se debe inicializar como {value: '', valid: null}
// Ejemplo: const [name, setName] = useState({value: '', valid: null})

import {
  Select,
  Label,
  Container,
  InputError
} from './formElements'

const SelectComponent = ({
  children,
  state,
  changeState,
  label,
  placeholder,
  id,
  messageError,
  regularExpressions,
  toDo,
  required
}) => {

  const onChange = (e) => {
    changeState({ ...state, value: e.target.value })
  }

  const validation = () => {
    if (toDo) toDo()
    if (!regularExpressions && required === true) {
      (state.value === '') ? changeState({ ...state, valid: 'false' }) : changeState({ ...state, valid: 'true' })
      return
    }
    if (regularExpressions) {
      if (regularExpressions.test(state.value)) {
        changeState({ ...state, valid: 'true' })
      } else {
        changeState({ ...state, valid: 'false' })
      }
    }
  }

  return (
    <div>
      <Label htmlFor={id} $valid={state.valid}>
        {label}{required && <span className='text-red-500 ml-[1px]'>*</span>}
      </Label>
      <Container className='border-[1px] border-borderColor dark:border-transparent'>
        <Select
          placeholder={placeholder}
          id={id}
          value={state.value}
          onChange={onChange}
          onKeyUp={validation}
          onBlur={validation}
          $valid={state.valid}
        >
          <option value=""></option>
          {children}
        </Select>
      </Container>
      {required === true && state.value === '' && (
        <InputError $valid={state.valid}>
          Campo requerido
        </InputError>
      )}
      {state.value !== '' && (
        <InputError $valid={state.valid}>{messageError}</InputError>
      )}
    </div>
  )
}

export default SelectComponent
