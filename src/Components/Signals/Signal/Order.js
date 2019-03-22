import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { Typography, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const EDIT_SIGNAL = gql`
  mutation UpdateSignal($id: ID!, $state: cockpit_SignalStateEnum, $orderData: cockpit_JSON, $reason: cockpit_JSON ) {
    cockpit_UpdateSignal(id: $id, state: $state, orderData: $orderData, reason: $reason) {
      id
    }
  }
`;

const CREATE_SIGNAL = gql`
  mutation CreateSignal($cloneId: String!, $orderData: cockpit_JSON, $reason: cockpit_JSON ) {
    cockpit_CreateSignal(cloneId: $cloneId, state: "ACCEPTED", orderData: $orderData, reason: $reason) {
      id
    }
  }
`;


class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderChanged: false,
      orderData: this.props.signal.orderData || {
        type: 'sell',
        amount: 1,
        stopLoss: 400,
        sellOrder: 400,
      },
      reason: { textual: '', formula: '' },
      state: 'ACCEPTED',
    };
  }

  render() {
    const { signal } = this.props;
    if (signal) {
      return (
        <Mutation mutation={EDIT_SIGNAL}
          update={() => (window.location.reload())}
        >
          {editSignal => (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (this.state.orderChanged) {
                    editSignal({
                      variables: {
                        id: signal.id,
                        state: this.state.state,
                        orderData: this.state.orderData,
                        reason: this.state.reason,
                      },
                    });
                  } else {
                    editSignal({
                      variables: {
                        id: signal.id,
                        state: this.state.state,
                        reason: this.state.reason,
                      },
                    });
                  }
                }}
              >
                <Typography>
                  OrderData
                </Typography>
                <JSONInput
                  placeholder = { this.state.orderData }
                  locale = { locale }
                  height = '550px'
                  onChange = {({ jsObject }) => { this.setState({ orderData: jsObject, orderChanged: true }); }}
                />
                <Typography>
                  Reason
                </Typography>
                <JSONInput
                  placeholder = { this.state.reason }
                  locale = { locale }
                  height = '550px'
                  onChange = {({ jsObject }) => { this.setState({ reason: jsObject }); }}
                />
                <Typography>
                  State
                </Typography>
                <Select
                  value={this.state.state}
                  onChange={(event) => { this.setState({ state: event.target.value }); }}
                >
                  <MenuItem value={'ACCEPTED'}>ACCEPTED</MenuItem>
                  <MenuItem value={'REFUSED'}>REFUSED</MenuItem>
                </Select>
                <button type="submit">PlaceOrder</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    }
    return (
      <Mutation mutation={CREATE_SIGNAL}
        update={() => (window.location.reload())}
      >
        {createSignal => (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createSignal({
                  variables: {
                    cloneId: this.props.clone.id,
                    orderData: this.state.orderData,
                    reason: this.state.reason,
                  },
                });
              }}
            >
              <Typography>
                OrderData
              </Typography>
              <JSONInput
                placeholder = { this.state.orderData }
                locale = { locale }
                height = '550px'
                onChange = {({ jsObject }) => { this.setState({ orderData: jsObject, orderChanged: true }); }}
              />
              <Typography>
                Reason
              </Typography>
              <JSONInput
                placeholder = { this.state.reason }
                locale = { locale }
                height = '550px'
                onChange = {({ jsObject }) => { this.setState({ reason: jsObject }); }}
              />
              <button type="submit">PlaceOrder</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(Order);
