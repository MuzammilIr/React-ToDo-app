import React, { useState } from 'react';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Logo from './download (1).png';

function App() {
  const [Text, setText] = useState('');
  const [Option, setOption] = useState('');
  const [List, setList] = useState([]);
  const [filter, setFilter] = useState('');
  const [idCounter, setIdCounter] = useState(0);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  const handleSubmit = () => {
    if (Text === '') {
      alert('Please Enter Some Text');
      return;
    }

    if (Option === '') {
      alert('Please select an option.');
      return;
    }

    setList((prevList) => [...prevList, { id: idCounter, Text: Text, Option: Option }]);
    setIdCounter(idCounter + 1);
    setText('');
    setOption('');
    setShowCheckboxes(false);
  };

  const handleDelete = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, Option: newStatus } : item))
    );
    setItemToUpdate(null);
    setShowCheckboxes(false);
    setFilter('');
  };

  const filteredList = List.filter((item) => {
    if (filter) {
      return item.Option === filter;
    } else {
      return true;
    }
  });

  const handleShowCheckboxes = (id) => {
    setItemToUpdate(id);
    setShowCheckboxes(true);
  };

  const handleHideCheckboxes = () => {
    setItemToUpdate(null);
    setShowCheckboxes(false);
  };

  return (
    <div className="main-app">
      <table className="Head">
        <tr>
          <th>
            <img src={Logo} alt="React Logo" width="48" height="48" />
          </th>
          &nbsp;&nbsp;
          <th>
            <h2>TO DO APP</h2>
          </th>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <th>
            <h3>Filter </h3>
            &nbsp; &nbsp; &nbsp;  &nbsp;
          </th>
          <th>
            <div >
              <button className='button3' onClick={() => handleFilterChange('')}>All</button>
              <button className='button3' onClick={() => handleFilterChange('Pending')}>Progress</button>
              <button className='button3' onClick={() => handleFilterChange('Progress')}>Pending</button>
              <button className='button3' onClick={() => handleFilterChange('Done')}>Done</button>
            </div>
          </th>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <th>
            <input
              type="text"
              value={Text}
              placeholder="Write Note"
              onChange={(e) => setText(e.target.value)}
            />
          </th>
          <th>
            &nbsp;&nbsp;&nbsp;
            {!showCheckboxes ? (
              <>
                <select className="filt" value={Option} onChange={(e) => setOption(e.target.value)}>
                  <option value="" disabled>
                    Select Option
                  </option>
                  <option value="Pending">Pending</option>
                  <option value="Progress">Progress</option>
                  <option value="Done">Done</option>
                </select>
                <button type="button" className="button1" onClick={handleSubmit}>
                  Add
                </button>
              </>
            ) : (
              <>
                <button type="button" className="button2" onClick={handleHideCheckboxes}>
                  Cancel
                </button>
              </>
            )}
          </th>
        </tr>
      </table>
      <center>
      <table className="list">
        <tbody>
          <tr >
            <th><h3>Pending</h3></th>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <th><h3>Progress</h3></th>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <th><h3>Done</h3></th>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          </tr>
          <tr>
            <td className="white">
              <DndProvider backend={HTML5Backend}>
                {filteredList.map((item) => item.Option === 'Pending' && (
                  <div key={item.id} className="List">
                    <p>{item.Text}</p>
                    {!showCheckboxes && (
                      <button className="button2" onClick={() => handleShowCheckboxes(item.id)}>
                        Update
                      </button>
                    )}
                    {showCheckboxes && itemToUpdate === item.id && (
                      <>
                        <button onClick={() => handleUpdateStatus(item.id, 'Pending')}>Pending</button>
                        <button onClick={() => handleUpdateStatus(item.id, 'Progress')}>Progress</button>
                        <button onClick={() => handleUpdateStatus(item.id, 'Done')}>Done</button>
                        <button className="button2" onClick={handleHideCheckboxes}>
                          Cancel
                        </button>
                      </>
                    )}
                    {item.Option === 'Done' && (
                      <>
                        <button className="delete" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </DndProvider>
            </td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <td className='blue'>
              <DndProvider backend={HTML5Backend}>
                {filteredList.map((item) => item.Option === 'Progress' && (
                  <div key={item.id} className="List">
                    <p>{item.Text}</p>
                    {!showCheckboxes && (
                      <button className="button2" onClick={() => handleShowCheckboxes(item.id)}>
                        Update
                      </button>
                    )}
                    {showCheckboxes && itemToUpdate === item.id && (
                      <>
                        <button onClick={() => handleUpdateStatus(item.id, 'Pending')}>Pending</button>
                        <button onClick={() => handleUpdateStatus(item.id, 'Progress')}>Progress</button>
                        <button onClick={() => handleUpdateStatus(item.id, 'Done')}>Done</button>
                        <button className="button2" onClick={handleHideCheckboxes}>
                          Cancel
                        </button>
                      </>
                    )}
                    {item.Option === 'Done' && (
                      <>
                        <br />
                        <button className="delete" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </DndProvider>
            </td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <td className='green'>
              <DndProvider backend={HTML5Backend}>
                {filteredList.map((item) => item.Option === 'Done' && (
                  <div key={item.id} className="List">
                    <p>{item.Text}</p>
                    {!showCheckboxes && (
                      <button className="button2" onClick={() => handleShowCheckboxes(item.id)}>
                        Update
                      </button>
                    )}
                    {showCheckboxes && itemToUpdate === item.id && (
                      <>
                        <button onClick={() => handleUpdateStatus(item.id, 'Pending')}>Pending</button>
                        <button onClick={() => handleUpdateStatus(item.id, 'Progress')}>Progress</button>
                        <button onClick={() => handleUpdateStatus(item.id, 'Done')}>Done</button>
                        <button className="button2" onClick={handleHideCheckboxes}>
                          Cancel
                        </button>
                      </>
                    )}
                    {item.Option === 'Done' && (
                      <>
                        <br />
                        <button className="delete" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </DndProvider>
            </td>
          </tr>
        </tbody>
      </table>
      </center>
    </div>
  );
}

export default App;
