namespace EthereumBasedFileStorage.Services.Models
{
    public class Token
    {
        public string Username { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

        public Token()
        {
        }

        public Token(string username, string accessToken, string refreshToken)
        {
            Username = username;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }
    }
}
