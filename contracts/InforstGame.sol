// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;



import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract InfrostCore is AccessControl, ReentrancyGuard {
    bytes32 public constant GAME_MASTER = keccak256("GAME_MASTER");
    
    struct Character {
        uint256 dna;
        uint32 level;
        uint32 xp;
        uint16[6] attributes; // [atk, def, spd, int, vit, luck]
    }
    
    mapping(address => Character) public players;
    mapping(uint256 => address) public dnaToPlayer;

    event LevelUp(address player, uint32 newLevel);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GAME_MASTER, msg.sender);
    }

    function mintCharacter(uint256 dna) external {
        require(players[msg.sender].dna == 0, "Already registered");
        
        players[msg.sender] = Character({
            dna: dna,
            level: 1,
            xp: 0,
            attributes: _generateAttributes(dna)
        });
        
        dnaToPlayer[dna] = msg.sender;
    }

    function _generateAttributes(uint256 dna) internal pure returns (uint16[6] memory) {
        return [
            uint16(dna % 100 + 1),       // ATK (1-100)
            uint16((dna/100) % 100 + 1), // DEF 
            uint16((dna/10000) % 100 +1),// SPD
            uint16((dna/1000000) % 100+1),// INT
            100,                         // VIT (fixed)
            uint16(dna % 10 + 1)         // LUCK (1-10)
        ];
    }

    function grantXP(address player, uint32 xp) external onlyRole(GAME_MASTER) {
        Character storage c = players[player];
        uint32 newXP = c.xp + xp;
        uint32 levelsGained = 0;
        
        while(newXP >= _xpForLevel(c.level + levelsGained)) {
            newXP -= _xpForLevel(c.level + levelsGained);
            levelsGained++;
        }
        
        if(levelsGained > 0) {
            c.level += levelsGained;
            emit LevelUp(player, c.level);
        }
        c.xp = newXP;
    }
    
    function _xpForLevel(uint32 level) internal pure returns (uint32) {
        return level * 1000;
    }
}