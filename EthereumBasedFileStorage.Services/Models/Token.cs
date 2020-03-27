namespace EthereumBasedFileStorage.Services.Models
{
    public class Token
    {
        public string Username { get; }
        public string AccessToken { get; }
        public string RefreshToken { get; }

        public Token(string username, string accessToken, string refreshToken)
        {
            Username = username;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }
    }
}
