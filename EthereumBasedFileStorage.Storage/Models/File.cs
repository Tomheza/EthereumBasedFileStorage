using System;
using System.ComponentModel.DataAnnotations;

namespace EthereumBasedFileStorage.Storage.Models
{
    public class File
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public byte[] Content { get; set; }
        public DateTime Added { get; set; }
        public DateTime Modified { get; set; }
    }
}