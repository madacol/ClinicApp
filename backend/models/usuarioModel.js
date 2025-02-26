// backend/models/usuarioModel.js

class Usuario {
  constructor({
    id = null,
    username,
    email,
    password,
    role = 'paciente',
    created_at = null,
    updated_at = null
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Validación básica de datos de usuario
  validar() {
    // Validar username
    if (!this.username || this.username.length < 3) {
      throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      throw new Error('El correo electrónico no es válido');
    }

    // Validar password cuando es necesario (solo al crear usuario o cambiar contraseña)
    if (this.password !== undefined) {
      if (!this.password || this.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
    }

    // Validar role
    const rolesValidos = ['admin', 'medico', 'recepcion', 'paciente'];
    if (!rolesValidos.includes(this.role)) {
      throw new Error('El rol especificado no es válido');
    }

    return true;
  }
}

module.exports = Usuario;