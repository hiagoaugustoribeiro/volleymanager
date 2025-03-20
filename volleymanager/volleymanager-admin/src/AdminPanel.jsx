import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/jogadores/")
      .then((response) => setJogadores(response.data))
      .catch((error) => console.error("Erro ao buscar jogadores:", error));
  }, []);

  

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
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50 hover:bg-gray-100 transition">
            <td className="border p-3">Carlos Silva</td>
            <td className="border p-3">25</td>
            <td className="border p-3">Atacante</td>
            <td className="border p-3 text-green-600 font-bold">Ativo</td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <form className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Adicionar Jogador</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Nome</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Nome do jogador" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Idade</label>
        <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Idade" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Posição</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Posição" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Status</label>
        <select className="w-full p-2 border border-gray-300 rounded-lg">
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>
      <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition">
        Adicionar Jogador
      </button>
    </form>
  </div>
      );
      
  
};

export default AdminPanel;
