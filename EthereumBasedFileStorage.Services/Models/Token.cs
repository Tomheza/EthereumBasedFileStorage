namespace EthereumBasedFileStorage.Services.Models
{
    public class Token
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

        public Token()
        {
        }

        public Token(int id, string username, string accessToken, string refreshToken)
        {
            Id = id;
            Username = username;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }
    }
}
