const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Пользователь не аутентифицирован' 
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Недостаточно прав для выполнения операции' 
      });
    }

    next();
  };
};

module.exports = { authorize };