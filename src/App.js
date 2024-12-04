import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {

  switch (action.type) {
    case 'openAccount':
      return {
        ...state,
        isActive: true,
        balance: 500,
      };
    case 'deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'withdraw':
      return {
        ...state,
        balance: state.balance > 50 ? state.balance - action.payload : 0,
      };
    case 'getLoan':
      if (state.loan > 0) return state;

      return {
        ...state,
        balance: state.balance + action.payload,
        loan: action.payload,
      };
    case 'payLoan':
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };
    case 'closeAccount':
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;
    default:
      throw new Error("Unknown action");

  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <h1>AnnoBank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => dispatch({ type: 'openAccount' })} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'deposit', payload: 150 })} disabled={!isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'withdraw', payload: 50 })} disabled={!isActive || balance <= 0}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'getLoan', payload: 5000 })} disabled={loan ? true : false || !isActive}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'payLoan' })} disabled={!isActive || loan === 0 ? true : false}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'closeAccount' })} disabled={!isActive || (loan > 0 || balance > 0) ? true : false}>
          Close account
        </button>
      </p>
    </div>
  );
}
