import React from "react";

export default AccountForm = (props) => {
    return (
        <Box
          m={3}
          width="30%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={event => setUsername(event.target.value)}
            value={username}
          ></TextField>
          <TextField
            id="outlined-password-input"
            type="password"
            variant="outlined"
            onChange={event => setPassword(event.target.value)}
            value={password}
          ></TextField>
          <Button variant="contained" component="label" onClick={onLogin}>
            Login
          </Button>
        </Box>
      );
}

