import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Book from "./Book";

const Container = styled.div`
  margin: 8px;
  min-width: 220px;
  border: 1px solid lightgray;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  background-color: white;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
`;
const Title = styled.h1`
  padding: 16px 16px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
const BookList = styled.div`
  transition: background-color 130ms ease-out;
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "#f0f6ff" : "inherit")};
  flex-grow: 1;
  min-height: 100px;
`;
const BookshelfCount = styled.span`
  color: gray;
  font-size: 0.7rem;
  padding-left: 4px;
`;

export default class Bookshelf extends React.Component {
  render() {
    const { title, id } = this.props.bookshelf;
    const { books, index } = this.props;
    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>
              {title} <BookshelfCount>{books.length}</BookshelfCount>
            </Title>
            <Droppable droppableId={id} type="book">
              {(provided, snapshot) => (
                <BookList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {books.map((book, index) => (
                    <Book key={book.id} book={book} index={index} />
                  ))}
                  {provided.placeholder}
                </BookList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
