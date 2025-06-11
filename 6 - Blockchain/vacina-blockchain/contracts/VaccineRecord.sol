// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VaccineRecord {
    struct Vacina {
        string tipo;
        string data;
    }

    mapping(string => Vacina[]) private vacinas;

    event VacinaRegistrada(string cpf, string tipo, string data);

    function registrarVacina(string memory cpf, string memory tipo, string memory data) public {
        vacinas[cpf].push(Vacina(tipo, data));
        emit VacinaRegistrada(cpf, tipo, data);
    }

    function quantidadeVacinas(string memory cpf) public view returns (uint) {
        return vacinas[cpf].length;
    }

    function buscarVacina(string memory cpf, uint index) public view returns (string memory, string memory) {
        require(index < vacinas[cpf].length, "Indice invalido");
        Vacina memory v = vacinas[cpf][index];
        return (v.tipo, v.data);
    }
}
