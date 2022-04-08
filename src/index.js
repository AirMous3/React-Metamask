import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Web3ReactProvider} from '@web3-react/core';
import {MetaMaskProvider} from './hooks/useMetaMask';
import Web3 from 'web3';

function getLibrary(provider, connector) {
    return new Web3(provider)
}


ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <MetaMaskProvider>
            <App/>
        </MetaMaskProvider>
    </Web3ReactProvider>,
    document.getElementById('root'));
