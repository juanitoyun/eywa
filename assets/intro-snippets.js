window.EYWA_SNIPPETS = {
  "id": "01",
  "title": "Introducción",
  "subtitle": "Python · invariantes · recursividad",
  "origin": "https://github.com/ivansipiran/AED-Apuntes/blob/main/01_Introduccion.ipynb",
  "slides": [
    {
      "t": "Números y expresiones",
      "k": "TIPOS",
      "idea": "int representa enteros; float, números en coma flotante. Las operaciones producen resultados según sus operandos.",
      "bullets": [
        "/ produce división real; // división entera hacia abajo.",
        "** eleva a potencia; % calcula el resto."
      ],
      "code": "\"\"\" AED / 01 · Números y expresiones \"\"\"\n\n# operaciones: int, int -> int | float\n# INPUT : dos números a y b\n# OUTPUT: división, cociente entero, resto y potencia\n\na = 17                                        # Dato entero  // O(1)\nb = 5\nprint(a / b)\nprint(a // b)                                 # División entera  // O(1)\nprint(a % b)                                  # Resto de la división  // O(1)\nprint(2 ** 6)\n\n# Complejidad: O(1) en cada operación elemental; O(1) espacio\n\nassert 17 // 5 == 3\nassert 17 % 5 == 2",
      "tests": [
        "assert 17 // 5 == 3",
        "assert 17 % 5 == 2"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Lógica booleana",
      "k": "TIPOS",
      "idea": "Las condiciones son valores True o False. and, or y not permiten combinarlas.",
      "bullets": [
        "Las comparaciones producen booleanos.",
        "and y or cortocircuitan cuando ya conocen el resultado."
      ],
      "code": "\"\"\" AED / 02 · Lógica booleana \"\"\"\n\n# booleanos: int -> bool\n# INPUT : entero x y comparaciones\n# OUTPUT: valores lógicos True/False\n\nx = 7\nes_par = x % 2 == 0                           # Comprueba la paridad  // O(1)\nen_rango = 0 <= x < 10                        # Compara dos límites  // O(1)\nprint(es_par)\nprint(en_rango)\nprint(not es_par and en_rango)                # Combina condiciones  // O(1)\n\n# Complejidad: O(1) tiempo y espacio\n\nassert (7 % 2 == 0) is False\nassert (0 <= 7 < 10) is True",
      "tests": [
        "assert (7 % 2 == 0) is False",
        "assert (0 <= 7 < 10) is True"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Strings y secuencias",
      "k": "TIPOS",
      "idea": "Un string es una secuencia inmutable de caracteres. Se puede indexar y cortar por rebanadas.",
      "bullets": [
        "El primer índice es 0; los negativos cuentan desde el final.",
        "s[inicio:fin] no incluye el índice fin."
      ],
      "code": "\"\"\" AED / 03 · Strings y secuencias \"\"\"\n\n# secuencias: str -> str | int\n# INPUT : cadena s\n# OUTPUT: índices, subcadena y longitud\n\ns = \"Algoritmos\"                              # Cadena inmutable  // O(1)\nprint(s[0])\nprint(s[-1])\nprint(s[0:4])                                 # Extrae posiciones 0,1,2,3  // O(k)\nprint(s.lower())                              # Convierte todos los caracteres  // O(n)\nprint(len(s))\n\n# Complejidad: O(n) por el slicing/lower; O(n) espacio\n\nassert \"Algoritmos\"[:4] == \"Algo\"\nassert len(\"Algoritmos\") == 10",
      "tests": [
        "assert \"Algoritmos\"[:4] == \"Algo\"",
        "assert len(\"Algoritmos\") == 10"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Listas",
      "k": "TIPOS",
      "idea": "Las listas son secuencias mutables: puedes modificar elementos, agregar y eliminar.",
      "bullets": [
        "append agrega al final; pop retira y devuelve un elemento.",
        "La asignación b = a comparte la misma lista; a[:] copia sus elementos."
      ],
      "code": "\"\"\" AED / 04 · Listas \"\"\"\n\n# lista: list[int] -> list[int]\n# INPUT : lista mutable a\n# OUTPUT: elementos cambiados y valores extraídos\n\na = [3, 1, 4]\na.append(2)                                   # Inserta al final  // O(1) amort.\nprint(a)\nprint(a.pop())                                # Extrae el último  // O(1)\na[0] = 9                                      # Cambia índice 0  // O(1)\nprint(a)\n\n# Complejidad: O(1) amortizado en append/pop; O(n) al imprimir\n\nassert a == [9, 1, 4]",
      "tests": [
        "assert a == [9, 1, 4]"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Funciones incorporadas",
      "k": "HERRAMIENTAS",
      "idea": "Python trae operaciones reutilizables para contar, comparar, transformar y recorrer colecciones.",
      "bullets": [
        "min/max trabajan sobre colecciones no vacías.",
        "sum y len evitan bucles manuales para operaciones comunes."
      ],
      "code": "\"\"\" AED / 05 · Funciones incorporadas \"\"\"\n\n# funciones_built_in: list[int] -> varios\n# INPUT : lista xs\n# OUTPUT: len, min, max, suma y orden\n\nxs = [8, 2, 7, 1]\nprint(len(xs))                                # Consulta tamaño  // O(1)\nprint(min(xs), max(xs))\nprint(sum(xs))                                # Recorre y acumula  // O(n)\nprint(sorted(xs))                             # Crea arreglo ordenado  // O(n log n)\nprint(list(range(2, 8, 2)))\n\n# Complejidad: O(n log n) por sorted; O(n) espacio\n\nassert sum(xs) == 18\nassert sorted(xs) == [1, 2, 7, 8]",
      "tests": [
        "assert sum(xs) == 18",
        "assert sorted(xs) == [1, 2, 7, 8]"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Definir funciones",
      "k": "CONTROL",
      "idea": "Una función encapsula un procedimiento. Los parámetros reciben valores y return entrega un resultado.",
      "bullets": [
        "Una función sin return explícito devuelve None.",
        "Usa parámetros en vez de depender innecesariamente de variables globales."
      ],
      "code": "\"\"\" AED / 06 · Definir funciones \"\"\"\n\n# area_rectangulo: float, float -> float\n# INPUT : ancho y alto\n# OUTPUT: área = ancho * alto\n\ndef area_rectangulo(ancho, alto):             # Define parámetros  // O(1)\n    return ancho * alto                       # Entrega el área  // O(1)\n\nprint(area_rectangulo(3, 4))\nprint(area_rectangulo(2.5, 2))\n\n# Complejidad: O(1) tiempo y espacio\n\nassert area_rectangulo(3, 4) == 12\nassert area_rectangulo(2, 0) == 0",
      "tests": [
        "assert area_rectangulo(3, 4) == 12",
        "assert area_rectangulo(2, 0) == 0"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Expresión condicional",
      "k": "CONTROL",
      "idea": "Una expresión a if condición else b escoge uno de dos valores de forma compacta.",
      "bullets": [
        "Úsala cuando la alternativa es breve y clara.",
        "Para decisiones largas es más legible un if convencional."
      ],
      "code": "\"\"\" AED / 07 · Expresión condicional \"\"\"\n\n# absoluto: float -> float\n# INPUT : número real x\n# OUTPUT: magnitud sin signo\n\ndef absoluto(x):                              # Recibe un real  // O(1)\n    return -x if x < 0 else x                 # Decide según el signo  // O(1)\n\nfor value in [-4, 0, 7]:\n    print(absoluto(value))\n\n# Complejidad: O(1) tiempo y espacio\n\nassert absoluto(-8) == 8\nassert absoluto(0) == 0",
      "tests": [
        "assert absoluto(-8) == 8",
        "assert absoluto(0) == 0"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Diccionarios",
      "k": "TIPOS",
      "idea": "Un diccionario asocia claves hashables con valores. Se consulta por clave y no por posición.",
      "bullets": [
        "get(clave, defecto) evita errores cuando falta una clave.",
        "Su consulta suele ser O(1) promedio."
      ],
      "code": "\"\"\" AED / 08 · Diccionarios \"\"\"\n\n# codigos: str -> int | None\n# INPUT : claves de texto\n# OUTPUT: valor asociado o valor por defecto\n\ncodigos = {\"piedra\": 0, \"papel\": 1}\ncodigos[\"tijera\"] = 2                         # Agrega una asociación  // O(1) prom.\nprint(codigos[\"papel\"])\nprint(codigos.get(\"lagarto\", -1))             # Lee con valor alternativo  // O(1) prom.\nprint(list(codigos))\n\n# Complejidad: O(1) promedio por acceso; O(n) espacio del dict\n\nassert codigos[\"tijera\"] == 2\nassert codigos.get(\"desconocido\") is None",
      "tests": [
        "assert codigos[\"tijera\"] == 2",
        "assert codigos.get(\"desconocido\") is None"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Condicional if",
      "k": "CONTROL",
      "idea": "if, elif y else seleccionan un camino de ejecución según las condiciones.",
      "bullets": [
        "El orden importa: ejecuta la primera rama cuya condición sea verdadera.",
        "La indentación delimita qué instrucciones pertenecen a cada rama."
      ],
      "code": "\"\"\" AED / 09 · Condicional if \"\"\"\n\n# signo: int -> int\n# INPUT : número x\n# OUTPUT: -1, 0 o 1 según su signo\n\ndef signo(x):\n    if x > 0:                                 # Primera alternativa  // O(1)\n        return 1\n    elif x < 0:                               # Solo si falla la anterior  // O(1)\n        return -1\n    else:\n        return 0                              # Caso neutral  // O(1)\n\nprint([signo(x) for x in [-2, 0, 3]])\n\n# Complejidad: O(1) tiempo y espacio\n\nassert signo(-1) == -1\nassert signo(0) == 0\nassert signo(9) == 1",
      "tests": [
        "assert signo(-1) == -1",
        "assert signo(0) == 0",
        "assert signo(9) == 1"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Ciclo for",
      "k": "CONTROL",
      "idea": "for recorre elementos de una secuencia o de un iterable; range genera progresiones de enteros.",
      "bullets": [
        "range(n) produce 0, 1, ..., n−1.",
        "Un acumulador resume lo visitado en cada iteración."
      ],
      "code": "\"\"\" AED / 10 · Ciclo for \"\"\"\n\n# suma_cuadrados: int -> int\n# INPUT : n entero no negativo\n# OUTPUT: suma de i² para 0 <= i < n\n\ndef suma_cuadrados(n):\n    total = 0                                 # Inicializa el acumulador  // O(1)\n    for i in range(n):                        # Repite n veces  // O(n)\n        total += i * i                        # Agrega cuadrado actual  // O(1)\n    return total\n\nprint(suma_cuadrados(5))\n\n# Complejidad: Θ(n) tiempo; O(1) espacio\n\nassert suma_cuadrados(0) == 0\nassert suma_cuadrados(3) == 5",
      "tests": [
        "assert suma_cuadrados(0) == 0",
        "assert suma_cuadrados(3) == 5"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Ciclo while",
      "k": "CONTROL",
      "idea": "while repite instrucciones mientras una condición siga siendo verdadera.",
      "bullets": [
        "Debes poder justificar su terminación.",
        "La variable de control debe avanzar hacia la condición de salida."
      ],
      "code": "\"\"\" AED / 11 · Ciclo while \"\"\"\n\n# cantidad_digitos: int -> int\n# INPUT : entero n (incluye negativos)\n# OUTPUT: número de dígitos decimales\n\ndef cantidad_digitos(n):\n    if n == 0:                                # Caso especial del cero  // O(1)\n        return 1\n    n = abs(n)\n    count = 0\n    while n:                                  # Reduce n por diez  // O(log n)\n        n //= 10                              # Descarta el último dígito  // O(1)\n        count += 1\n    return count\n\nprint(cantidad_digitos(90210))\n\n# Complejidad: O(log10 |n|) tiempo; O(1) espacio\n\nassert cantidad_digitos(0) == 1\nassert cantidad_digitos(-12) == 2",
      "tests": [
        "assert cantidad_digitos(0) == 1",
        "assert cantidad_digitos(-12) == 2"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Invariantes de ciclos",
      "k": "CORRECTITUD",
      "idea": "Un invariante es una propiedad que se cumple antes y después de cada iteración.",
      "bullets": [
        "Inicialización: verdadero antes del ciclo.",
        "Preservación: una vuelta lo mantiene.",
        "Terminación: el invariante y la salida implican la respuesta."
      ],
      "code": "\"\"\" AED / 12 · Invariantes de ciclos \"\"\"\n\n# maximo: list[int] -> int\n# INPUT : lista no vacía xs\n# OUTPUT: valor mayor de la lista\n\ndef maximo(xs):\n    assert len(xs) > 0\n    mejor = xs[0]                             # Mayor del prefijo inicial  // O(1)\n    for i in range(1, len(xs)):               # Explora el resto  // O(n)\n        # Invariante: mejor = max(xs[:i])\n        if xs[i] > mejor:                     # Actualiza máximo  // O(1)\n            mejor = xs[i]\n    return mejor\n\nprint(maximo([3, 8, 2, 6]))\n\n# Complejidad: Θ(n) tiempo; O(1) espacio\n\nassert maximo([5]) == 5\nassert maximo([3, 8, 2, 6]) == 8",
      "tests": [
        "assert maximo([5]) == 5",
        "assert maximo([3, 8, 2, 6]) == 8"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Particionar por pivote",
      "k": "INVARIANTES",
      "idea": "Reordena in situ una lista: los valores menores al pivote quedan a la izquierda y los demás, a la derecha.",
      "bullets": [
        "Al inicio de cada vuelta, a[:i] contiene solo valores menores que p.",
        "Este método no garantiza preservar el orden original de cada grupo."
      ],
      "code": "\"\"\" AED / 13 · Particionar por pivote \"\"\"\n\n# partition: list[int], int -> int\n# INPUT : arreglo mutable a y pivote p\n# OUTPUT: frontera entre menores y mayores/iguales\n\ndef partition(a, p):\n    i = 0                                     # Inicio de región < p  // O(1)\n    for j in range(len(a)):                   # Inspecciona todo el arreglo  // O(n)\n        if a[j] < p:\n            a[i], a[j] = a[j], a[i]           # Coloca el menor a la izquierda  // O(1)\n            i += 1\n    return i\n\na = [7, 2, 5, 1, 8, 4]\nk = partition(a, 5)\nprint(k, a)\n\n# Complejidad: Θ(n) tiempo; O(1) espacio\n\nassert all(v < 5 for v in a[:k])\nassert all(v >= 5 for v in a[k:])\nassert sorted(a) == [1, 2, 4, 5, 7, 8]",
      "tests": [
        "assert all(v < 5 for v in a[:k])",
        "assert all(v >= 5 for v in a[k:])",
        "assert sorted(a) == [1, 2, 4, 5, 7, 8]"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Potencia por multiplicaciones",
      "k": "ALGORITMOS",
      "idea": "Una solución simple calcula xⁿ multiplicando por x exactamente n veces.",
      "bullets": [
        "Su costo temporal es Θ(n).",
        "El invariante puede expresarse como resultado = x^i tras i pasos."
      ],
      "code": "\"\"\" AED / 14 · Potencia por multiplicaciones \"\"\"\n\n# potencia_simple: int, int -> int\n# INPUT : base x y exponente n >= 0\n# OUTPUT: x elevado a n\n\ndef potencia_simple(x, n):\n    r = 1                                     # Producto vacío  // O(1)\n    for _ in range(n):                        # Una repetición por potencia  // O(n)\n        r *= x                                # Multiplica por la base  // O(1)\n    return r\n\nprint(potencia_simple(3, 5))\n\n# Complejidad: Θ(n) tiempo; O(1) espacio\n\nassert potencia_simple(2, 0) == 1\nassert potencia_simple(-2, 3) == -8",
      "tests": [
        "assert potencia_simple(2, 0) == 1",
        "assert potencia_simple(-2, 3) == -8"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Exponenciación binaria",
      "k": "ALGORITMOS",
      "idea": "Si n es par, podemos reemplazar xⁿ por (x²)^(n/2). Así reducimos n a la mitad.",
      "bullets": [
        "El invariante es resultado · base^n = x_original^n_original.",
        "Tiempo Θ(log n); memoria adicional Θ(1)."
      ],
      "code": "\"\"\" AED / 15 · Exponenciación binaria \"\"\"\n\n# potencia_binaria: int, int -> int\n# INPUT : base x y exponente n >= 0\n# OUTPUT: x elevado a n\n\ndef potencia_binaria(x, n):\n    resultado = 1                             # Acumulador de factores activos  // O(1)\n    while n > 0:                              # Reduce el exponente a la mitad  // O(log n)\n        if n % 2:\n            resultado *= x\n        x *= x\n        n //= 2                               # Elimina bit procesado  // O(1)\n    return resultado\n\nprint(potencia_binaria(3, 13))\n\n# Complejidad: Θ(log n) tiempo; O(1) espacio\n\nassert potencia_binaria(2, 10) == 1024\nassert potencia_binaria(7, 0) == 1",
      "tests": [
        "assert potencia_binaria(2, 10) == 1024",
        "assert potencia_binaria(7, 0) == 1"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Exponentes y representación binaria",
      "k": "ALGORITMOS",
      "idea": "Cada bit encendido de n indica qué potencia de x debe contribuir al resultado.",
      "bullets": [
        "Por ejemplo, 13 = 8 + 4 + 1.",
        "La descomposición explica por qué bastan O(log n) iteraciones."
      ],
      "code": "\"\"\" AED / 16 · Exponentes y representación binaria \"\"\"\n\n# bits: int -> list[int]\n# INPUT : exponente n positivo y base x\n# OUTPUT: factores asociados a bits activos\n\nn = 13\nx = 3\npotencias = []\nbit = 0\nwhile n:                                      # Procesa un bit por vuelta  // O(log n)\n    if n & 1:                                 # Detecta bit activo  // O(1)\n        potencias.append(x ** (2 ** bit))\n    n >>= 1\n    bit += 1                                  # Avanza a siguiente potencia  // O(1)\nprint(potencias)\nprint(3 ** 13)\n\n# Complejidad: O(log n) iteraciones y factores\n\nassert len(potencias) == 3\nassert 13 == 8 + 4 + 1",
      "tests": [
        "assert len(potencias) == 3",
        "assert 13 == 8 + 4 + 1"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Evaluar polinomios: Horner",
      "k": "ALGORITMOS",
      "idea": "Horner evalúa un polinomio usando una multiplicación y una suma por coeficiente.",
      "bullets": [
        "Coeficientes en orden [a₀, a₁, ..., aₙ].",
        "Tiempo Θ(n) y memoria extra Θ(1)."
      ],
      "code": "\"\"\" AED / 17 · Evaluar polinomios: Horner \"\"\"\n\n# horner: list[int], int -> int\n# INPUT : coeficientes [a0,...,an] y x\n# OUTPUT: P(x) sin calcular cada potencia\n\ndef horner(coeffs, x):\n    value = 0                                 # Resultado parcial  // O(1)\n    for c in reversed(coeffs):                # Va del grado mayor al menor  // O(n)\n        value = value * x + c                 # Horner: multiplicar y sumar  // O(1)\n    return value\n\n# 2 + 3x + x², evaluado en x = 4\nprint(horner([2, 3, 1], 4))\n\n# Complejidad: Θ(n) tiempo; O(1) espacio\n\nassert horner([2, 3, 1], 4) == 30\nassert horner([], 5) == 0",
      "tests": [
        "assert horner([2, 3, 1], 4) == 30",
        "assert horner([], 5) == 0"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Arreglos NumPy",
      "k": "ARREGLOS",
      "idea": "NumPy proporciona arreglos tipados y operaciones vectorizadas, distintos de las listas genéricas.",
      "bullets": [
        "Una operación sobre un arreglo puede aplicarse a todos sus elementos.",
        "La distribución de Pyodide carga NumPy al activar este ejercicio."
      ],
      "packages": [
        "numpy"
      ],
      "code": "\"\"\" AED / 18 · Arreglos NumPy \"\"\"\n\n# numpy_array: ndarray -> ndarray\n# INPUT : arreglo NumPy a\n# OUTPUT: resultados vectorizados y forma\n\nimport numpy as np\n\na = np.array([2, 4, 6])                       # Arreglo de tipo fijo  // O(n)\nprint(a * 2)                                  # Multiplicación vectorizada  // O(n)\nprint(a.sum())                                # Reducción del arreglo  // O(n)\nprint(a.dtype)\nprint(np.array([[1, 2], [3, 4]]).shape)\n\n# Complejidad: O(n) operaciones; O(n) memoria para a*2\n\nassert (a * 2).tolist() == [4, 8, 12]\nassert a.sum() == 12",
      "tests": [
        "assert (a * 2).tolist() == [4, 8, 12]",
        "assert a.sum() == 12"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Ordenación por inserción",
      "k": "ORDENAMIENTO",
      "idea": "Mantiene un prefijo ordenado e inserta en él el siguiente elemento.",
      "bullets": [
        "El prefijo a[:i] está ordenado antes de insertar a[i].",
        "Tiempo O(n²) peor caso; Θ(n) si la entrada ya está ordenada."
      ],
      "code": "\"\"\" AED / 19 · Ordenación por inserción \"\"\"\n\n# insertion_sort: list[int] -> list[int]\n# INPUT : lista mutable a\n# OUTPUT: lista ordenada ascendentemente\n\ndef insertion_sort(a):\n    for i in range(1, len(a)):                # Prefijo [0:i] ordenado  // O(n)\n        x = a[i]\n        j = i - 1\n        while j >= 0 and a[j] > x:            # Desplaza mayores  // O(n)\n            a[j + 1] = a[j]\n            j -= 1\n        a[j + 1] = x                          # Inserta elemento  // O(1)\n    return a\n\nprint(insertion_sort([5, 2, 4, 1]))\n\n# Complejidad: O(n²) peor caso; Θ(n) mejor caso; O(1) espacio\n\nassert insertion_sort([3, 2, 1]) == [1, 2, 3]\nassert insertion_sort([]) == []",
      "tests": [
        "assert insertion_sort([3, 2, 1]) == [1, 2, 3]",
        "assert insertion_sort([]) == []"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Ordenación por selección",
      "k": "ORDENAMIENTO",
      "idea": "En cada pasada, busca el máximo del segmento no ordenado y colócalo al final.",
      "bullets": [
        "El sufijo derecho queda ordenado tras cada pasada.",
        "Hace Θ(n²) comparaciones incluso si el arreglo ya está ordenado."
      ],
      "code": "\"\"\" AED / 20 · Ordenación por selección \"\"\"\n\n# selection_sort: list[int] -> list[int]\n# INPUT : lista mutable a\n# OUTPUT: lista ordenada ascendentemente\n\ndef selection_sort(a):\n    for end in range(len(a) - 1, 0, -1):      # Fija el máximo en el extremo  // O(n)\n        pos = max(range(end + 1), key=a.__getitem__)   # Encuentra el máximo pendiente  // O(n)\n        a[end], a[pos] = a[pos], a[end]       # Intercambia extremos  // O(1)\n    return a\n\nprint(selection_sort([4, 1, 3, 2]))\n\n# Complejidad: Θ(n²) comparaciones; O(1) espacio\n\nassert selection_sort([4,1,3,2]) == [1,2,3,4]\nassert selection_sort([2,2,1]) == [1,2,2]",
      "tests": [
        "assert selection_sort([4,1,3,2]) == [1,2,3,4]",
        "assert selection_sort([2,2,1]) == [1,2,2]"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Ordenación burbuja",
      "k": "ORDENAMIENTO",
      "idea": "Compara pares adyacentes e intercambia aquellos fuera de orden; los mayores avanzan al extremo derecho.",
      "bullets": [
        "Después de una pasada, el mayor elemento pendiente queda en su posición.",
        "En peor caso Θ(n²); con bandera de cambios mejora entradas ya ordenadas."
      ],
      "code": "\"\"\" AED / 21 · Ordenación burbuja \"\"\"\n\n# bubble_sort: list[int] -> list[int]\n# INPUT : lista mutable a\n# OUTPUT: lista ordenada ascendentemente\n\ndef bubble_sort(a):\n    for end in range(len(a)-1, 0, -1):        # Pasa por región no ordenada  // O(n)\n        changed = False\n        for i in range(end):\n            if a[i] > a[i+1]:                 # Revisa vecinos  // O(1)\n                a[i], a[i+1] = a[i+1], a[i]\n                changed = True\n        if not changed:                       # Termina si no hubo cambios  // O(1)\n            break\n    return a\n\nprint(bubble_sort([4, 1, 3, 2]))\n\n# Complejidad: O(n²) peor caso; Θ(n) mejor caso; O(1) espacio\n\nassert bubble_sort([9,1,4]) == [1,4,9]\nassert bubble_sort([]) == []",
      "tests": [
        "assert bubble_sort([9,1,4]) == [1,4,9]",
        "assert bubble_sort([]) == []"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Recursividad y caso base",
      "k": "RECURSIÓN",
      "idea": "Una función recursiva se define a partir de casos más pequeños del mismo problema.",
      "bullets": [
        "Caso base: termina la cadena de llamadas.",
        "Paso recursivo: reduce una medida del tamaño del problema."
      ],
      "code": "\"\"\" AED / 22 · Recursividad y caso base \"\"\"\n\n# factorial: int -> int\n# INPUT : entero n >= 0\n# OUTPUT: producto 1*2*...*n\n\ndef factorial(n):\n    if n <= 1:                                # Caso base  // O(1)\n        return 1\n    return n * factorial(n - 1)               # Reduce el problema a n-1  // O(n)\n\nprint(factorial(5))\n\n# Complejidad: Θ(n) tiempo y pila Θ(n)\n\nassert factorial(0) == 1\nassert factorial(6) == 720",
      "tests": [
        "assert factorial(0) == 1",
        "assert factorial(6) == 720"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Potencia recursiva",
      "k": "RECURSIÓN",
      "idea": "La recursión traduce directamente la definición xⁿ = x · x^(n−1), con x⁰ = 1.",
      "bullets": [
        "Versión simple: tiempo Θ(n), profundidad Θ(n).",
        "Para n grande, la pila de llamadas puede exceder el límite."
      ],
      "code": "\"\"\" AED / 23 · Potencia recursiva \"\"\"\n\n# recursive_power: int, int -> int\n# INPUT : base x y exponente n >= 0\n# OUTPUT: x elevado a n por recursión\n\ndef recursive_power(x, n):\n    if n == 0:                                # Caso base  // O(1)\n        return 1\n    return x * recursive_power(x, n - 1)      # Disminuye el exponente  // O(n)\n\nprint(recursive_power(3, 4))\n\n# Complejidad: Θ(n) tiempo y pila Θ(n)\n\nassert recursive_power(2,0) == 1\nassert recursive_power(2,5) == 32",
      "tests": [
        "assert recursive_power(2,0) == 1",
        "assert recursive_power(2,5) == 32"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Iteración vs. recursión",
      "k": "RECURSIÓN",
      "idea": "Ambas pueden expresar el mismo algoritmo; difieren en control de estado y uso de la pila.",
      "bullets": [
        "Un bucle conserva estado explícitamente.",
        "La recursión delega estado en cada llamada; a menudo usa más memoria."
      ],
      "code": "\"\"\" AED / 24 · Iteración vs. recursión \"\"\"\n\n# sum_iter / sum_rec: int -> int\n# INPUT : entero n >= 0\n# OUTPUT: suma de 0 hasta n\n\ndef sum_iter(n):\n    total = 0\n    for k in range(n + 1):                    # Repite con estado explícito  // O(n)\n        total += k\n    return total\n\ndef sum_rec(n):\n    if n == 0:\n        return 0\n    return n + sum_rec(n - 1)                 # Suma usando pila recursiva  // O(n)\n\nprint(sum_iter(10), sum_rec(10))\n\n# Complejidad: Θ(n) tiempo; O(1) iterativo / O(n) recursivo\n\nassert sum_iter(50) == sum_rec(50)\nassert sum_iter(0) == 0",
      "tests": [
        "assert sum_iter(50) == sum_rec(50)",
        "assert sum_iter(0) == 0"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Torres de Hanoi",
      "k": "RECURSIÓN",
      "idea": "Para mover n discos: mueve n−1 a la auxiliar, desplaza el mayor y mueve n−1 al destino.",
      "bullets": [
        "Recurrencia T(n)=2T(n−1)+1.",
        "El número mínimo de movimientos es 2ⁿ − 1."
      ],
      "code": "\"\"\" AED / 25 · Torres de Hanoi \"\"\"\n\n# hanoi: int, str, str, str -> list[tuple]\n# INPUT : n discos y nombres de las estacas\n# OUTPUT: movimientos válidos entre estacas\n\ndef hanoi(n, start=\"A\", target=\"C\", aux=\"B\"):\n    if n == 0:                                # Base: nada por mover  // O(1)\n        return []\n    return (\n        hanoi(n-1, start, aux, target)        # Traslada n-1 al auxiliar  // T(n-1)\n        + [(start, target)]\n        + hanoi(n-1, aux, target, start)      # Traslada n-1 al destino  // T(n-1)\n    )\n\nprint(hanoi(3))\n\n# Complejidad: O(n*2^n) tiempo por concatenar listas; Θ(2^n) salida\n\nassert len(hanoi(3)) == 7\nassert len(hanoi(0)) == 0\nassert len(hanoi(4)) == 15",
      "tests": [
        "assert len(hanoi(3)) == 7",
        "assert len(hanoi(0)) == 0",
        "assert len(hanoi(4)) == 15"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Diagramas de estado",
      "k": "CORRECTITUD",
      "idea": "Piensa un ciclo como una máquina de estados: iniciar → comprobar condición → ejecutar → repetir o terminar.",
      "bullets": [
        "Antes de evaluar la condición, el invariante I debe ser verdadero.",
        "Al salir: I ∧ ¬C debe implicar la postcondición F."
      ],
      "code": "\"\"\" AED / 26 · Diagramas de estado \"\"\"\n\n# sum_first_n: int -> int\n# INPUT : entero n >= 0\n# OUTPUT: suma de 0 hasta n-1\n\ndef sum_first_n(n):\n    i, acc = 0, 0                             # Estado inicial satisface I  // O(1)\n    while i < n:                              # Mantiene I: acc=sum(range(i))  // O(n)\n        # Invariante: acc == sum(range(i))\n        acc += i\n        i += 1                                # Progresa al término  // O(1)\n    return acc\n\nprint(sum_first_n(5))\n\n# Complejidad: Θ(n) tiempo; O(1) espacio\n\nassert sum_first_n(5) == 10\nassert sum_first_n(0) == 0",
      "tests": [
        "assert sum_first_n(5) == 10",
        "assert sum_first_n(0) == 0"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Contar palabras",
      "k": "AUTÓMATAS",
      "idea": "Una sola pasada puede contar palabras si guardamos si estamos dentro o fuera de una palabra.",
      "bullets": [
        "Cuenta una palabra solo al pasar de espacio a carácter.",
        "Ignorar espacios consecutivos evita recuentos repetidos."
      ],
      "code": "\"\"\" AED / 27 · Contar palabras \"\"\"\n\n# count_words: str -> int\n# INPUT : texto con espacios variables\n# OUTPUT: cantidad de palabras no vacías\n\ndef count_words(text):\n    inside = False                            # Autómata fuera de palabra  // O(1)\n    count = 0\n    for char in text:\n        if char.isspace():                    # Vuelve a fuera de palabra  // O(1)\n            inside = False\n        elif not inside:\n            count += 1                        # Cuenta transición a palabra  // O(1)\n            inside = True\n    return count\n\nprint(count_words(\"   Algoritmos  y  Datos  \"))\n\n# Complejidad: Θ(n) tiempo; O(1) espacio\n\nassert count_words(\"   Algoritmos  y  Datos  \") == 3\nassert count_words(\"\") == 0",
      "tests": [
        "assert count_words(\"   Algoritmos  y  Datos  \") == 3",
        "assert count_words(\"\") == 0"
      ],
      "recipeVersion": "EYWA-CODE/1"
    },
    {
      "t": "Síntesis del capítulo",
      "k": "COMPARAR",
      "idea": "Comprender código implica conocer entrada, salida, invariantes, complejidad y casos límites.",
      "bullets": [
        "Explica por qué cada algoritmo termina.",
        "Contrasta potencia simple e iterativa binaria.",
        "Determina el invariante del prefijo ordenado en inserción."
      ],
      "code": "\"\"\" AED / 28 · Síntesis del capítulo \"\"\"\n\n# linear_steps / logarithmic_steps: int -> int\n# INPUT : tamaño positivo n\n# OUTPUT: comparación de crecimientos\n\ndef linear_steps(n):\n    return n                                  # Simula trabajo lineal  // O(1)\n\ndef logarithmic_steps(n):\n    steps = 0\n    while n > 1:                              # Divide hasta llegar a uno  // O(log n)\n        n //= 2                               # Reduce la entrada  // O(1)\n        steps += 1\n    return steps\n\nfor n in [8, 64, 1024]:\n    print(n, linear_steps(n), logarithmic_steps(n))\n\n# Complejidad: Θ(n) frente a Θ(log n); O(1) espacio\n\nassert linear_steps(64) == 64\nassert logarithmic_steps(1024) == 10",
      "tests": [
        "assert linear_steps(64) == 64",
        "assert logarithmic_steps(1024) == 10"
      ],
      "recipeVersion": "EYWA-CODE/1"
    }
  ]
};
