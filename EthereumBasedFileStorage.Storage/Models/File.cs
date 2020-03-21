using System;

namespace EthereumBasedFileStorage.Storage.Models
{
    public class File
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public byte[] Content { get; set; }
        public DateTime Added { get; set; }
        public DateTime Modified { get; set; }
    }
}