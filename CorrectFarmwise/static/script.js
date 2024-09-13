import React, { useState } from 'react';
const App = () => {
    const [fadeIn, setFadeIn] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };
    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true);
        }, 2000);
    }, []);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const serviceHeadingClass = fadeIn ? 'serv-header h3 active fade-in' : 'serv-header h3 fade-in';
    const serviceGridClass = fadeIn ? 'serv-content-wrapper active fade-in' : 'serv-content-wrapper fade-in';
    const textStyle = {
        marginTop: `${scrollY * 2.5}px`
    };
    const leafStyle = {
        top: `${scrollY * -0.5}px`
    };
    const hill5Style = {
        left: `${scrollY * 0.5}px`
    };
    const hill4Style = {
        left: `${scrollY * -0.5}px`
    };
    const hill1Style = {
        top: `${scrollY * 0.25}px`
    };

};

export default App;
