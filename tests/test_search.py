"""Pruebas estándar para la implementación de búsqueda binaria de EYWA."""
import unittest

from eywa.search import binary_search


class TestBinarySearch(unittest.TestCase):
    def test_found(self):
        self.assertEqual(binary_search([2, 4, 6, 8], 6), 2)

    def test_missing(self):
        self.assertEqual(binary_search([2, 4, 6, 8], 7), -1)

    def test_empty(self):
        self.assertEqual(binary_search([], 1), -1)

    def test_boundaries(self):
        self.assertEqual(binary_search([1, 2, 3, 4, 5], 1), 0)
        self.assertEqual(binary_search([1, 2, 3, 4, 5], 5), 4)


if __name__ == "__main__":
    unittest.main()
