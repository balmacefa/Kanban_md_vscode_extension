import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Book from "./Book";

import { Typography } from 'antd';

const Container = styled.div`
  margin: 8px;
  padding: 4px;
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

const BookList = styled.div`
  transition: background-color 130ms ease-out;
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "#f0f6ff" : "inherit")};
  flex-grow: 1;
  min-height: 100px;
`;
const BookshelfCount = styled.span`
  z-index: auto;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  color: #fff;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  text-align: center;
  background: #23d5b4;
  border-radius: 10px;
  -webkit-box-shadow: 0 0 0 1px #fff;
  box-shadow: 0 0 0 1px #fff;
  margin-left: 8px
`;

const { Title } = Typography;


export default class Bookshelf extends React.Component {
  render() {
    const { title, id } = this.props.bookshelf;
    const { books, index } = this.props;
    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title level={3} {...provided.dragHandleProps}>
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
