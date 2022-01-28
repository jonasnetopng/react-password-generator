import React, { useState } from 'react'

import './style.scss'

function App() {
  const [pass, setPass] = useState([])
  const [copySuccess, setCopySuccess] = useState('');

  var password = '';


  function GeneratePassword(passwordLength) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < passwordLength; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      password += chars.substring(rnum, rnum + 1);
    }
    const payload = {
      passText: password,
      data: new Date().toLocaleDateString()
    }

    return setPass(payload)
  }

  async function CopyPassword() {
    try {
      await navigator.clipboard.writeText(pass.passText);
      setCopySuccess('Copiado!');
    } catch (err) {
      setCopySuccess('Erro ao copiar!');
    }
  }


  return (
    <>
      <div className='container'>
        <div className='password_box'>
          <h2>Gerar senha</h2>
          <input placeholder={pass.passText === "" ? "Sua senha" : pass.passText} disabled />
          <button className='button' onClick={() => GeneratePassword(16)}>Gerar</button>
          <button className='button' onClick={() => CopyPassword()}>Copiar</button>
        </div>
        {Object.keys(pass).length > 1 && (
          <div className="main">
            <table>
              <tr>
                <th>Senha</th>
                <th>Data</th>

              </tr>
              <tr>
                <td>{pass.passText}</td>
                <td>{pass.data}</td>
              </tr>
            </table>
          </div>
        )}
      </div>
    </>

  );
}

export default App;
