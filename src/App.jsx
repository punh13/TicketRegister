import './App.css';
import './styles.css';
import { useReducer, useEffect } from 'react';
import TicketForm from './components/TicketForm';
import ticketReducer from './reducers/ticketReducer';
import TicketList from './components/TicketList';
import { sortTickets } from './utilities/sortingUtilities';
import Sorting from './components/Sorting';

function App() {
  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPreference: 'High to Low',
  };

  const [state, dispatch] = useReducer(ticketReducer, initialState, () => {
    const localData = localStorage.getItem('tickets');
    return localData
      ? { ...initialState, tickets: JSON.parse(localData) }
      : initialState;
  });

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(state.tickets));
  }, [state.tickets]);

  const sortedTickets = sortTickets(state.tickets, state.sortPreference);

  return (
    <div className="App">
      <div className="container">
        <h1>Ticket Register</h1>
        <TicketForm
          dispatch={dispatch}
          editingTicket={state.editingTicket}
        ></TicketForm>

        {state.tickets.length > 0 && (
          <div className="results">
            <h2>All Tickets</h2>

            <Sorting state={state.sortPreference} dispatch={dispatch} />
            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
            ></TicketList>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
