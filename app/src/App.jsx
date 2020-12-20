
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Bookshelf from "./components/board/Bookshelf";
// import "@atlaskit/css-reset";
import styled from "styled-components";
import parseMD from 'parse-md'

import template from "./components/board/md_parser/Templates/01_template.md"

const Container = styled.div`
  padding: 1rem;
  display: flex;
`;

// const initialData = {
//   books: {},
//   bookshelves: {},
//   bookshelfOrder: []
// };

const initData = {
  books: {
    "book-1": {
      id: "book-1",
      title: "Thinking in Systems",
      author: "Donella Meadows"
    },
    "book-2": {
      id: "book-2",
      title: "Principles",
      author: "Ray Dalio"
    },
    "book-3": {
      id: "book-3",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman"
    },
    "book-4": {
      id: "book-4",
      title: "Thinking in Bets",
      author: "Annie Duke"
    },
    "book-5": {
      id: "book-5",
      title: "Superforecasting",
      author: "Philip E. Tetlock",
      goodreadsId: "23995360"
    },
    "book-6": {
      id: "book-6",
      title: "The Lean Startup",
      author: "Eric Ries"
    }
  },
  bookshelves: {
    "bookshelf-1": {
      id: "bookshelf-1",
      title: "To Read",
      bookIds: ["book-1", "book-3", "book-4"]
    },
    "bookshelf-2": {
      id: "bookshelf-2",
      title: "Selected for Reading",
      bookIds: ["book-5"]
    },
    "bookshelf-3": { id: "bookshelf-3", title: "Reading", bookIds: [] },
    "bookshelf-4": { id: "bookshelf-4", title: "Skimmed", bookIds: ["book-2"] },
    "bookshelf-5": {
      id: "bookshelf-5",
      title: "Gave Up On",
      bookIds: []
    },
    "bookshelf-6": { id: "bookshelf-6", title: "Finished", bookIds: ["book-6"] }
  },
  // Facilitate reordering of columns
  bookshelfOrder: [
    "bookshelf-1",
    "bookshelf-2",
    "bookshelf-3",
    "bookshelf-4",
    "bookshelf-5",
    "bookshelf-6"
  ]
};

class App extends React.Component {
  state = initData;

  async componentDidMount() {
    const { metadata, content } = parseMD(template)
    console.log(metadata)
    console.log(content)
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    // If there was no destination (i.e. the user dragged outside of the droppable area, do nothing)
    if (!destination) {
      return;
    }

    // If the position hasn’t changed, do nothing...
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // handle reordering of bookshelf columns
    if (type === "bookshelf") {
      const newBookshelfOrder = Array.from(this.state.bookshelfOrder);
      newBookshelfOrder.splice(source.index, 1); //remove from old index
      newBookshelfOrder.splice(destination.index, 0, draggableId); //inset into new index

      const newState = {
        ...this.state,
        bookshelfOrder: newBookshelfOrder
      };
      this.setState(newState);
      return;
    }

    const sourceBookshelf = this.state.bookshelves[source.droppableId];
    const destinationBookshelf = this.state.bookshelves[
      destination.droppableId
    ];

    // Moving within the same list
    if (sourceBookshelf === destinationBookshelf) {
      const newBookIds = Array.from(sourceBookshelf.bookIds);

      newBookIds.splice(source.index, 1); // from this index, remove 1 item
      newBookIds.splice(destination.index, 0, draggableId); // from this index, insert 1 item

      // what should the new bookshelf state look like?
      const newBookshelf = {
        ...sourceBookshelf,
        bookIds: newBookIds // new order of books
      };

      // update our state with the new bookshelf
      const newState = {
        ...this.state,
        bookshelves: {
          ...this.state.bookshelves,
          [newBookshelf.id]: newBookshelf
        }
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const sourceBookIds = Array.from(sourceBookshelf.bookIds);

    sourceBookIds.splice(source.index, 1);
    const newSourceBookshelf = {
      ...sourceBookshelf,
      bookIds: sourceBookIds
    };

    const destinationBookIds = Array.from(destinationBookshelf.bookIds);

    destinationBookIds.splice(destination.index, 0, draggableId);
    const newDestinationBookshelf = {
      ...destinationBookshelf,
      bookIds: destinationBookIds
    };

    const newState = {
      ...this.state,
      bookshelves: {
        ...this.state.bookshelves,
        [newSourceBookshelf.id]: newSourceBookshelf,
        [newDestinationBookshelf.id]: newDestinationBookshelf
      }
    };

    this.setState(newState);
    return;
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId="all-bookshelves"
          direction="horizontal"
          type="bookshelf"
        >
          {provided => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.bookshelfOrder.map((bookshelfId, index) => {
                const bookshelf = this.state.bookshelves[bookshelfId];
                const books = bookshelf.bookIds.map(
                  bookId => this.state.books[bookId]
                );
                return (
                  <Bookshelf
                    key={bookshelf.id}
                    bookshelf={bookshelf}
                    books={books}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;

