// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract HoytsX is ERC721 {
    address public owner;
    uint16 public totalMovies;
    uint256 public totalSupply;

    struct Movie {
        uint16 id;
        string name;
        string description;
        string ipfsHash;
        string genre;
        string director;
        string[] actors;
        uint16 duration;
        mapping(string => Showtime[]) showtimes;
    }

    struct Showtime {
        string time;
        uint256 cost;
        uint8 tickets;
        uint8 maxTickets;
    }

    struct DateShowtimes {
        string date;
        Showtime[] showtimes;
    }

    mapping(uint16 => Movie) movies;
    mapping(uint16 => mapping(string => mapping(string => mapping(uint8 => address)))) public seatTaken;
    mapping(uint16 => mapping(string => mapping(string => uint8[]))) seatsTaken;
    mapping(uint16 => mapping(string => mapping(string => Showtime))) movieShowtimeByDateAndTime;
    mapping(uint16 => mapping(string => string[])) movieShowtimeTimesByDate;
    mapping(uint16 => string[]) movieDates;

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
        uint16 _duration,
        DateShowtimes[] memory _dateShowtimes
    ) public onlyOwner {
        totalMovies += 1;
        Movie storage newMovie = movies[totalMovies];
        newMovie.id = totalMovies;
        newMovie.name = _name;
        newMovie.description = _description;
        newMovie.ipfsHash = _ipfsHash;
        newMovie.genre = _genre;
        newMovie.director = _director;
        newMovie.actors = _actors;
        newMovie.duration = _duration;

        for (uint16 i = 0; i < _dateShowtimes.length; i++) {
            string memory date = _dateShowtimes[i].date;
            Showtime[] memory showtimes = _dateShowtimes[i].showtimes;
            movieDates[totalMovies].push(date);

            for (uint16 j = 0; j < showtimes.length; j++) {
                movieShowtimeTimesByDate[totalMovies][date].push(showtimes[j].time);
                newMovie.showtimes[date].push(showtimes[j]);
                movieShowtimeByDateAndTime[totalMovies][date][showtimes[j].time] = showtimes[j];
            }
        }
    }

    function mintMovieTicket(uint16 _id, string memory _date, string memory _time, uint8 _seat) public payable {
        require(_id != 0);
        require(_id <= totalMovies);
        require(msg.value >= movieShowtimeByDateAndTime[_id][_date][_time].cost);
        require(seatTaken[_id][_date][_time][_seat] == address(0));
        require(_seat <= movieShowtimeByDateAndTime[_id][_date][_time].maxTickets);

        movieShowtimeByDateAndTime[_id][_date][_time].tickets -= 1;
        seatTaken[_id][_date][_time][_seat] = msg.sender;
        seatsTaken[_id][_date][_time].push(_seat);

        totalSupply += 1;

        _safeMint(msg.sender, totalSupply);
    }

    function getMovieDetails(uint16 _id) public view returns (
        uint16 id,
        string memory name,
        string memory description,
        string memory ipfsHash,
        string memory genre,
        string memory director,
        string[] memory actors,
        uint16 duration
    ) {
        Movie storage movie = movies[_id];
        return (
            movie.id,
            movie.name,
            movie.description,
            movie.ipfsHash,
            movie.genre,
            movie.director,
            movie.actors,
            movie.duration
        );
    }

    function getMovieShowtimeByDateAndTime(uint16 _movieId, string memory _date, string memory _time) public view returns (Showtime memory) {
        return movieShowtimeByDateAndTime[_movieId][_date][_time];
    }

    function getMovieShowtimeTimesByDate(uint16 _movieId, string memory _date) public view returns (string[] memory) {
        return movieShowtimeTimesByDate[_movieId][_date];
    }

    function getSeatsTaken(uint16 _id, string memory _date, string memory _time) public view returns (uint8[] memory) {
        return seatsTaken[_id][_date][_time];
    }

    function getMovieDates(uint16 _id) public view returns (string[] memory) {
        return movieDates[_id];
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
