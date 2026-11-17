/* EYWA / course lab bank - original educational exercises */
window.EYWA_LABS = {
  "10": {
    "title": "Grafos",
    "topic": "Recorrido BFS",
    "functionName": "bfs",
    "description": "Devuelve el orden de visita BFS desde start. Visita vecinos según el orden de sus listas de adyacencia.",
    "hint": "Usa deque como cola, un set de visitados y agrega los vecinos no visitados al final.",
    "code": "\"\"\" AED / 10 · Recorrido BFS \"\"\"\n# Prueba de guardado EYWA\n\n# bfs: dict[str,list[str]], str -> list[str]\n# INPUT : adyacencias y vértice inicial\n# OUTPUT: orden de visita en amplitud\n\nfrom collections import deque\n\ndef bfs(graph, start):\n    seen = {start}\n    queue = deque([start])                    # Cola FIFO  // O(1)\n    order = []\n    while queue:                              # Expande frontera  // O(V+E)\n        v = queue.popleft()\n        order.append(v)\n        for nxt in graph.get(v, []):\n            if nxt not in seen:               # Evita repetir nodos  // O(1) prom.\n                seen.add(nxt)\n                queue.append(nxt)\n    return order\n\n# Complejidad: O(V+E) tiempo y O(V) espacio\n\nassert bfs({\"A\": [\"B\", \"C\"], \"B\": [\"D\"], \"C\": [], \"D\": []}, \"A\") == [\"A\", \"B\", \"C\", \"D\"]  # BFS por niveles\nassert bfs({\"A\": [\"B\"], \"B\": [\"A\"]}, \"A\") == [\"A\", \"B\"]  # Ciclo: sin revisitas\nprint(\"OK\")",
    "recipeVersion": "EYWA-CODE/1"
  },
  "01": {
    "title": "Python e invariantes",
    "topic": "Potencia binaria",
    "functionName": "power",
    "description": "Devuelve x elevado a n, con n entero no negativo. Intenta reducir el exponente a la mitad en cada paso.",
    "hint": "Inicializa resultado=1. En cada paso, si n es impar, multiplica resultado por x; después eleva x al cuadrado y divide n entre 2.",
    "code": "\"\"\" AED / 01 · Potencia binaria \"\"\"\n\n# power: int, int -> int\n# INPUT : base x, exponente n >= 0\n# OUTPUT: x elevado a n\n\ndef power(x, n):\n    result = 1                                # Acumulador inicial  // O(1)\n    while n > 0:                              # Divide n por 2 en cada vuelta  // O(log n)\n        if n % 2:\n            result *= x\n        x *= x\n        n //= 2                               # Descarta bit de menor peso  // O(1)\n    return result\n\n# Complejidad: Θ(log n) tiempo; O(1) espacio\n\nassert power(2, 0) == 1\nassert power(5, 1) == 5",
    "recipeVersion": "EYWA-CODE/1"
  },
  "02": {
    "title": "Complejidad asintótica",
    "topic": "Conteo logarítmico",
    "functionName": "count_halvings",
    "description": "Cuenta cuántas divisiones enteras por 2 requiere n para llegar a 1. Precondición: n ≥ 1.",
    "hint": "Mientras n > 1, reemplázalo por n // 2 y aumenta un contador.",
    "code": "\"\"\" AED / 02 · Conteo logarítmico \"\"\"\n\n# count_halvings: int -> int\n# INPUT : entero n >= 1\n# OUTPUT: divisiones hasta llegar a uno\n\ndef count_halvings(n):\n    steps = 0                                 # Contador de iteraciones  // O(1)\n    while n > 1:                              # Reduce el tamaño a la mitad  // O(log n)\n        n //= 2\n        steps += 1\n    return steps\n\n# Complejidad: Θ(log n) tiempo; O(1) espacio\n\nassert count_halvings(1) == 0\nassert count_halvings(2) == 1",
    "recipeVersion": "EYWA-CODE/1"
  },
  "03": {
    "title": "Diseño eficiente",
    "topic": "Fibonacci dinámico",
    "functionName": "fibonacci",
    "description": "Calcula F(n), con F(0)=0 y F(1)=1, sin repetir la recursión exponencial.",
    "hint": "Conserva únicamente los dos términos anteriores y avanza n veces.",
    "code": "\"\"\" AED / 03 · Fibonacci dinámico \"\"\"\n\n# fibonacci: int -> int\n# INPUT : índice n >= 0\n# OUTPUT: n-ésimo Fibonacci\n\ndef fibonacci(n):\n    a, b = 0, 1                               # Dos estados consecutivos  // O(1)\n    for _ in range(n):                        # Actualiza n veces  // O(n)\n        a, b = b, a + b\n    return a\n\n# Complejidad: Θ(n) tiempo; O(1) espacio\n\nassert fibonacci(0) == 0\nassert fibonacci(1) == 1",
    "recipeVersion": "EYWA-CODE/1"
  },
  "04": {
    "title": "Estructuras elementales",
    "topic": "Búsqueda binaria",
    "functionName": "binary_search",
    "description": "En una lista ordenada y sin repetidos devuelve el índice buscado, o −1 si no existe.",
    "hint": "Mantén un intervalo cerrado [low, high] y descarta una de las mitades según el valor central.",
    "code": "\"\"\" AED / 04 · Búsqueda binaria \"\"\"\n\n# binary_search: list[int], int -> int\n# INPUT : lista ordenada sin repetidos y objetivo\n# OUTPUT: índice encontrado o -1\n\ndef binary_search(xs, target):\n    low, high = 0, len(xs) - 1                # Intervalo de búsqueda  // O(1)\n    while low <= high:                        # Reduce el intervalo  // O(log n)\n        mid = (low + high) // 2               # Centro del intervalo  // O(1)\n        if xs[mid] == target:\n            return mid\n        if xs[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\n# Complejidad: O(log n) tiempo; O(1) espacio\n\nassert binary_search([], 8) == -1\nassert binary_search([1], 1) == 0",
    "recipeVersion": "EYWA-CODE/1"
  },
  "05": {
    "title": "Pilas y colas",
    "topic": "Paréntesis equilibrados",
    "functionName": "balanced",
    "description": "Devuelve True si cada paréntesis abierto tiene un cierre válido. Ignora los demás caracteres.",
    "hint": "Un '(' se apila. Un ')' desapila si hay elementos, o falla si la pila está vacía.",
    "code": "\"\"\" AED / 05 · Paréntesis equilibrados \"\"\"\n\n# balanced: str -> bool\n# INPUT : texto con paréntesis\n# OUTPUT: True cuando están balanceados\n\ndef balanced(text):\n    stack = []                                # Almacena aperturas  // O(n)\n    for char in text:                         # Lee cada carácter una vez  // O(n)\n        if char == \"(\":\n            stack.append(char)\n        elif char == \")\":\n            if not stack:\n                return False\n            stack.pop()\n    return not stack\n\n# Complejidad: Θ(n) tiempo; O(n) espacio\n\nassert balanced(\"\") == True\nassert balanced(\"()\") == True",
    "recipeVersion": "EYWA-CODE/1"
  },
  "06": {
    "title": "Diccionarios",
    "topic": "Frecuencias con hashing",
    "functionName": "frequencies",
    "description": "Construye un diccionario con el número de apariciones de cada elemento hashable.",
    "hint": "Para cada item, asigna freq[item] = freq.get(item, 0) + 1.",
    "code": "\"\"\" AED / 06 · Frecuencias con hashing \"\"\"\n\n# frequencies: list[str] -> dict[str,int]\n# INPUT : lista de claves hashables\n# OUTPUT: cantidad de cada clave\n\ndef frequencies(items):\n    freq = {}                                 # Diccionario de conteos  // O(k)\n    for item in items:                        # Una pasada  // O(n)\n        freq[item] = freq.get(item, 0) + 1    # Inserta o actualiza  // O(1) prom.\n    return freq\n\n# Complejidad: Θ(n) esperado tiempo; O(k) espacio\n\nassert frequencies([]) == {}\nassert frequencies([\"a\"]) == {\"a\": 1}",
    "recipeVersion": "EYWA-CODE/1"
  },
  "07": {
    "title": "Ordenación",
    "topic": "Merge sort",
    "functionName": "merge_sort",
    "description": "Devuelve una lista nueva y ordenada. Divide el problema y mezcla resultados sin usar sorted().",
    "hint": "Divide en dos mitades; ordena recursivamente ambas; avanza con dos índices al mezclarlas.",
    "code": "\"\"\" AED / 07 · Merge sort \"\"\"\n\n# merge_sort: list[int] -> list[int]\n# INPUT : lista de números\n# OUTPUT: lista ordenada (sin modificar la original)\n\ndef merge_sort(xs):\n    if len(xs) <= 1:                          # Caso base  // O(1)\n        return xs[:]\n    m = len(xs) // 2                          # Divide la entrada  // O(1)\n    a = merge_sort(xs[:m])\n    b = merge_sort(xs[m:])\n    i = j = 0\n    out = []\n    while i < len(a) and j < len(b):          # Mezcla lineal  // O(n)\n        if a[i] <= b[j]:\n            out.append(a[i]); i += 1\n        else:\n            out.append(b[j]); j += 1\n    return out + a[i:] + b[j:]\n\n# Complejidad: Θ(n log n) tiempo; O(n) espacio\n\nassert merge_sort([]) == []\nassert merge_sort([1]) == [1]",
    "recipeVersion": "EYWA-CODE/1"
  },
  "08": {
    "title": "Búsqueda en texto",
    "topic": "Fuerza bruta",
    "functionName": "find_pattern",
    "description": "Encuentra la primera posición del patrón en el texto, o −1 si está ausente. Un patrón vacío está en la posición 0.",
    "hint": "Recorre todas las posiciones i entre 0 y n−m; compara text[i:i+m] con el patrón.",
    "code": "\"\"\" AED / 08 · Fuerza bruta \"\"\"\n\n# find_pattern: str, str -> int\n# INPUT : texto y patrón\n# OUTPUT: primera posición o -1\n\ndef find_pattern(text, pattern):\n    if pattern == \"\":                         # Patrón vacío comienza en 0  // O(1)\n        return 0\n    m = len(pattern)\n    for i in range(len(text) - m + 1):        # Revisa cada posición  // O(n)\n        if text[i:i + m] == pattern:          # Compara la subcadena  // O(m)\n            return i\n    return -1\n\n# Complejidad: O(n*m) peor caso; O(m) por slicing\n\nassert find_pattern(\"\", \"a\") == -1\nassert find_pattern(\"abc\", \"\") == 0",
    "recipeVersion": "EYWA-CODE/1"
  },
  "09": {
    "title": "Compresión de datos",
    "topic": "Costo de Huffman",
    "functionName": "huffman_cost",
    "description": "Suma el costo de fusionar repetidamente las dos frecuencias mínimas. Para 0 o 1 símbolos, el costo de fusiones es 0.",
    "hint": "Usa heapq: extrae los dos mínimos, suma ambos al costo y reinserta su combinación.",
    "code": "\"\"\" AED / 09 · Costo de Huffman \"\"\"\n\n# huffman_cost: list[int] -> int\n# INPUT : frecuencias no negativas\n# OUTPUT: costo total de fusiones Huffman\n\nfrom heapq import heapify, heappop, heappush\n\ndef huffman_cost(weights):\n    heap = list(weights)\n    heapify(heap)                             # Construye min-heap  // O(k)\n    cost = 0\n    while len(heap) > 1:                      # Quedan nodos por fusionar  // O(k)\n        a = heappop(heap)\n        b = heappop(heap)\n        cost += a + b\n        heappush(heap, a + b)                 # Inserta frecuencia fusionada  // O(log k)\n    return cost\n\n# Complejidad: O(k log k) tiempo; O(k) espacio\n\nassert huffman_cost([]) == 0\nassert huffman_cost([10]) == 0",
    "recipeVersion": "EYWA-CODE/1"
  }
};
