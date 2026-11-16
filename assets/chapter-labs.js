/* EYWA / course lab bank - original educational exercises */
window.EYWA_LABS = {
  "10": {
    "title": "Grafos",
    "topic": "Recorrido BFS",
    "functionName": "bfs",
    "description": "Devuelve el orden de visita BFS desde start. Visita vecinos según el orden de sus listas de adyacencia.",
    "hint": "Usa deque como cola, un set de visitados y agrega los vecinos no visitados al final.",
    "code": "from collections import deque\n\ndef bfs(graph, start):\n    seen = {start}\n    queue = deque([start])\n    order = []\n    while queue:\n        v = queue.popleft()\n        order.append(v)\n        for nxt in graph.get(v, []):\n            if nxt not in seen:\n                seen.add(nxt)\n                queue.append(nxt)\n    return order",
    "cases": [
      {
        "args": [
          {
            "A": [
              "B",
              "C"
            ],
            "B": [
              "D"
            ],
            "C": [
              "E"
            ],
            "D": [],
            "E": []
          },
          "A"
        ],
        "expected": [
          "A",
          "B",
          "C",
          "D",
          "E"
        ]
      },
      {
        "args": [
          {
            "A": []
          },
          "A"
        ],
        "expected": [
          "A"
        ]
      },
      {
        "args": [
          {
            "A": [
              "B"
            ],
            "B": [
              "A"
            ]
          },
          "A"
        ],
        "expected": [
          "A",
          "B"
        ]
      },
      {
        "args": [
          {
            "X": [
              "Y",
              "Z"
            ],
            "Y": [],
            "Z": []
          },
          "X"
        ],
        "expected": [
          "X",
          "Y",
          "Z"
        ]
      },
      {
        "args": [
          {},
          "A"
        ],
        "expected": [
          "A"
        ]
      }
    ]
  },
  "01": {
    "title": "Python e invariantes",
    "topic": "Potencia binaria",
    "functionName": "power",
    "description": "Devuelve x elevado a n, con n entero no negativo. Intenta reducir el exponente a la mitad en cada paso.",
    "hint": "Inicializa resultado=1. En cada paso, si n es impar, multiplica resultado por x; después eleva x al cuadrado y divide n entre 2.",
    "code": "def power(x, n):\n    result = 1\n    while n > 0:\n        if n % 2:\n            result *= x\n        x *= x\n        n //= 2\n    return result",
    "cases": [
      {
        "args": [
          2,
          0
        ],
        "expected": 1
      },
      {
        "args": [
          2,
          10
        ],
        "expected": 1024
      },
      {
        "args": [
          -3,
          3
        ],
        "expected": -27
      },
      {
        "args": [
          5,
          1
        ],
        "expected": 5
      },
      {
        "args": [
          0,
          5
        ],
        "expected": 0
      },
      {
        "args": [
          1,
          1000
        ],
        "expected": 1
      }
    ]
  },
  "02": {
    "title": "Complejidad asintótica",
    "topic": "Conteo logarítmico",
    "functionName": "count_halvings",
    "description": "Cuenta cuántas divisiones enteras por 2 requiere n para llegar a 1. Precondición: n ≥ 1.",
    "hint": "Mientras n > 1, reemplázalo por n // 2 y aumenta un contador.",
    "code": "def count_halvings(n):\n    steps = 0\n    while n > 1:\n        n //= 2\n        steps += 1\n    return steps",
    "cases": [
      {
        "args": [
          1
        ],
        "expected": 0
      },
      {
        "args": [
          2
        ],
        "expected": 1
      },
      {
        "args": [
          3
        ],
        "expected": 1
      },
      {
        "args": [
          8
        ],
        "expected": 3
      },
      {
        "args": [
          15
        ],
        "expected": 3
      },
      {
        "args": [
          128
        ],
        "expected": 7
      }
    ]
  },
  "03": {
    "title": "Diseño eficiente",
    "topic": "Fibonacci dinámico",
    "functionName": "fibonacci",
    "description": "Calcula F(n), con F(0)=0 y F(1)=1, sin repetir la recursión exponencial.",
    "hint": "Conserva únicamente los dos términos anteriores y avanza n veces.",
    "code": "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a",
    "cases": [
      {
        "args": [
          0
        ],
        "expected": 0
      },
      {
        "args": [
          1
        ],
        "expected": 1
      },
      {
        "args": [
          2
        ],
        "expected": 1
      },
      {
        "args": [
          10
        ],
        "expected": 55
      },
      {
        "args": [
          20
        ],
        "expected": 6765
      },
      {
        "args": [
          30
        ],
        "expected": 832040
      }
    ]
  },
  "04": {
    "title": "Estructuras elementales",
    "topic": "Búsqueda binaria",
    "functionName": "binary_search",
    "description": "En una lista ordenada y sin repetidos devuelve el índice buscado, o −1 si no existe.",
    "hint": "Mantén un intervalo cerrado [low, high] y descarta una de las mitades según el valor central.",
    "code": "def binary_search(xs, target):\n    low, high = 0, len(xs) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if xs[mid] == target:\n            return mid\n        if xs[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1",
    "cases": [
      {
        "args": [
          [
            1,
            3,
            5,
            7
          ],
          5
        ],
        "expected": 2
      },
      {
        "args": [
          [],
          8
        ],
        "expected": -1
      },
      {
        "args": [
          [
            1
          ],
          1
        ],
        "expected": 0
      },
      {
        "args": [
          [
            1
          ],
          2
        ],
        "expected": -1
      },
      {
        "args": [
          [
            2,
            4,
            6,
            8
          ],
          2
        ],
        "expected": 0
      },
      {
        "args": [
          [
            2,
            4,
            6,
            8
          ],
          9
        ],
        "expected": -1
      }
    ]
  },
  "05": {
    "title": "Pilas y colas",
    "topic": "Paréntesis equilibrados",
    "functionName": "balanced",
    "description": "Devuelve True si cada paréntesis abierto tiene un cierre válido. Ignora los demás caracteres.",
    "hint": "Un '(' se apila. Un ')' desapila si hay elementos, o falla si la pila está vacía.",
    "code": "def balanced(text):\n    stack = []\n    for char in text:\n        if char == \"(\":\n            stack.append(char)\n        elif char == \")\":\n            if not stack:\n                return False\n            stack.pop()\n    return not stack",
    "cases": [
      {
        "args": [
          ""
        ],
        "expected": true
      },
      {
        "args": [
          "()"
        ],
        "expected": true
      },
      {
        "args": [
          "(()())"
        ],
        "expected": true
      },
      {
        "args": [
          "(()"
        ],
        "expected": false
      },
      {
        "args": [
          ")("
        ],
        "expected": false
      },
      {
        "args": [
          "(a+b)*(c+d)"
        ],
        "expected": true
      }
    ]
  },
  "06": {
    "title": "Diccionarios",
    "topic": "Frecuencias con hashing",
    "functionName": "frequencies",
    "description": "Construye un diccionario con el número de apariciones de cada elemento hashable.",
    "hint": "Para cada item, asigna freq[item] = freq.get(item, 0) + 1.",
    "code": "def frequencies(items):\n    freq = {}\n    for item in items:\n        freq[item] = freq.get(item, 0) + 1\n    return freq",
    "cases": [
      {
        "args": [
          []
        ],
        "expected": {}
      },
      {
        "args": [
          [
            "a"
          ]
        ],
        "expected": {
          "a": 1
        }
      },
      {
        "args": [
          [
            "a",
            "b",
            "a"
          ]
        ],
        "expected": {
          "a": 2,
          "b": 1
        }
      },
      {
        "args": [
          [
            "x",
            "x",
            "y",
            "z",
            "y",
            "x"
          ]
        ],
        "expected": {
          "x": 3,
          "y": 2,
          "z": 1
        }
      },
      {
        "args": [
          [
            "1",
            "1",
            "2"
          ]
        ],
        "expected": {
          "1": 2,
          "2": 1
        }
      }
    ]
  },
  "07": {
    "title": "Ordenación",
    "topic": "Merge sort",
    "functionName": "merge_sort",
    "description": "Devuelve una lista nueva y ordenada. Divide el problema y mezcla resultados sin usar sorted().",
    "hint": "Divide en dos mitades; ordena recursivamente ambas; avanza con dos índices al mezclarlas.",
    "code": "def merge_sort(xs):\n    if len(xs) <= 1:\n        return xs[:]\n    m = len(xs) // 2\n    a = merge_sort(xs[:m])\n    b = merge_sort(xs[m:])\n    i = j = 0\n    out = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i]); i += 1\n        else:\n            out.append(b[j]); j += 1\n    return out + a[i:] + b[j:]",
    "cases": [
      {
        "args": [
          []
        ],
        "expected": []
      },
      {
        "args": [
          [
            1
          ]
        ],
        "expected": [
          1
        ]
      },
      {
        "args": [
          [
            3,
            1,
            2
          ]
        ],
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "args": [
          [
            5,
            5,
            2,
            8,
            2
          ]
        ],
        "expected": [
          2,
          2,
          5,
          5,
          8
        ]
      },
      {
        "args": [
          [
            -3,
            2,
            0,
            -1
          ]
        ],
        "expected": [
          -3,
          -1,
          0,
          2
        ]
      },
      {
        "args": [
          [
            9,
            7,
            5,
            3,
            1
          ]
        ],
        "expected": [
          1,
          3,
          5,
          7,
          9
        ]
      }
    ]
  },
  "08": {
    "title": "Búsqueda en texto",
    "topic": "Fuerza bruta",
    "functionName": "find_pattern",
    "description": "Encuentra la primera posición del patrón en el texto, o −1 si está ausente. Un patrón vacío está en la posición 0.",
    "hint": "Recorre todas las posiciones i entre 0 y n−m; compara text[i:i+m] con el patrón.",
    "code": "def find_pattern(text, pattern):\n    if pattern == \"\":\n        return 0\n    m = len(pattern)\n    for i in range(len(text) - m + 1):\n        if text[i:i + m] == pattern:\n            return i\n    return -1",
    "cases": [
      {
        "args": [
          "algoritmos",
          "rit"
        ],
        "expected": 4
      },
      {
        "args": [
          "aaaaab",
          "aab"
        ],
        "expected": 3
      },
      {
        "args": [
          "hola",
          "adios"
        ],
        "expected": -1
      },
      {
        "args": [
          "abc",
          ""
        ],
        "expected": 0
      },
      {
        "args": [
          "",
          "a"
        ],
        "expected": -1
      },
      {
        "args": [
          "abababa",
          "aba"
        ],
        "expected": 0
      }
    ]
  },
  "09": {
    "title": "Compresión de datos",
    "topic": "Costo de Huffman",
    "functionName": "huffman_cost",
    "description": "Suma el costo de fusionar repetidamente las dos frecuencias mínimas. Para 0 o 1 símbolos, el costo de fusiones es 0.",
    "hint": "Usa heapq: extrae los dos mínimos, suma ambos al costo y reinserta su combinación.",
    "code": "from heapq import heapify, heappop, heappush\n\ndef huffman_cost(weights):\n    heap = list(weights)\n    heapify(heap)\n    cost = 0\n    while len(heap) > 1:\n        a = heappop(heap)\n        b = heappop(heap)\n        cost += a + b\n        heappush(heap, a + b)\n    return cost",
    "cases": [
      {
        "args": [
          []
        ],
        "expected": 0
      },
      {
        "args": [
          [
            10
          ]
        ],
        "expected": 0
      },
      {
        "args": [
          [
            1,
            1,
            1,
            1
          ]
        ],
        "expected": 8
      },
      {
        "args": [
          [
            2,
            3,
            7
          ]
        ],
        "expected": 17
      },
      {
        "args": [
          [
            5,
            9,
            12,
            13,
            16,
            45
          ]
        ],
        "expected": 224
      }
    ]
  }
};
