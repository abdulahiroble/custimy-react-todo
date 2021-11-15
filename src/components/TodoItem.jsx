import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import ProgressBar from "@ramonak/react-progress-bar";
import AddMiniTodoItem from './AddMiniTodoItem';

const StyledTodoItem = styled.li`
  padding: 15px 0;
  list-style: none;

  button {
    background: ${({ theme }) => theme.lightGrey};
    border: 0;
    border-radius: 4px 4px 0 0;
    margin-right: 15px;
    padding: 10px;
    cursor: pointer;

    .fa-circle {
      font-size: 16px;
      color: ${({ theme }) => theme.darkerGrey};
    }

    .fa-check-circle {
      color: ${({ theme }) => theme.darkestGrey};
      font-size: 16px;
      display: none;
    }

    &:hover {
      background: ${({ theme }) => theme.darkerGrey};
      transition: 0.3s;

      .fa-circle {
        transition: 0.3s;
        display: none;
      }

      .fa-check-circle {
        display: inline-block;
      }
    }
  }

  input {
    font-size: 16px;
    color: ${({ theme }) => theme.darkestGrey};
    align-self: center;
    width: 100%;
    border: none;
    outline: none;
    background: ${({ theme }) => theme.backgroundColor};
  }

  div {
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid ${({ theme }) => theme.lightGrey};

    &:hover {
      border-color: ${({ theme }) => theme.darkerGrey};
      transition: 0.3s;

      button {
        background: ${({ theme }) => theme.darkerGrey};
        transition: 0.3s;
      }

      .fa-circle {
        color: ${({ theme }) => theme.lightGrey};
        transition: 0.3s;
      }
    }
  }
`;

const StyledTodoList = styled.div`
  display: flex;
  margin-top: 10%;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    color: black;
  }

`;

const TodoItem = ({ deleteItem, item, editItem }) => {
  const [value, setValue] = useState(item.todo || '');
  // const [progressValue, setProgressValue] = useState(item.progress || 0);
  const [todoMiniItems, setMiniTodoItems] = useState([]);

  useEffect(() => {
    // Load from storage
    if (typeof Storage !== 'undefined') {
      // localStorage supported.
      const todos = JSON.parse(localStorage.getItem('todoMiniItems'));
      if (todos) {
        setMiniTodoItems(todos);
      }
    } else {
      // Using cookies here :(
      let todos = document.cookie;
      if (todos !== '') {
        todos = todos.split('; ');
        const decodedTodos = [];
        todos.forEach((items) => {
          const splitItem = items.split('=');
          decodedTodos.push({
            progress: splitItem[0],
            todo: splitItem[1],
          });
        });
        setMiniTodoItems(decodedTodos);
      }
    }
  }, []);

  useEffect(() => {
    // save to storage
    if (typeof Storage !== 'undefined') {
      // localStorage supported.
      localStorage.setItem('todoMiniItems', JSON.stringify(todoMiniItems));
    } else {
      // Using cookies here :(
      // const todos = todoMiniItems;
      // todos.forEach((items) => {
      //   document.cookie = `${items.progress}=${items.todo}`;
      // });
    }
  }, [todoMiniItems]);

  const addMiniTodoItem = (items) => {
    const todos = todoMiniItems;
    todos.push({ todoMiniItem: items, progress: 10 });
    setMiniTodoItems([...todos]);
    console.log(items)
  };



  const editHandler = useCallback(
    debounce(async (originalItem, editedItemValue) => {
      await editItem(originalItem, editedItemValue);
    }, 500),
    [],
  );

  useEffect(() => {
    if (value !== item.todo) {
      editHandler(item, value);
    }
  }, [item, value]);

  return (
    <>
      <StyledTodoItem>
        <div>
          <button type="button" onClick={() => deleteItem(item)}>
            <FontAwesomeIcon className="fa-circle" icon={faCircle} />
            <FontAwesomeIcon className="fa-check-circle" icon={faCheckCircle} />
          </button>
          <input
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              editHandler();
            }}
          />
        </div>
        <br />
        <AddMiniTodoItem addMiniTodoItem={addMiniTodoItem} />
      </StyledTodoItem>
      <StyledTodoList>
        <ul>
          {todoMiniItems
            .map((items) => (
              <li>{items.todoMiniItem[0]}  <ProgressBar completed={items.todoMiniItem[1]} /> </li>
            ))}
        </ul>
      </StyledTodoList>
    </>
  );
};

TodoItem.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  item: PropTypes.shape({
    identifierKey: PropTypes.string,
    todo: PropTypes.string,
  }).isRequired,
};

export default TodoItem;
