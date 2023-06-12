function validarNombre(nombre) {
    // Verificar que el nombre tenga dos caracteres
    if (nombre.length !== 2) {
      return false;
    }
  
    // Verificar que el primer carácter sea una letra mayúscula
    const letra = nombre.charAt(0);
    if (!/^[A-Z]$/.test(letra)) {
      return false;
    }
  
    // Verificar que el segundo carácter sea un número del 1 al 9
    const numero = nombre.charAt(1);
    if (!/^[1-9]$/.test(numero)) {
      return false;
    }
  
    // El nombre cumple con el formato requerido
    return true;
  }

test('El nombre ingresado del asiento es correcto', () => {
    expect(validarNombre('A1')).toBe(true);
});

test('El nombre ingresado del asiento esta mal', () => {
    expect(validarNombre('11')).toBe(false);
});