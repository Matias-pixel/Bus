// Código a probar
function validarRut(rut) {
    // Expresión regular para verificar el formato del RUT
    const formato = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
  
    return formato.test(rut);
  }
  
  // Prueba unitaria
  describe('Validar RUT chileno', () => {
    it('debería retornar verdadero para RUTs ingresados correctamente', () => {
      expect(validarRut('12.345.678-9')).toBe(true);
      expect(validarRut('11.111.111-K')).toBe(true);
      // Agrega más casos de prueba válidos si es necesario
    });
  
    it('debería retornar falso para RUTs ingresados incorrectamente', () => {
      expect(validarRut('12345678-9')).toBe(false); // Rut sin puntos
      expect(validarRut('12.345.678-0')).toBe(false); // Dígito verificador incorrecto
      // Agrega más casos de prueba inválidos si es necesario
    });
  });




