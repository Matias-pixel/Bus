// Código a probar
function obtenerValorCodigo(codigo) {
    return 3000;
  }
  
  function obtenerSumaTotal(codigos) {
    let suma = 0;
  
    codigos.forEach(codigo => {
      suma += obtenerValorCodigo(codigo);
    });
  
    return suma;
  }
  
  // Prueba unitaria
  describe('Suma total de códigos', () => {
    it('debería retornar la suma correcta de los códigos', () => {
      const codigos = ['A1', 'B2', 'C3'];
  
      expect(obtenerSumaTotal(codigos)).toBe(9000);
    });
  });