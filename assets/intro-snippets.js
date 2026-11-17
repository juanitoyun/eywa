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
      "code": "# int representa enteros; float, números en coma flotante. Las\n# operaciones producen resultados según sus operandos.\n\na = 17                                    # Enteros: divisiones real y entera\nb = 5                                     # El módulo entrega el resto\nprint(a / b)\nprint(a // b)\nprint(a % b)\nprint(2 ** 6)",
      "tests": [
        "assert 17 // 5 == 3",
        "assert 17 % 5 == 2"
      ]
    },
    {
      "t": "Lógica booleana",
      "k": "TIPOS",
      "idea": "Las condiciones son valores True o False. and, or y not permiten combinarlas.",
      "bullets": [
        "Las comparaciones producen booleanos.",
        "and y or cortocircuitan cuando ya conocen el resultado."
      ],
      "code": "# Las condiciones son valores True o False. and, or y not permiten\n# combinarlas.\n\nx = 7                                     # El resultado lógico es booleano\nes_par = x % 2 == 0                       # and / or evitan evaluar de más\nen_rango = 0 <= x < 10\nprint(es_par)\nprint(en_rango)\nprint(not es_par and en_rango)",
      "tests": [
        "assert (7 % 2 == 0) is False",
        "assert (0 <= 7 < 10) is True"
      ]
    },
    {
      "t": "Strings y secuencias",
      "k": "TIPOS",
      "idea": "Un string es una secuencia inmutable de caracteres. Se puede indexar y cortar por rebanadas.",
      "bullets": [
        "El primer índice es 0; los negativos cuentan desde el final.",
        "s[inicio:fin] no incluye el índice fin."
      ],
      "code": "# Un string es una secuencia inmutable de caracteres. Se puede indexar y\n# cortar por rebanadas.\n\ns = \"Algoritmos\"                          # Los índices empiezan desde cero\nprint(s[0])\nprint(s[-1])\nprint(s[0:4])\nprint(s.lower())\nprint(len(s))",
      "tests": [
        "assert \"Algoritmos\"[:4] == \"Algo\"",
        "assert len(\"Algoritmos\") == 10"
      ]
    },
    {
      "t": "Listas",
      "k": "TIPOS",
      "idea": "Las listas son secuencias mutables: puedes modificar elementos, agregar y eliminar.",
      "bullets": [
        "append agrega al final; pop retira y devuelve un elemento.",
        "La asignación b = a comparte la misma lista; a[:] copia sus elementos."
      ],
      "code": "# Las listas son secuencias mutables: puedes modificar elementos,\n# agregar y eliminar.\n\na = [3, 1, 4]                             # append modifica la lista original\na.append(2)                               # pop entrega y elimina\nprint(a)\nprint(a.pop())\na[0] = 9\nprint(a)",
      "tests": [
        "assert a == [9, 1, 4]"
      ]
    },
    {
      "t": "Funciones incorporadas",
      "k": "HERRAMIENTAS",
      "idea": "Python trae operaciones reutilizables para contar, comparar, transformar y recorrer colecciones.",
      "bullets": [
        "min/max trabajan sobre colecciones no vacías.",
        "sum y len evitan bucles manuales para operaciones comunes."
      ],
      "code": "# Python trae operaciones reutilizables para contar, comparar,\n# transformar y recorrer colecciones.\n\nxs = [8, 2, 7, 1]                         # len cuenta elementos\nprint(len(xs))\nprint(min(xs), max(xs))\nprint(sum(xs))\nprint(sorted(xs))\nprint(list(range(2, 8, 2)))",
      "tests": [
        "assert sum(xs) == 18",
        "assert sorted(xs) == [1, 2, 7, 8]"
      ]
    },
    {
      "t": "Definir funciones",
      "k": "CONTROL",
      "idea": "Una función encapsula un procedimiento. Los parámetros reciben valores y return entrega un resultado.",
      "bullets": [
        "Una función sin return explícito devuelve None.",
        "Usa parámetros en vez de depender innecesariamente de variables globales."
      ],
      "code": "# Una función encapsula un procedimiento. Los parámetros reciben valores\n# y return entrega un resultado.\n\ndef area_rectangulo(ancho, alto):\n    return ancho * alto                   # def declara una función\n\nprint(area_rectangulo(3, 4))\nprint(area_rectangulo(2.5, 2))",
      "tests": [
        "assert area_rectangulo(3, 4) == 12",
        "assert area_rectangulo(2, 0) == 0"
      ]
    },
    {
      "t": "Expresión condicional",
      "k": "CONTROL",
      "idea": "Una expresión a if condición else b escoge uno de dos valores de forma compacta.",
      "bullets": [
        "Úsala cuando la alternativa es breve y clara.",
        "Para decisiones largas es más legible un if convencional."
      ],
      "code": "# Una expresión a if condición else b escoge uno de dos valores de forma\n# compacta.\n\ndef absoluto(x):\n    return -x if x < 0 else x             # La opción else cubre el resto\n\nfor value in [-4, 0, 7]:                  # Una condición elige la expresión\n    print(absoluto(value))",
      "tests": [
        "assert absoluto(-8) == 8",
        "assert absoluto(0) == 0"
      ]
    },
    {
      "t": "Diccionarios",
      "k": "TIPOS",
      "idea": "Un diccionario asocia claves hashables con valores. Se consulta por clave y no por posición.",
      "bullets": [
        "get(clave, defecto) evita errores cuando falta una clave.",
        "Su consulta suele ser O(1) promedio."
      ],
      "code": "# Un diccionario asocia claves hashables con valores. Se consulta por\n# clave y no por posición.\n\ncodigos = {\"piedra\": 0, \"papel\": 1}       # La clave reemplaza al índice\ncodigos[\"tijera\"] = 2                     # get permite valor por defecto\nprint(codigos[\"papel\"])\nprint(codigos.get(\"lagarto\", -1))\nprint(list(codigos))",
      "tests": [
        "assert codigos[\"tijera\"] == 2",
        "assert codigos.get(\"desconocido\") is None"
      ]
    },
    {
      "t": "Condicional if",
      "k": "CONTROL",
      "idea": "if, elif y else seleccionan un camino de ejecución según las condiciones.",
      "bullets": [
        "El orden importa: ejecuta la primera rama cuya condición sea verdadera.",
        "La indentación delimita qué instrucciones pertenecen a cada rama."
      ],
      "code": "# if, elif y else seleccionan un camino de ejecución según las\n# condiciones.\n\ndef signo(x):\n    if x > 0:                             # Se evalúa primero esta rama\n        return 1                          # elif prueba el siguiente caso\n    elif x < 0:\n        return -1\n    else:\n        return 0\n\nprint([signo(x) for x in [-2, 0, 3]])",
      "tests": [
        "assert signo(-1) == -1",
        "assert signo(0) == 0",
        "assert signo(9) == 1"
      ]
    },
    {
      "t": "Ciclo for",
      "k": "CONTROL",
      "idea": "for recorre elementos de una secuencia o de un iterable; range genera progresiones de enteros.",
      "bullets": [
        "range(n) produce 0, 1, ..., n−1.",
        "Un acumulador resume lo visitado en cada iteración."
      ],
      "code": "# for recorre elementos de una secuencia o de un iterable; range genera\n# progresiones de enteros.\n\ndef suma_cuadrados(n):\n    total = 0                             # El acumulador parte en cero\n    for i in range(n):                    # range(n) recorre 0 a n-1\n        total += i * i\n    return total\n\nprint(suma_cuadrados(5))",
      "tests": [
        "assert suma_cuadrados(0) == 0",
        "assert suma_cuadrados(3) == 5"
      ]
    },
    {
      "t": "Ciclo while",
      "k": "CONTROL",
      "idea": "while repite instrucciones mientras una condición siga siendo verdadera.",
      "bullets": [
        "Debes poder justificar su terminación.",
        "La variable de control debe avanzar hacia la condición de salida."
      ],
      "code": "# while repite instrucciones mientras una condición siga siendo\n# verdadera.\n\ndef cantidad_digitos(n):\n    if n == 0:                            # Hay un caso límite para n = 0\n        return 1\n    n = abs(n)                            # El ciclo reduce el valor de n\n    count = 0\n    while n:\n        n //= 10\n        count += 1\n    return count\n\nprint(cantidad_digitos(90210))",
      "tests": [
        "assert cantidad_digitos(0) == 1",
        "assert cantidad_digitos(-12) == 2"
      ]
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
      "code": "# Un invariante es una propiedad que se cumple antes y después de cada\n# iteración.\n\ndef maximo(xs):\n    assert len(xs) > 0\n    mejor = xs[0]                         # La lista debe ser no vacía\n    for i in range(1, len(xs)):           # mejor resume el prefijo visto\n        # Invariante: mejor = max(xs[:i])\n        if xs[i] > mejor:\n            mejor = xs[i]\n    return mejor\n\nprint(maximo([3, 8, 2, 6]))",
      "tests": [
        "assert maximo([5]) == 5",
        "assert maximo([3, 8, 2, 6]) == 8"
      ]
    },
    {
      "t": "Particionar por pivote",
      "k": "INVARIANTES",
      "idea": "Reordena in situ una lista: los valores menores al pivote quedan a la izquierda y los demás, a la derecha.",
      "bullets": [
        "Al inicio de cada vuelta, a[:i] contiene solo valores menores que p.",
        "Este método no garantiza preservar el orden original de cada grupo."
      ],
      "code": "# Reordena in situ una lista: los valores menores al pivote quedan a la\n# izquierda y los demás, a la derecha.\n\ndef partition(a, p):\n    i = 0                                 # i es frontera de los menores\n    for j in range(len(a)):               # j recorre la región no clasificada\n        if a[j] < p:\n            a[i], a[j] = a[j], a[i]\n            i += 1\n    return i\n\na = [7, 2, 5, 1, 8, 4]\nk = partition(a, 5)\nprint(k, a)",
      "tests": [
        "assert all(v < 5 for v in a[:k])",
        "assert all(v >= 5 for v in a[k:])",
        "assert sorted(a) == [1, 2, 4, 5, 7, 8]"
      ]
    },
    {
      "t": "Potencia por multiplicaciones",
      "k": "ALGORITMOS",
      "idea": "Una solución simple calcula xⁿ multiplicando por x exactamente n veces.",
      "bullets": [
        "Su costo temporal es Θ(n).",
        "El invariante puede expresarse como resultado = x^i tras i pasos."
      ],
      "code": "# Una solución simple calcula xⁿ multiplicando por x exactamente n\n# veces.\n\ndef potencia_simple(x, n):\n    r = 1                                 # r acumula el producto\n    for _ in range(n):                    # Una vuelta por multiplicación\n        r *= x\n    return r\n\nprint(potencia_simple(3, 5))",
      "tests": [
        "assert potencia_simple(2, 0) == 1",
        "assert potencia_simple(-2, 3) == -8"
      ]
    },
    {
      "t": "Exponenciación binaria",
      "k": "ALGORITMOS",
      "idea": "Si n es par, podemos reemplazar xⁿ por (x²)^(n/2). Así reducimos n a la mitad.",
      "bullets": [
        "El invariante es resultado · base^n = x_original^n_original.",
        "Tiempo Θ(log n); memoria adicional Θ(1)."
      ],
      "code": "# Si n es par, podemos reemplazar xⁿ por (x²)^(n/2). Así reducimos n a\n# la mitad.\n\ndef potencia_binaria(x, n):\n    resultado = 1                         # resultado guarda factores seleccionados\n    while n > 0:                          # Cada iteración reduce n a la mitad\n        if n % 2:\n            resultado *= x\n        x *= x\n        n //= 2\n    return resultado\n\nprint(potencia_binaria(3, 13))",
      "tests": [
        "assert potencia_binaria(2, 10) == 1024",
        "assert potencia_binaria(7, 0) == 1"
      ]
    },
    {
      "t": "Exponentes y representación binaria",
      "k": "ALGORITMOS",
      "idea": "Cada bit encendido de n indica qué potencia de x debe contribuir al resultado.",
      "bullets": [
        "Por ejemplo, 13 = 8 + 4 + 1.",
        "La descomposición explica por qué bastan O(log n) iteraciones."
      ],
      "code": "# Cada bit encendido de n indica qué potencia de x debe contribuir al\n# resultado.\n\nn = 13                                    # n es el exponente en binario\nx = 3                                     # Un bit en 1 activa una potencia\npotencias = []\nbit = 0\nwhile n:\n    if n & 1:\n        potencias.append(x ** (2 ** bit))\n    n >>= 1\n    bit += 1\nprint(potencias)\nprint(3 ** 13)",
      "tests": [
        "assert len(potencias) == 3",
        "assert 13 == 8 + 4 + 1"
      ]
    },
    {
      "t": "Evaluar polinomios: Horner",
      "k": "ALGORITMOS",
      "idea": "Horner evalúa un polinomio usando una multiplicación y una suma por coeficiente.",
      "bullets": [
        "Coeficientes en orden [a₀, a₁, ..., aₙ].",
        "Tiempo Θ(n) y memoria extra Θ(1)."
      ],
      "code": "# Horner evalúa un polinomio usando una multiplicación y una suma por\n# coeficiente.\n\ndef horner(coeffs, x):\n    value = 0                             # El acumulador parte desde cero\n    for c in reversed(coeffs):            # Recorre coeficientes desde el mayor\n        value = value * x + c\n    return value\n\n# 2 + 3x + x², evaluado en x = 4\nprint(horner([2, 3, 1], 4))",
      "tests": [
        "assert horner([2, 3, 1], 4) == 30",
        "assert horner([], 5) == 0"
      ]
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
      "code": "# NumPy proporciona arreglos tipados y operaciones vectorizadas,\n# distintos de las listas genéricas.\n\nimport numpy as np\n\na = np.array([2, 4, 6])                   # dtype representa un tipo fijo\nprint(a * 2)\nprint(a.sum())\nprint(a.dtype)\nprint(np.array([[1, 2], [3, 4]]).shape)",
      "tests": [
        "assert (a * 2).tolist() == [4, 8, 12]",
        "assert a.sum() == 12"
      ]
    },
    {
      "t": "Ordenación por inserción",
      "k": "ORDENAMIENTO",
      "idea": "Mantiene un prefijo ordenado e inserta en él el siguiente elemento.",
      "bullets": [
        "El prefijo a[:i] está ordenado antes de insertar a[i].",
        "Tiempo O(n²) peor caso; Θ(n) si la entrada ya está ordenada."
      ],
      "code": "# Mantiene un prefijo ordenado e inserta en él el siguiente elemento.\n\ndef insertion_sort(a):\n    for i in range(1, len(a)):            # El prefijo queda ordenado\n        x = a[i]                          # Se desplazan valores mayores\n        j = i - 1\n        while j >= 0 and a[j] > x:\n            a[j + 1] = a[j]\n            j -= 1\n        a[j + 1] = x\n    return a\n\nprint(insertion_sort([5, 2, 4, 1]))",
      "tests": [
        "assert insertion_sort([3, 2, 1]) == [1, 2, 3]",
        "assert insertion_sort([]) == []"
      ]
    },
    {
      "t": "Ordenación por selección",
      "k": "ORDENAMIENTO",
      "idea": "En cada pasada, busca el máximo del segmento no ordenado y colócalo al final.",
      "bullets": [
        "El sufijo derecho queda ordenado tras cada pasada.",
        "Hace Θ(n²) comparaciones incluso si el arreglo ya está ordenado."
      ],
      "code": "# En cada pasada, busca el máximo del segmento no ordenado y colócalo al\n# final.\n\ndef selection_sort(a):\n    for end in range(len(a) - 1, 0, -1):  # El sufijo queda ordenado\n        pos = max(range(end + 1), key=a.__getitem__)  # Busca el máximo aún pendiente\n        a[end], a[pos] = a[pos], a[end]\n    return a\n\nprint(selection_sort([4, 1, 3, 2]))",
      "tests": [
        "assert selection_sort([4,1,3,2]) == [1,2,3,4]",
        "assert selection_sort([2,2,1]) == [1,2,2]"
      ]
    },
    {
      "t": "Ordenación burbuja",
      "k": "ORDENAMIENTO",
      "idea": "Compara pares adyacentes e intercambia aquellos fuera de orden; los mayores avanzan al extremo derecho.",
      "bullets": [
        "Después de una pasada, el mayor elemento pendiente queda en su posición.",
        "En peor caso Θ(n²); con bandera de cambios mejora entradas ya ordenadas."
      ],
      "code": "# Compara pares adyacentes e intercambia aquellos fuera de orden; los\n# mayores avanzan al extremo derecho.\n\ndef bubble_sort(a):\n    for end in range(len(a)-1, 0, -1):    # Se comparan vecinos adyacentes\n        changed = False                   # Sin intercambios, ya está ordenado\n        for i in range(end):\n            if a[i] > a[i+1]:\n                a[i], a[i+1] = a[i+1], a[i]\n                changed = True\n        if not changed:\n            break\n    return a\n\nprint(bubble_sort([4, 1, 3, 2]))",
      "tests": [
        "assert bubble_sort([9,1,4]) == [1,4,9]",
        "assert bubble_sort([]) == []"
      ]
    },
    {
      "t": "Recursividad y caso base",
      "k": "RECURSIÓN",
      "idea": "Una función recursiva se define a partir de casos más pequeños del mismo problema.",
      "bullets": [
        "Caso base: termina la cadena de llamadas.",
        "Paso recursivo: reduce una medida del tamaño del problema."
      ],
      "code": "# Una función recursiva se define a partir de casos más pequeños del\n# mismo problema.\n\ndef factorial(n):\n    if n <= 1:                            # Caso base evita recursión infinita\n        return 1                          # Cada llamada reduce n\n    return n * factorial(n - 1)\n\nprint(factorial(5))",
      "tests": [
        "assert factorial(0) == 1",
        "assert factorial(6) == 720"
      ]
    },
    {
      "t": "Potencia recursiva",
      "k": "RECURSIÓN",
      "idea": "La recursión traduce directamente la definición xⁿ = x · x^(n−1), con x⁰ = 1.",
      "bullets": [
        "Versión simple: tiempo Θ(n), profundidad Θ(n).",
        "Para n grande, la pila de llamadas puede exceder el límite."
      ],
      "code": "# La recursión traduce directamente la definición xⁿ = x * x^(n−1), con\n# x⁰ = 1.\n\ndef recursive_power(x, n):\n    if n == 0:                            # Caso base para exponente cero\n        return 1                          # Una llamada por unidad de n\n    return x * recursive_power(x, n - 1)\n\nprint(recursive_power(3, 4))",
      "tests": [
        "assert recursive_power(2,0) == 1",
        "assert recursive_power(2,5) == 32"
      ]
    },
    {
      "t": "Iteración vs. recursión",
      "k": "RECURSIÓN",
      "idea": "Ambas pueden expresar el mismo algoritmo; difieren en control de estado y uso de la pila.",
      "bullets": [
        "Un bucle conserva estado explícitamente.",
        "La recursión delega estado en cada llamada; a menudo usa más memoria."
      ],
      "code": "# Ambas pueden expresar el mismo algoritmo; difieren en control de\n# estado y uso de la pila.\n\ndef sum_iter(n):\n    total = 0                             # Acumulador explícito del bucle\n    for k in range(n + 1):                # La recursión usa pila de llamadas\n        total += k\n    return total\n\ndef sum_rec(n):\n    if n == 0:\n        return 0\n    return n + sum_rec(n - 1)\n\nprint(sum_iter(10), sum_rec(10))",
      "tests": [
        "assert sum_iter(50) == sum_rec(50)",
        "assert sum_iter(0) == 0"
      ]
    },
    {
      "t": "Torres de Hanoi",
      "k": "RECURSIÓN",
      "idea": "Para mover n discos: mueve n−1 a la auxiliar, desplaza el mayor y mueve n−1 al destino.",
      "bullets": [
        "Recurrencia T(n)=2T(n−1)+1.",
        "El número mínimo de movimientos es 2ⁿ − 1."
      ],
      "code": "# Para mover n discos: mueve n−1 a la auxiliar, desplaza el mayor y\n# mueve n−1 al destino.\n\ndef hanoi(n, start=\"A\", target=\"C\", aux=\"B\"):\n    if n == 0:                            # Caso base: no queda ningún disco\n        return []                         # Mover dos grupos y el disco mayor\n    return (\n        hanoi(n-1, start, aux, target)\n        + [(start, target)]\n        + hanoi(n-1, aux, target, start)\n    )\n\nprint(hanoi(3))",
      "tests": [
        "assert len(hanoi(3)) == 7",
        "assert len(hanoi(0)) == 0",
        "assert len(hanoi(4)) == 15"
      ]
    },
    {
      "t": "Diagramas de estado",
      "k": "CORRECTITUD",
      "idea": "Piensa un ciclo como una máquina de estados: iniciar → comprobar condición → ejecutar → repetir o terminar.",
      "bullets": [
        "Antes de evaluar la condición, el invariante I debe ser verdadero.",
        "Al salir: I ∧ ¬C debe implicar la postcondición F."
      ],
      "code": "# Piensa un ciclo como una máquina de estados: iniciar → comprobar\n# condición → ejecutar → repetir o terminar.\n\ndef sum_first_n(n):\n    i, acc = 0, 0\n    while i < n:                          # Estado inicial satisface I\n        # Invariante: acc == sum(range(i))\n        acc += i                          # Cada paso conserva el invariante\n        i += 1\n    return acc\n\nprint(sum_first_n(5))",
      "tests": [
        "assert sum_first_n(5) == 10",
        "assert sum_first_n(0) == 0"
      ]
    },
    {
      "t": "Contar palabras",
      "k": "AUTÓMATAS",
      "idea": "Una sola pasada puede contar palabras si guardamos si estamos dentro o fuera de una palabra.",
      "bullets": [
        "Cuenta una palabra solo al pasar de espacio a carácter.",
        "Ignorar espacios consecutivos evita recuentos repetidos."
      ],
      "code": "# Una sola pasada puede contar palabras si guardamos si estamos dentro o\n# fuera de una palabra.\n\ndef count_words(text):\n    inside = False                        # inside recuerda si estamos en palabra\n    count = 0                             # Solo se cuenta al entrar\n    for char in text:\n        if char.isspace():\n            inside = False\n        elif not inside:\n            count += 1\n            inside = True\n    return count\n\nprint(count_words(\"   Algoritmos  y  Datos  \"))",
      "tests": [
        "assert count_words(\"   Algoritmos  y  Datos  \") == 3",
        "assert count_words(\"\") == 0"
      ]
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
      "code": "# Comprender código implica conocer entrada, salida, invariantes,\n# complejidad y casos límites.\n\n# Desafío: compara operaciones\ndef linear_steps(n):\n    return n\n\ndef logarithmic_steps(n):\n    steps = 0                             # Crecimiento lineal: n pasos\n    while n > 1:                          # Reducir a la mitad es logarítmico\n        n //= 2\n        steps += 1\n    return steps\n\nfor n in [8, 64, 1024]:\n    print(n, linear_steps(n), logarithmic_steps(n))",
      "tests": [
        "assert linear_steps(64) == 64",
        "assert logarithmic_steps(1024) == 10"
      ]
    }
  ]
};
