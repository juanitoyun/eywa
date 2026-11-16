"""Implementaciones educativas originales del curso EYWA / AED.

Todas usan únicamente la biblioteca estándar de Python.
"""

from collections import deque
from heapq import heapify, heappop, heappush

from .search import binary_search


def power(x: int, n: int) -> int:
    """Exponenciación binaria; precondición: n >= 0. O(log n)."""
    if n < 0:
        raise ValueError("n debe ser no negativo")
    result = 1
    while n:
        if n & 1:
            result *= x
        x *= x
        n //= 2
    return result


def count_halvings(n: int) -> int:
    """Número de divisiones por dos hasta llegar a 1; n >= 1."""
    if n < 1:
        raise ValueError("n debe ser positivo")
    steps = 0
    while n > 1:
        n //= 2
        steps += 1
    return steps


def fibonacci(n: int) -> int:
    """F(n) iterativo, con F(0)=0, F(1)=1. Tiempo O(n), espacio O(1)."""
    if n < 0:
        raise ValueError("n debe ser no negativo")
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a


def balanced(text: str) -> bool:
    """Comprueba paréntesis balanceados ignorando otros caracteres."""
    stack: list[str] = []
    for ch in text:
        if ch == "(":
            stack.append(ch)
        elif ch == ")":
            if not stack:
                return False
            stack.pop()
    return not stack


def frequencies(items: list[str]) -> dict[str, int]:
    """Cuenta apariciones de símbolos con diccionario."""
    freq: dict[str, int] = {}
    for item in items:
        freq[item] = freq.get(item, 0) + 1
    return freq


def merge_sort(xs: list[int]) -> list[int]:
    """Ordenamiento estable O(n log n) usando memoria auxiliar."""
    if len(xs) <= 1:
        return xs[:]
    mid = len(xs) // 2
    a = merge_sort(xs[:mid])
    b = merge_sort(xs[mid:])
    i = j = 0
    out: list[int] = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i])
            i += 1
        else:
            out.append(b[j])
            j += 1
    return out + a[i:] + b[j:]


def find_pattern(text: str, pattern: str) -> int:
    """Busca la primera ocurrencia de pattern en text, o -1."""
    if pattern == "":
        return 0
    m = len(pattern)
    for i in range(len(text) - m + 1):
        if text[i:i + m] == pattern:
            return i
    return -1


def huffman_cost(weights: list[int]) -> int:
    """Costo de fusionar frecuencias mediante un heap mínimo."""
    if any(w < 0 for w in weights):
        raise ValueError("frecuencias negativas")
    heap = weights[:]
    heapify(heap)
    cost = 0
    while len(heap) > 1:
        a = heappop(heap)
        b = heappop(heap)
        cost += a + b
        heappush(heap, a + b)
    return cost


def bfs(graph: dict[str, list[str]], start: str) -> list[str]:
    """Orden de visita BFS en función del orden dado de vecinos."""
    seen = {start}
    q = deque([start])
    order = []
    while q:
        v = q.popleft()
        order.append(v)
        for u in graph.get(v, []):
            if u not in seen:
                seen.add(u)
                q.append(u)
    return order
