pragma solidity ^0.5.0;

contract FileStorage {

    uint public fileCount = 0;

    struct File {
        uint id;
        string username;
    }

    mapping(uint => File) public files;

    event FileStored(
        uint id,
        string username
    );

    constructor() public {
        storeFile(1, "Tomhza");
    }

    function storeFile(uint _id, string memory _username) public {
        files[_id] = File(_id, _username);
        emit FileStored(_id, _username);
    }
}