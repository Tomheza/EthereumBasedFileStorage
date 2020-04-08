pragma solidity ^0.5.0;

contract FileStorage {

    uint public fileCount = 0;

    struct File {
        uint id;
        uint userId;
    }

    mapping(uint => uint[]) public files;

    event FileStored(
        uint id,
        uint userId
    );

    function storeFile(uint _userId, uint _id) public {
        fileCount++;
        files[_userId].push(_id);
        emit FileStored(_id, _userId);
    }

    function getFiles(uint _userId) public view returns (uint[] memory outFiles){
        outFiles = files[_userId];
    }
}