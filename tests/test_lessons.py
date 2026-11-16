"""Pruebas de regresión para la biblioteca EYWA / AED."""

import unittest

from eywa.lessons import (
    balanced, bfs, count_halvings, fibonacci, find_pattern, frequencies,
    huffman_cost, merge_sort, power,
)
from eywa.search import binary_search


class TestAEDLessons(unittest.TestCase):
    def test_intro(self):
        self.assertEqual(power(3, 5), 243)
        self.assertEqual(power(2, 0), 1)
        self.assertEqual(power(-2, 3), -8)

    def test_analysis(self):
        self.assertEqual(count_halvings(1), 0)
        self.assertEqual(count_halvings(15), 3)
        self.assertEqual(count_halvings(128), 7)

    def test_design(self):
        self.assertEqual(fibonacci(0), 0)
        self.assertEqual(fibonacci(10), 55)
        self.assertEqual(fibonacci(20), 6765)

    def test_data_structures(self):
        self.assertEqual(binary_search([2, 4, 6, 8], 6), 2)
        self.assertEqual(binary_search([], 1), -1)

    def test_stacks(self):
        self.assertTrue(balanced("(()())"))
        self.assertFalse(balanced("(()"))
        self.assertTrue(balanced("f(a+b)"))

    def test_dictionaries(self):
        self.assertEqual(frequencies(["a", "b", "a"]), {"a": 2, "b": 1})
        self.assertEqual(frequencies([]), {})

    def test_sort(self):
        self.assertEqual(merge_sort([3, 1, 2, 1]), [1, 1, 2, 3])
        self.assertEqual(merge_sort([]), [])

    def test_text(self):
        self.assertEqual(find_pattern("aaaaab", "aab"), 3)
        self.assertEqual(find_pattern("abc", ""), 0)
        self.assertEqual(find_pattern("abc", "x"), -1)

    def test_compression(self):
        self.assertEqual(huffman_cost([5, 9, 12, 13, 16, 45]), 224)
        self.assertEqual(huffman_cost([1, 1, 1, 1]), 8)
        self.assertEqual(huffman_cost([]), 0)

    def test_graph(self):
        graph = {"A": ["B", "C"], "B": ["D"], "C": [], "D": []}
        self.assertEqual(bfs(graph, "A"), ["A", "B", "C", "D"])


if __name__ == "__main__":
    unittest.main()
