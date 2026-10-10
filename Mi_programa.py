
#aqui escribire el codigo
# aqui escribire el codigo*/
#
#
#pseudocodigo
#
#inicio
# Inicio
a = float(input("Ingresa el valor de a: "))
b = float(input("Ingresa el valor de b: "))

suma = a + b

print("La suma es:", suma)
# Fin
#fin
#
#ejecutar con: python Mi_programa.py
#

def calculadora():
    print("=" * 40)
    print("       CALCULADORA BÁSICA")
    print("=" * 40)
    
    while True:
        print("\nOperaciones disponibles:")
        print("1. Suma (+)")
        print("2. Resta (-)")
        print("3. Multiplicación (*)")
        print("4. División (/)")
        print("5. Salir")
        
        opcion = input("\nElige una opción (1-5): ")
        
        if opcion == "5":
            print("¡Hasta luego! 👋")
            break
        
        if opcion not in ["1", "2", "3", "4"]:
            print("❌ Opción no válida")
            continue
        
        try:
            num1 = float(input("Ingresa el primer número: "))
            num2 = float(input("Ingresa el segundo número: "))
        except ValueError:
            print("❌ Debes ingresar números válidos")
            continue
        
        if opcion == "1":
            resultado = num1 + num2
            print(f"✅ {num1} + {num2} = {resultado}")
        elif opcion == "2":
            resultado = num1 - num2
            print(f"✅ {num1} - {num2} = {resultado}")
        elif opcion == "3":
            resultado = num1 * num2
            print(f"✅ {num1} * {num2} = {resultado}")
        elif opcion == "4":
            if num2 == 0:
                print("❌ Error: No se puede dividir entre cero")
            else:
                resultado = num1 / num2
                print(f"✅ {num1} / {num2} = {resultado}")


if __name__ == "__main__":
    calculadora()