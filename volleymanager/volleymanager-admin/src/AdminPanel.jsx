import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [jogadores, setJogadores] = useState([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [posicao, setPosicao] = useState("");
  const [status, setStatus] = useState("ativo");
  const [contato, setContato] = useState("");
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/jogadores/")
      .then((response) => setJogadores(response.data))
      .catch((error) => console.error("Erro ao buscar jogadores:", error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jogadorData = { nome, idade, posicao, status, contato };

    try {
      if (editando) {
        await axios.put(`http://127.0.0.1:8000/api/jogadores/${editando}/`, jogadorData);
        setJogadores(jogadores.map(j => (j.id === editando ? { id: editando, ...jogadorData } : j)));
        setEditando(null);
      } else {
        const response = await axios.post("http://127.0.0.1:8000/api/jogadores/", jogadorData);
        setJogadores([...jogadores, response.data]);
      }
      alert("Jogador salvo com sucesso!");
      setNome("");
      setIdade("");
      setPosicao("");
      setStatus("ativo");
      setContato("");
    } catch (error) {
      console.error("Erro ao salvar jogador:", error);
    }
  };

  const handleEdit = (jogador) => {
    setEditando(jogador.id);
    setNome(jogador.nome);
    setIdade(jogador.idade);
    setPosicao(jogador.posicao);
    setStatus(jogador.status);
    setContato(jogador.contato);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/jogadores/${id}/`);
      setJogadores(jogadores.filter(jogador => jogador.id !== id));
    } catch (error) {
      console.error("Erro ao excluir jogador:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Painel Administrativo</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Jogadores Cadastrados</h2>
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border p-3">Nome</th>
              <th className="border p-3">Idade</th>
              <th className="border p-3">Posição</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Contato</th>
              <th className="border p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {jogadores.map((jogador) => (
              <tr key={jogador.id} className="bg-gray-50 hover:bg-gray-100 transition">
                <td className="border p-3">{jogador.nome}</td>
                <td className="border p-3">{jogador.idade}</td>
                <td className="border p-3">{jogador.posicao}</td>
                <td className="border p-3 text-green-600 font-bold">{jogador.status}</td>
                <td className="border p-3">{jogador.contato}</td>
                <td className="border p-3">
                  <button onClick={() => handleEdit(jogador)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Editar</button>
                  <button onClick={() => handleDelete(jogador.id)} className="bg-red-500 text-white px-4 py-2 rounded">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{editando ? "Editar Jogador" : "Adicionar Jogador"}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Nome</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Nome do jogador" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Idade</label>
          <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Posição</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Posição" value={posicao} onChange={(e) => setPosicao(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Contato</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Telefone ou e-mail" value={contato} onChange={(e) => setContato(e.target.value)} required />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition">
          {editando ? "Atualizar" : "Adicionar"} Jogador
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
