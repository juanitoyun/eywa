"""Búsquedas y sus invariantes, con implementaciones deliberadamente claras."""

from collections.abc import Sequence


def binary_search(values: Sequence[int], target: int) -> int:
    """Devuelve el índice de target en una secuencia ascendente, o -1.

    Complejidad temporal: O(log n). Espacio adicional: O(1).
    Precondición: values está ordenada de menor a mayor.
    """
    left, right = 0, len(values) - 1
    while left <= right:
        mid = (left + right) // 2
        if values[mid] == target:
            return mid
        if values[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1


if __name__ == "__main__":
    assert binary_search([2, 4, 6, 8], 6) == 2
    assert binary_search([], 3) == -1
    print("Tests OK")
