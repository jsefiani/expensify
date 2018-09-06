import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
        type: 'INCREMENT',
        incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
});

const resetCount = () => ({
    type: 'RESET',
});

const store = createStore((state = { count:0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + action.incrementBy
            };
        
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            };
        
        case "RESET":
            return {
                count: state.count = 0
            };

        default: 
            return state;
    }
});


store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(decrementCount({decrementBy: 2 }));
store.dispatch(decrementCount());

store.dispatch(resetCount());



