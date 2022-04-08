import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useWeb3React} from '@web3-react/core';
import {injected} from '../components/wallet/injected';

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({children}) => {

    const {activate, account, library, connector, active, deactivate} = useWeb3React();

    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    /*Используем юзЭффект без зависимостей, который будет запускаться 1 раз,
     он дождётся выполнения функции connect для инициализации
     соединения с приложением и метамаской при первом запуске приложения*/
    useEffect(() => {
        connect().then(val => setIsLoading(false));
    }, []);

    const handleIsActive = useCallback(() => {
        setIsActive(active);
    }, [active]);

    /*Я также создал хук useEffect, который будет зависеть от handleIsActive
    и запускать эту функцию только тогда, когда значение active изменилось
    внутри обратного вызова handleIsActive.
    Это будет обновлять наше приложение в любое время,
    когда оно становится активным. Отключение MetaMask от
    нашего приложения также приведет к тому, что active станет ложным.*/
    useEffect(() => {
        handleIsActive();
    }, [handleIsActive]);

    // Конектимся к кошельку Метамаск
    const connect = async () => {
        console.log('connecting to MetaMask');
        try {
            await activate(injected);
        } catch (error) {
            console.log('Error on connecting', error);
        }
    };
    // Дисконнектимся от кошелька Метамаск
    const disconnect = async () => {
        console.log('disconnecting from Metamask');
        try {
            await deactivate();
        } catch (error) {
            console.log('Error when disconnecting', error);
        }
    };
    /*
     Наши данные будут пересчитываться, только если изменились зависмости
     isLoading  и isActive
     */
    const values = useMemo(() => ({
        isActive,
        isLoading,
        account,
        connect,
        disconnect
    }), [isLoading, isActive]);

    return <MetaMaskContext.Provider value={values}>{children}</MetaMaskContext.Provider>;
};

export const useMetaMask = () => {
    const context = useContext(MetaMaskContext);
    if (context === undefined) throw new Error('some Error with context');
    return context;
};
