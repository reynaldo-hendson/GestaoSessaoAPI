function login(req, res) {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    return res.json({ success: true, message: 'Login bem-sucedido' });
  }
  return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
}

module.exports = { login };
