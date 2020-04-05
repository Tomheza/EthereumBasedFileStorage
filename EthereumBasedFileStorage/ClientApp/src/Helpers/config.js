export const FILE_STORAGE_ADDRESS = "0xdeb499DB512221725367d954EeE9761aE69795d2";
export const FILE_STORAGE_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "fileCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x43953519"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "files",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "username",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf4c714b4"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "username",
            "type": "string"
          }
        ],
        "name": "FileStored",
        "type": "event",
        "signature": "0xa57a4ed062437aa1581ed4abb41372a738506c622bc6d13ad0783b0c9539f826"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          },
          {
            "name": "_username",
            "type": "string"
          }
        ],
        "name": "storeFile",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x201ac29c"
      }
];
