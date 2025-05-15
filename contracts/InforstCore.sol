// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract InforstCore {
    struct Player {
        address playerAddress;
        string username;
        uint256 level;
        uint256 experience;
    }

    mapping(address => Player) public players;
    address public owner;

    event PlayerRegistered(address indexed player, string username);
    event PlayerLeveledUp(address indexed player, uint256 newLevel);

    constructor() {
        owner = msg.sender;
    }

    function registerPlayer(string memory _username) external {
        require(bytes(players[msg.sender].username).length == 0, "Player already registered");
        
        players[msg.sender] = Player(msg.sender, _username, 1, 0);
        emit PlayerRegistered(msg.sender, _username);
    }

    function gainExperience(address _player, uint256 _xp) external {
        require(msg.sender == owner, "Only owner can grant XP");
        require(players[_player].playerAddress != address(0), "Player not found");

        players[_player].experience += _xp;

        // Simple level-up logic
        if (players[_player].experience >= players[_player].level * 100) {
            players[_player].level++;
            emit PlayerLeveledUp(_player, players[_player].level);
        }
    }

    function getPlayer(address _player) external view returns (string memory, uint256, uint256) {
        Player memory p = players[_player];
        return (p.username, p.level, p.experience);
    }
}