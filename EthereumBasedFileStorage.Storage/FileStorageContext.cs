﻿using EthereumBasedFileStorage.Storage.Models;
using Microsoft.EntityFrameworkCore;

namespace EthereumBasedFileStorage.Storage
{
    public class FileStorageContext : DbContext
    {
        public DbSet<File> Files { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Settings.ConnectionString);
            }
        }
    }
}
