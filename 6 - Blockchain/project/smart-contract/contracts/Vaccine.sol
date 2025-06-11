// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Vaccines {
    struct Vaccine {
        string name;
        string cpf;
        string vType;
        uint256 date;
    }

    // EVENT DENTRO do contrato
    event VaccineRegistered(
        address indexed who,
        string cpf,
        uint256 date
    );

    mapping(uint256 => Vaccine) public vaccines;
    uint256 public nextId;

    function register(
        string memory name,
        string memory cpf,
        string memory vType,
        uint256 date
    ) public {
        vaccines[nextId] = Vaccine(name, cpf, vType, date);
        emit VaccineRegistered(msg.sender, cpf, date);
        nextId++;
    }
}
