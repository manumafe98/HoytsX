// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract HoytsX is ERC721 {

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {

    }

}
