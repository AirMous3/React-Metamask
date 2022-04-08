import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Web3ReactProvider} from '@web3-react/core';
import {MetaMaskProvider} from './hooks/useMetaMask';

ReactDOM.render(
    <Web3ReactProvider>
        <MetaMaskProvider>
            <App/>
        </MetaMaskProvider>
    </Web3ReactProvider>,
    document.getElementById('root'));
