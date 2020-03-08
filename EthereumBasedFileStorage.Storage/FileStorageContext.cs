using Microsoft.EntityFrameworkCore;

namespace EthereumBasedFileStorage.Storage
{
    public class FileStorageContext : DbContext
    {
        public DbSet<File> Files { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Settings.ConnectionString);
            }
        }
    }
}
