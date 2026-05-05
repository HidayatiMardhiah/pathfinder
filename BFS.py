from collections import deque

# Breath first search function
def bfs(grid, start, end):

    # create the queue (first in, first out)
    queue = deque([start]) 

    # create a set to track nodes visited
    visited = set()

    # mark the start node as visited
    visited.add(start)

    # create a dictionary to track the parent of each node
    parent = {start: None}

    while queue:
        # dequeue the front node from the queue
        node = queue.popleft() 

        if node == end:
            return reconstruct_path(parent,end)

        # print the node to show the order of traversal
        print(node)

        # Explore the neighbors of the node
        for neighbor in find_cells(grid, node[0], node[1]):
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] = node # set the parent of the neighbor to the current node
                queue.append(neighbor) # enqueue the neighbor into the queue


def reconstruct_path(parent, end):
    path = []
    current = end

    while current is not None:
        path.append(current)
        current = parent[current]

    path.reverse()  # Reverse the path to get the correct order
    return path


def find_cells(grid,row, col):

    neighbors = []

    # Check the four possible directions (up, down, left, right)
    if row > 0 and grid[row-1][col] == 0:
        neighbors.append((row -1, col))
    if row < len(grid) - 1 and grid[row+1][col] == 0:
        neighbors.append((row + 1, col))
    if col > 0 and grid[row][col -1] == 0:
        neighbors.append((row, col - 1))
    if col < len(grid[0]) - 1 and grid[row][col + 1] == 0:
        neighbors.append((row, col + 1))
    return neighbors

