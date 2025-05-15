// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

// Correct imports
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract InfrostNFT is ERC721Enumerable, AccessControl {
    constructor() ERC721("InfrostNFT", "INF") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721Enumerable, AccessControl) 
        returns (bool) 
    {
        return super.supportsInterface(interfaceId);
    }
}