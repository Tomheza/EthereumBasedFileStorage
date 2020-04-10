const FileStorage = artifacts.require('FileStorage.sol');

contract('FileStorage', (accounts) =>{
    before(async () => {
        this.fileStorage = await FileStorage.deployed();
    })

    it('deploys successfully', async () => {
        const address = await this.fileStorage.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    })

    it('stores files', async () => {
        const result = await this.fileStorage.storeFile(1,1);
        const fileCount = await this.fileStorage.fileCount()
        assert.equal(fileCount, 1)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.userId.toNumber(), 1)
    })

    it('gets stored files', async () => {
        await this.fileStorage.storeFile(3,1);
        await this.fileStorage.storeFile(3,2);
        await this.fileStorage.storeFile(4,3);
        
        const result = await this.fileStorage.getFiles(3);
        assert.equal(result.length, 2);
    })
})