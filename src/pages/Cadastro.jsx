import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase/index"; // Importa apenas o db do Firebase
import { ref, set, get } from "firebase/database";
import { v4 as uuidv4 } from 'uuid'; // Importa a função para gerar UUID
import "./Pages.css";

// Função para obter ou criar um UUID único do dispositivo
const getDeviceIdentifier = () => {
  let deviceId = localStorage.getItem('deviceIdentifier');
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem('deviceIdentifier', deviceId);
  }
  return deviceId;
};

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isRedirected, setIsRedirected] = useState(false);

  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    if (isRedirected) {
      navigate("/success", { replace: true });
    }
  }, [isRedirected, navigate]);

  const handleSaveData = async () => {
    if (password !== password2) {
      alert("As senhas não coincidem!");
    } else if (
      email === "" ||
      name === "" ||
      number === "" ||
      password === ""
    ) {
      alert("Por favor, preencha todos os campos para se registrar!");
    } else {
      try {
        const deviceIdentifier = getDeviceIdentifier(); // Obtém o identificador do dispositivo

        // Verifica se o identificador do dispositivo já está em uso
        const snapshot = await get(ref(db, "cadastroS"));
        let identifierExists = false;
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (data.deviceIdentifier === deviceIdentifier) {
            identifierExists = true;
          }
        });

        if (identifierExists) {
          alert("Este dispositivo já está cadastrado com outra conta. Por favor, use outro dispositivo.");
          return;
        }

        const currentDate = new Date().toLocaleString(); // Obtém a data e hora atual

        // Armazena o cadastro no Firebase
        await set(ref(db, "cadastroS/" + deviceIdentifier), {
          nome: name,
          email: email,
          celular: number,
          senha: password,
          dataCadastro: currentDate, // Adiciona a data e hora de cadastro
          deviceIdentifier: deviceIdentifier // Armazena o identificador único do dispositivo
        });

        alert("Cadastro realizado com sucesso!");
        setIsRedirected(true); // Define o estado para redirecionar para a página success

      } catch (error) {
        alert("Erro ao realizar o cadastro: " + error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">$jurados - Cadastro</h1>

      <input
        className="input"
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input"
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="text"
        placeholder="Número de Celular"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Repita a Senha"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />

      <button className="btn" onClick={handleSaveData}>
        Cadastrar
      </button>

      <p className="copy">© 2024 BatalhaDoS. Todos os direitos reservados.</p>
    </div>
  );
};

export default Cadastro;
