import React, { useState, useEffect } from 'react'

import './style.scss'

import { FiClipboard } from 'react-icons/fi'

function App() {
  const [pass, setPass] = useState([])
  const [copySuccess, setCopySuccess] = useState('');

  const [data, setData] = useState([]);

  var password = '';

  async function getStorage() {
    const passwords = await localStorage.getItem('password')

    let passwordsSaves = JSON.parse(passwords) || [];

    return passwordsSaves;
  }

  async function savePassoword(pass) {
    let passwords = await getStorage('password');

    passwords.push(pass);
    await localStorage.setItem('password', JSON.stringify(passwords));
  }
  useEffect(() => {
    async function getData() {
      const passwords = await getStorage('password');
      setData(passwords);
    }
    getData();
  }, [pass]);



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

    return (savePassoword(payload), setPass(payload));
  }

  async function CopyPassword(text) {
    try {
      await navigator.clipboard.writeText(text);
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
          <button className='button' onClick={() => CopyPassword(pass.passText)}>Copiar</button>
        </div>
        {Object.keys(data).length > 0 && (
          <div className="main">
            <table>
              <tr>
                <th>Senha</th>
                <th>Data</th>
                <th>Ações</th>

              </tr>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.passText}</td>
                  <td>{item.data}</td>
                  <td>
                    <button onClick={() => CopyPassword(item.passText)}>
                      <FiClipboard size={20} color="#000" />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </>

  );
}

export default App;
