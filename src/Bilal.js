    import React, { Component } from 'react';
    import { Provider } from 'react-redux';
    import store from './Store';
    import Route from './Routes';
    class Bilal extends Component {
      constructor(props){
        super(props)
      }
      componentWillMount() {
        console.disableYellowBox = true
      }
      render() {
        return (
          <Provider store={store}>
            <Route />
          </Provider>
        );
      }
    }

    export default Bilal;