// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract HoytsX is ERC721 {
    address public owner;
    uint16 public totalMovies;

    struct Movie {
        uint16 id;
        string name;
        string description;
        string ipfsHash;
        string genre;
        string director;
        string[] actors;
        string date;
        string time;
        uint256 cost;
        uint16 duration;
        uint8 tickets;
        uint8 maxTickets;
    }

    mapping(uint16 => Movie) movies;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function listMovie(
        string memory _name,
        string memory _description,
        string memory _ipfsHash,
        string memory _genre,
        string memory _director,
        string[] memory _actors,
        string memory _date,
        string memory _time,
        uint256 _cost,
        uint16 _duration,
        uint8 _maxTickets
    ) public onlyOwner {
        totalMovies += 1;
        movies[totalMovies] = Movie(
            totalMovies,
            _name,
            _description,
            _ipfsHash,
            _genre,
            _director,
            _actors,
            _date,
            _time,
            _cost,
            _duration,
            _maxTickets,
            _maxTickets
        );
    }

    function getMovie(uint16 _id) public view returns (Movie memory) {
        return movies[_id];
    }
}
