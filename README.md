Asset Tree Project

# Overview

This project is a web application that visualizes an asset tree structure. The application allows users to filter and search through the tree based on various criteria such as energy sensors and alert statuses. The tree is built using recursive components and functions to handle the hierarchical data structure efficiently.

<video controls>
  <source src="/demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## Technologies Used

- React: A JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Tailwind CSS: A utility-first CSS framework for styling the application.
- Lucide Icons: A collection of simple and consistent icons for React.

## Key Components

### MainHeader

The MainHeader component is responsible for displaying the main header of the application. It includes buttons to switch between different data sources.

### TreeHeader

The TreeHeader component displays the header for the tree section, including the data source name and a collapse button.

### TreeControls

The TreeControls component provides filtering and search functionalities. Users can filter the tree nodes by energy sensors, alert statuses, or search queries.

### NodeComponent

The NodeComponent is a recursive component that renders each node in the tree. It handles the opening and closing of child nodes and displays the appropriate icons and statuses.

### NodeStatus

The NodeStatus component displays the status of a node, such as "operating" or "alert".

### NodeIcon

The NodeIcon component displays the appropriate icon for a node based on its type (e.g., location, asset).

## Recursive Components and Functions

The project heavily utilizes recursive components and functions to manage the hierarchical structure of the asset tree. This approach allows for efficient rendering and filtering of nested nodes.

### Recursive Node Rendering

The NodeComponent recursively renders each node and its children. This allows the tree to dynamically expand and collapse based on user interactions.

### Recursive Filtering

The filtering functions in TreeControls recursively traverse the tree to apply filters based on energy sensors, alert statuses, or search queries. This ensures that the entire tree structure is considered when applying filters.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies.
3. Start the development server.
4. Open the application in your browser.

## Conclusion

This project demonstrates the use of React, TypeScript, and Tailwind CSS to build a dynamic and interactive asset tree visualization. The use of recursive components and functions ensures efficient handling of hierarchical data structures, making the application scalable and maintainable.
