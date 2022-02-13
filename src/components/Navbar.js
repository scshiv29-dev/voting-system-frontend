const NavBar = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const loginButton = () => {
    if (!isAuthenticated) {
      return (
        <Button color="inherit" onClick={() => authenticate()}>
          Login
        </Button>
      );
    } else {
      localStorage.setItem("user", JSON.stringify(user));

      return (
        <>
          <Typography variant="h6" color="inherit">
            {user.get("accounts")}
            {user.get("ethbalance")}
          </Typography>

          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        </>
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chess on Chain
          </Typography>
          {loginButton()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
