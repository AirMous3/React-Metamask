import {Button} from 'react-bootstrap';
import metamaskImage from './assets/metamask.svg';
import disconnectImage from './assets/noun_waving_3666509 .svg';
import './App.css';
import {useMetaMask} from './hooks/useMetaMask';

export const App = () => {

    const {connect, disconnect, isActive, account} = useMetaMask();

    return <div className="App">
        <header className="App-header">
            <Button variant="secondary" onClick={connect}>
                <img src={metamaskImage} alt="metamask" width={50} height={50}/>
                Connect to Metamask
            </Button>
            <div className="mt-2 mb-2">
                Connected account: {isActive ? account : ''}
            </div>
            <Button variant="danger" onClick={disconnect}>
                Disconnect Metamask
                <img src={disconnectImage} alt="disconnectImage" width={50} height={50}/>
            </Button>
        </header>
    </div>;
};
