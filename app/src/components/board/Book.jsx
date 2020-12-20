import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 3px;
  opacity: ${props => (props.isDragging ? 0.6 : 1)};
  background-color: white;
`;

const Title = styled.h2`
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0.4rem 0;
  line-height: 120%;
`;

const Author = styled.h3`
  font-size: 0.9rem;
  margin: 0.6rem 0 0.3rem;
  font-weight: 400;
  line-height: 120%;
`;

const Metadata = styled.div`
  padding: 8px 0 0;
`;

const GoodreadsLink = styled.a`
  transition: color 300ms;
  font-size: 0.62rem;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 180%;
  letter-spacing: 1px;
  color: grey;
  &::after {
    content: " →";
  }
  &:hover {
    color: black;
    text-decoration: none;
  }
`;

export default class Book extends React.Component {
  render() {
    const { id, title, author, goodreadsId } = this.props.book;
    return (
      <Draggable draggableId={id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Title>{title}</Title>
            <Author>{author}</Author>
            <Metadata>
              {goodreadsId && (
                <GoodreadsLink
                  href={`https://www.goodreads.com/book/show/${goodreadsId}`}
                  target="_blank"
                >
                  View in Goodreads
                </GoodreadsLink>
              )}
            </Metadata>
          </Container>
        )}
      </Draggable>
    );
  }
}
