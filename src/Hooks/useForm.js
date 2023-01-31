import React from 'react';

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      'A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.',
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState(''); // Valor recebido
  const [error, setError] = React.useState(null); // State para erros

  function validate(value) {
    //Se não tiver um tipo de validação, retorna true
    if (type === false) return true;
    //Caso tenha, valida se está vazio
    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      //Faz a validação do tipo escolhido
      setError(types[type].message);
      return false;
    } else {
      //Passando nas validações, retorna true
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  //Ao exportar, retorna um objeto com tudo abaixo
  return {
    value,
    setValue,
    onChange,
    error,
    //Retorna um metodo com os validate
    validate: () => validate(value),
    // OnBlur, quando o usuario clica no formulario e quando ele sai dele
    onBlur: () => validate(value),
  };
};

export default useForm;
