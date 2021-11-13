import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const AddMiniTodoItem = ({ addMiniTodoItem }) => {
    const [value, setValue] = useState('');

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            addMiniTodoItem(value);
            setValue('');
        }}>
            <div style={{ "display": "flex" }}>
                <input
                    type="text"
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    placeholder="Add mini todo"
                    required
                />
                <button type="submit">
                    <FontAwesomeIcon className="fa-plus" icon={faPlus} />
                </button>
            </div>
        </form>
    )
}

AddMiniTodoItem.propTypes = {
    addMiniTodoItem: PropTypes.func.isRequired,
};


export default AddMiniTodoItem

