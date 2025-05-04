// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error HoytsX__NotOwner();
error HoytsX__InvalidId();
error HoytsX__InsufficientAmount();
error HoytsX__SeatAlreadyTaken();
error HoytsX__InvalidSeat();

contract HoytsX is ERC721 {
    address immutable i_owner;
    uint16 private s_totalMovies;
    uint256 private s_totalSupply;

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
    mapping(uint16 => mapping(string => mapping(string => mapping(uint8 => address)))) private seatTaken;
    mapping(uint16 => mapping(string => mapping(string => uint8[]))) private seatsTaken;
    mapping(uint16 => mapping(string => mapping(string => Showtime))) private movieShowtimeByDateAndTime;
    mapping(uint16 => mapping(string => string[])) private movieShowtimeTimesByDate;
    mapping(uint16 => string[]) private movieDates;

    event MovieListed(uint16 indexed id, string name);
    event TicketMinted(address indexed buyer, uint16 indexed movieId, uint8 seat, string date, string time);

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert HoytsX__NotOwner();
        }
        _;
    }

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        i_owner = msg.sender;
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
    ) external onlyOwner {
        uint16 totalMovies = s_totalMovies += 1;
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

        emit MovieListed(totalMovies, _name);
    }

    function mintMovieTicket(uint16 _id, string memory _date, string memory _time, uint8 _seat) external payable {
        if (_id == 0 || _id > s_totalMovies) {
            revert HoytsX__InvalidId();
        }
        if (msg.value < movieShowtimeByDateAndTime[_id][_date][_time].cost) {
            revert HoytsX__InsufficientAmount();
        }

        if (seatTaken[_id][_date][_time][_seat] != address(0)) {
            revert HoytsX__SeatAlreadyTaken();
        }

        if (_seat >= movieShowtimeByDateAndTime[_id][_date][_time].maxTickets) {
            revert HoytsX__InvalidSeat();
        }

        movieShowtimeByDateAndTime[_id][_date][_time].tickets -= 1;
        seatTaken[_id][_date][_time][_seat] = msg.sender;
        seatsTaken[_id][_date][_time].push(_seat);

        uint256 totalSupply = s_totalSupply += 1;

        _safeMint(msg.sender, totalSupply);
        emit TicketMinted(msg.sender, _id, _seat, _date, _time);
    }

    function getMovieDetails(uint16 _id) external view returns (
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

    function getMovieShowtimeByDateAndTime(uint16 _movieId, string memory _date, string memory _time) external view returns (Showtime memory) {
        return movieShowtimeByDateAndTime[_movieId][_date][_time];
    }

    function getMovieShowtimeTimesByDate(uint16 _movieId, string memory _date) external view returns (string[] memory) {
        return movieShowtimeTimesByDate[_movieId][_date];
    }

    function getSeatTaken(uint16 _id, string memory _date, string memory _time, uint8 _seat) external view returns (address){
        return seatTaken[_id][_date][_time][_seat];
    }

    function getSeatsTaken(uint16 _id, string memory _date, string memory _time) external view returns (uint8[] memory) {
        return seatsTaken[_id][_date][_time];
    }

    function getMovieDates(uint16 _id) external view returns (string[] memory) {
        return movieDates[_id];
    }

    function getOwner() external view returns (address) {
        return i_owner;
    }

    function getTotalMovies() external view returns (uint16) {
        return s_totalMovies;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }
}
